---
layout: post
title: "Python: Automate Everyday Tasks!"
date: 2022-07-05
comments: true
author: Nishant Guvvada
authorAvatar: 'https://www.gravatar.com/avatar/ceb3080726a4e760af2c968219f8bbed'
bio: ""
published: true
authorisRacker: true
categories: 
- Automation
- Python

metaTitle: "Python: Automate Everyday Tasks!"
metaDescription: "This blog explains three different actions that can be automated and performed with Python on Excel"
ogTitle: "Python: Automate Everyday Tasks!"
ogDescription: "This blog explains three different actions that can be automated and performed with Python on Excel"
slug: "python-automate-everyday-tasks" 

---

Excel is one of the most popular tools used worldwide. Irrespective of the company size, be it corporate bigwigs or local grocery shops, or even maintaining a personal vacation budget, excel is a common tool used by all. Since every basic tabulation of data is preferred in an excel format, it’s only logical to keep it that way. However, automating recurring Excel tasks can be challenging, but we need not give up such a useful and widely accepted format altogether. One would argue the use of Power Query to automate a few steps or maybe VBA as an alternate, however, these methods are not very portable.

<!--more-->

Here are three basic and the most important Python code snippets for interacting with excel (The below codes incorporate reading and writing data into the excel workbook):

### 1. Create a Pivot Table:
To create a pivot table, you require *pandas* and *numpy* modules. The first requires you to import these modules. Next, you need to read the data and ingest it into a variable. The *.pivot_table()* method creates the pivot table by providing necessary arguments such as index, values, columns and aggregate functions. Finally, you save the pivot output in another excel.

{{< highlight python >}}

import pandas as pd
import numpy as np

datasource = pd.read_excel(r'C:\Users\')
#### Reading source data using .read_excel() method
#### provide the source path in the above method
#### storing source data into an object “datasource”

#### Create Pivot table using .pivot_table() method
pivot_output = pd.pivot_table(		# Provide arguments inside the methods
    datasource,				# source data
    index=datasource.columns[0],	# set the index column
    values='Column_Value',		# values, columns, rows and aggfunc
    columns=datasource.columns[1],	# are similar to pivot table fields
    aggfunc=np.sum)			# use Numpy library for arithmetic
					# operation

print(pivot_output)

#### Save the pivot on the excel sheet
pivot_output.to_excel(r'C:\Users\', sheet_name='Sheet1', startrow=5)

{{< / highlight >}}


###  2.	Refresh Pivot Table/Power Query

In this we use the *win32com* library to refresh the pivot table. First, create an object and open the excel application. Using the object, open the excel file containing the pivot table by providing the source path. *RefreshAll()* method used on the excel instance refreshes all the data connections.

{{< highlight python >}}

import win32com.client
#### win32com library for refresh operation

#### Start an instance of Excel
xlapp = win32com.client.DispatchEx("Excel.Application")

#### Open the workbook in said instance of Excel
wb = xlapp.Workbooks.Open(r'C:\Users\')

#### Refresh all data connections.
wb.RefreshAll()

#### CalculateUntilAsyncQueriesDone() will hold the program and wait until the refresh has completed.
xlapp.CalculateUntilAsyncQueriesDone()

wb.Save()

#### Quit
xlapp.Quit()

{{< / highlight >}}


### 3.	Formatting excel - Unmerge cells:

Openpyxl is the most popular library for formatting excel. Here, you use a ‘for’ loop to iterate over the merged cells everywhere in the active sheet and apply the *.unmerge_cells()* method to get the output.

{{< highlight python >}}

Import openpyxl as xl
#### openpyxl library for formatting excel
from openpyxl.utils import range_boundaries

#### Load workbook using .load_workbook in an object
wb = xl.load_workbook(r'C:\Users\')

#### Create an object for the sheet
ws = wb.active

#### Iterate over cell range
for i in sorted(ws.merged_cells.ranges):
    ws.unmerge_cells(str(i)) 			# Use .unmerge method

{{< / highlight >}}

**NOTE:** Important Note: install all the libraries beforehand. (example: run “pip install pandas” in command prompt to install pandas)


### Conclusion
In the past, almost all my work, personal or professional, required me to create pivots or perform filtering data in excel. Excel is simple to use but the recurring tasks, that too on a tightly scheduled workday, seem a lot. Hence, I started looking for automation techniques. Python got the spotlight because of the huge library support it has, and I had completed a lot of projects during my learning phase. It is thrilling to see how by running a query can get repetitive tasks completed magically in seconds without opening a workbook. I hope you find the blog useful. Stay tuned for more on automation using Python. 


<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
