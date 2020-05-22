#!/bin/bash

# Purpose: Identify all *md files in _posts where:
# Publish date is after date begin date passed in with script call
# and before end date passed in with script call
#
# Example call: find-TCT-posters.sh 2016-01-29 2016-04-05
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
begdate=$1
enddate=$2
echo "date range is between " $begdate " and " $enddate

#set counter
count=0

# Create array of TCT rackers

counter=0

while IFS= read -r line
do 
   TCTmembers+=("$line");
   counter=$((counter+1));
done < ../TCTmembers.txt

looper=0

# Go to _posts directory and loop through all md files
cd ../_posts

FILES=`find .  -type f -name '*md' -print`

for f in $FILES
do

# find publish date (date) and author in file meta data
   pdate=`grep ^date: $f`;
   pauthor=`grep ^author: $f`;
# separate actual date and author from rest of the grepped line
   apdate=`echo $pdate | awk  '{print $2}'`;
   aauthor=`echo $pauthor | awk '{print $2 " " $3 " " $4}'`;
#trim whitespace
   aauthor=`echo $aauthor | sed 's/ *$//g'`

# if date is between the begin and end dates passed in - proceed
  if [[ "$apdate" > "$begdate" ]] && [[ "$apdate" < "$enddate" ]] ;
  then
#     echo $aauthor ":" $apdate ":" $f;
     looper=0
     while [[ $looper -lt  $counter ]]
     do 
#      echo "aauthor " $aauthor " and membercompare " ${TCTmembers[$looper]}
       if [[ "$aauthor" == "${TCTmembers[$looper]}" ]]
       then
          f=${f:2};
          echo "TCT: " $aauthor ":" $apdate ":" $f;
        fi
       looper=$((looper+1));
     done
     count=$((count+1));
  fi
done
echo $count " files published between " $begdate " and " $enddate

