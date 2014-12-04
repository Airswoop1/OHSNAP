from collections import defaultdict, namedtuple

from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfpage import PDFTextExtractionNotAllowed
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfdevice import PDFDevice
from pdfminer.psparser import PSLiteral
from pdfminer.pdftypes import PDFObjRef
from pdfminer.layout import LAParams, LTTextBoxHorizontal
from pdfminer.converter import PDFPageAggregator


TextBlock = namedtuple("TextBlock", ["x", "y", "text"])


class Parser( object ):
    """Parse the PDF.

    1.  Get the annotations into the self.fields dictionary.

    2.  Get the text into a dictionary of text blocks.
        The key to the dictionary is page number (1-based).
        The value in the dictionary is a sequence of items in (-y, x) order.
        That is approximately top-to-bottom, left-to-right.
    """
    def __init__( self ):
        self.fields = {}

    def load( self, open_file ):
        self.fields = {}

        # Create a PDF parser object associated with the file object.
        parser = PDFParser(open_file)
        # Create a PDF document object that stores the document structure.
        doc = PDFDocument(parser)

        # Create a PDF resource manager object that stores shared resources.
        rsrcmgr = PDFResourceManager()
        # Set parameters for analysis.
        laparams = LAParams()
        # Create a PDF page aggregator object.
        device = PDFPageAggregator(rsrcmgr, laparams=laparams)
        # Create a PDF interpreter object.
        interpreter = PDFPageInterpreter(rsrcmgr, device)

        device = PDFDevice(rsrcmgr)
        # Create a PDF interpreter object.
        interpreter = PDFPageInterpreter(rsrcmgr, device)
        # Process each page contained in the document.
        for pgnum, page in enumerate(PDFPage.create_pages(doc)):
            interpreter.process_page(page)
            if page.annots:
                self._build_annotations( page )

    def _build_annotations( self, page ):
        annots = page.annots
        if isinstance(page.annots, PDFObjRef):
            annots = page.annots.resolve()

        for annot in annots:
            if isinstance(annot, PDFObjRef):
                annot = annot.resolve()
                assert annot['Type'].name == "Annot", repr(annot)
                if annot['Subtype'].name == "Widget":
                    if "FT" not in annot:
                        continue
                    if annot['FT'].name == "Btn":
                        assert annot['T'] not in self.fields
                        self.fields[annot['T']] = annot['Rect']
                    elif annot['FT'].name == "Tx":
                        assert annot['T'] not in self.fields
                        self.fields[ annot['T'] ] = annot['Rect']
                    elif annot['FT'].name == "Ch":
                        assert annot['T'] not in self.fields
                        self.fields[ annot['T'] ] = annot['Rect']
                        # Alternative choices in annot['Opt'] )

    def is_recognized(self):
        """Check for Copyright as well as Revision information on each page."""
        bottom_page_1 = self.text[1][-3:]
        bottom_page_2 = self.text[2][-3:]
        pg1_rev= "Rev 2011.01.17" == bottom_page_1[2].text
        pg2_rev= "Rev 2011.01.17" == bottom_page_2[0].text
        return pg1_rev and pg2_rev
