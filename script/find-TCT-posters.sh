#!/bin/bash

# Purpose: Identify all *md files in content/blog where:
# The blog is published in the specified year
#
# Example call: find-TCT-posters.sh 2020
#
# NOTE: Script assumes you are executing from within the script directory of
#       your local blog git repo.
#
# Process:
# 1) Get the dates to compare from the arguments passed in
# 2) Get the list of TCT Rackers
# 3) Go to blog repo content directory (assumption: you are in the script dir)
# 3) Use for loop to go through all *md files in each content sub dir
#    and list all file names and directories where:
#       last_modified_date is between begin and end dates (from the script arguments)
#
# Updates:
#


# assign date arguments to variables
targetyear=$1

echo "Target year is " $targetyear

#set counter
count=0

# Create array of TCT rackers

counter=0

while IFS= read -r line
do 
   TCTmembers+=("$line");
   counter=$((counter+1));
done < TCTmembers.txt

looper=0
numTCTs=0

# Go to _posts directory and loop through all md files
cd ../content/blog/$targetyear

FILES=`find .  -type f -name '*md' -print`

for f in $FILES
do

# find author in file meta data
   pauthor=`grep ^author: $f`;
# separate actual author from rest of the grepped line
   aauthor=`echo $pauthor | awk '{print $2 " " $3 " " $4}'`;
#trim whitespace
   aauthor=`echo $aauthor | sed 's/ *$//g'`

   looper=0
   while [[ $looper -lt  $counter ]]
     do 
#      echo "aauthor " $aauthor " and membercompare " ${TCTmembers[$looper]}
       if [[ "$aauthor" == "${TCTmembers[$looper]}" ]]
       then
          f=${f:2};
          echo "TCT: " $aauthor ":" $f;
          numTCTs=$((numTCTs+1));
        fi
       looper=$((looper+1));
     done
     count=$((count+1));

done
echo $numTCTs " TCT racker blog posts published in " $targetyear