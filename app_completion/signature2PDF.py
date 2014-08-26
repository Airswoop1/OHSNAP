__author__ = 'airswoop1'


#Application could include:
# 1. Single page (page 1)
# 2. Three pages (pages 1-3)
# 3. Four pages (pages 1-3 & 5)
#       "Signed_SNAP_Application_" + user_id.strip('-')
#
# 4. Four pages (pages 1-3 & 5) + Documents
#       user_id + "_COMPLETE.pdf"

#in all cases a new pdf is needed to be created using users old data and overlaying new signatures that were captured


#0. Recreate each pdf
#1. make sure signature files exist, otherwise download them
#2. use PDFFileWriter and create a pdf of both of the signatures in the exact coordinates that they need to be applied
#3. create watermark objects for them
#4.