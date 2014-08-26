__author__ = 'airswoop1'
from wand.image import Image
import os
import shutil

sig_page_loc = os.getcwd() + '/output/sig_page.png'
info_page_loc = os.getcwd() + '/output/info_page.png'

def createImageFromPDF(input, output, user_dir, user_id):
    with Image(filename=input, resolution=200) as i:
        i.compression_quality = 99
        i.alpha_channel = True
        i.format = 'png'
        i.save(filename=output)

        new_file_list = os.listdir(user_dir)

        if '.DS_Store' in new_file_list:
            new_file_list.remove('.DS_Store')

        if len(new_file_list) >= 1 and len(new_file_list) <= 3:
            shutil.copyfile(sig_page_loc, user_dir + '/' + user_id + "-3.png")

        shutil.copyfile(info_page_loc, user_dir + '/' + user_id + "-info.png")


def createAppImages(i):
    user_id = i
    old_path = os.getcwd() + '/output/submitted/'
    new_path = os.getcwd() + '/output/sigs/'

    # files = os.listdir(old_path)
    #
    # files.remove('.DS_Store')

    user_dir = new_path + '/' + user_id

    try:
        os.makedirs(user_dir)
    except OSError:
        pass

    path1 = old_path + "Signed_SNAP_Application_" + user_id.replace('-', "") + ".pdf"
    path2 = old_path + user_id + "_COMPLETE.pdf"

    if os.path.isfile(path1):
        path_to_use = path1
    elif os.path.isfile(path2):
        path_to_use = path2
    else:
        print user_id
        raise Exception("Error finding original file!")

    createImageFromPDF(path_to_use, user_dir+"/"+ user_id + '.png', user_dir, user_id)


user_array = [
                "8afeec42-8098-460a-8d57-f14f8aa39047",
                "684f677c-e60a-4924-8f4d-ecbc4e661592",
                "b3ad78fb-d0af-4823-84cc-88919841fc03",
                "5c62db10-252e-4f21-bb91-35b4de2ef4e9",
                "6db50708-cc58-452b-a194-f68aed92b19b",
                "9aa7e5d6-15ab-4523-922e-18e285dd73aa",
                "33a3efc7-d1d2-4794-9314-df1cfc4b62e0"
            ]

for x in user_array:
    createAppImages(x)

# for x in files:
#     split_name = x.split('_')
#     str_length = len(split_name)
#
#     if str_length==2:
#         user_id = split_name[0]
#     else:
#         user_id = split_name[3].split('.')[0]
#         user_id = user_id[:8]+'-'+user_id[8:12]+'-'+user_id[12:16]+'-'+user_id[16:20]+'-'+user_id[20:32]
#
#     user_dir = new_path + '/' + user_id
#
#     try:
#         os.makedirs(user_dir)
#     except OSError:
#         pass
#
#     original_app_path = old_path + x
#     user_sig_file = user_dir + '/' + user_id + ".png"
#
#     createImageFromPDF(original_app_path, user_sig_file)



print "Completed!"