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

# Go to content directory and loop through all 'md' filesi in sub dirs
cd ../_posts

FILES=`find .  -type f -name '*md' -print`

for f in $FILES
do

# find publish date (date) in file meta data
   pdate=`grep ^date: $f`
   pauthor=`grep ^author: $f`
# separate actual date from rest of the grepped line
   apdate=`echo $pdate | awk  '{print $2}'`
   aauthor=`echo $pauthor | awk '{print $2 " " $3}'`

# if date is between the begin and end dates passed in - proceed
  if [[ "$apdate" > "$begdate" ]] && [[ "$apdate" < "$enddate" ]] ;
  then
# print out all modifed files
     echo "File published: " $apdate " author: " $aauthor " " $f;
     count=$((count+1));
  fi
done
echo $count " Files published between " $begdate " and " $enddate
