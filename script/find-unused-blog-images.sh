#!/bin/bash

# Purpose: Find unused images in blog repo
#
#
# Example call: find-unused-images.sh
#
# If that call doesn't work, try ./find-unused-images.sh
#
# NOTE: Script assumes you are executing from within the /script directory of
#       your local blog git repo.
#
# Process:
# 1) In image directory, find all image files in all subdirectories and output
#    them to new file without the leading “./“.  Sort the file.
# 2) In _posts, find all referenced images in all files in all sub dirs.
#    Sort the file.
# 3) Compare sorted files and output unused images.


# Go to image directory, find all the images, and sort output

cd ../_assets/img

find . -type f | sed 's,^[^/]*/,,' > ../../files/blog-all-images.txt

sort -o  ../../files/blog-all-images.txt ../../files/blog-all-images.txt

# Go to repo root, find all referenced images, and sort output

cd ../..

grep -r asset_path * | awk 'sub(/.*asset_path/,""){print $1}' > files/blog-used-images.txt

sort -o files/blog-used-images.txt files/blog-used-images.txt

# You must manually clean up the used images file, removing extra characters
# and duplicates. Then manually run last step

# Go to files directory, compare files, and output unused images

#cd files

#comm -23 blog-all-images.txt blog-used-images.txt > blog-unused-images.txt

