---
layout: post
title: "MSSQL DB Keyword Finder"
date: 2023-02-17
comments: true
author: Sachin Dehran
authorAvatar: 'https://secure.gravatar.com/avatar/'
bio: ""
published: true
authorIsRacker: true
categories:
    - MS SQL
    - Dtabases
metaTitle: "MSSQL DB Keyword Finder"
metaDescription: "This blog covers detailed information about the solution script we can use to search for the location of specific data in multiple MSSQL databases at the table and column level. "
ogTitle: "MSSQL DB Keyword Finder"
ogDescription: "This blog covers detailed information about the solution script we can use to search for the location of specific data in multiple MSSQL databases at the table and column level. "
slug: "mssql-db-keyword-finder"

---

     This blog covers detailed information about the solution script we can use to search for the location of specific data in multiple MSSQL databases at the table and column level. 

<!--more-->

#### Introduction
-	This is a T-SQL script where we need to provide just the keyword we are looking for, and after executing in master DB context, it will return us a systematic result set in a table that contains the location (database, schema, table, column) where the data containing the provided keyword is present.rs.


#### Why did we create this solution?

Sometimes we have requests from requestors that their data related to different customers, or a specific set of key words is residing on multiple databases on the same SQL Server instance, and due to non-standard schema definitions, they are not able to find in which database, table, or column the data related to this keyword is present. 

Practically, it is not easy to explore each database and table to find that information. However, this is a smart solution that will help get that information in a systematic format with minimal manual effort. 
This solution can be used when:
-	During the organization splitting process, data must be discovered and separated.
-	when a common SQL instance or database is in use by more than one customer and the new developer is not aware of which database is in use by which customer.
-	Other scenarios where we would like to search for data location based on a specific keyword

#### WORKFLOW


<img src=Picture1.png title="" alt="">


**IMPORTANT FILES**

*Please refer solution at the end of this blog*

<img src=PICTURE2.PNG title="" alt="">

#### HIGH LEVEL STEPS

- **Step 1**: Provide a keyword to Keyword_Finder.sql and execute it on SQL Server Instance
- **Step 2**: Post completion of Step1, discovered data will be stored in [msdb].[dbo].[TableInfo] (i.e. discovery table)



#### DETAILED STEPS WITH EXAMPLE

Suppose our requirement is to search the location of all the records that contain the keyword "Rob" on instance "TESTINST." We do not have any other information available apart from the instance name and keyword, and we have multiple databases on this instance. We can follow the following steps to discover the required data: 

**Steps** 
-	Connect Target SQL Server Instance and select DB context master
-	Please specify the keyword SET @TextSearch = 'rob' (Reference:  screenshot 1)
-	Execute the query 
-	It will store discovered data in [msdb].[dbo].[TableInfo] (Reference:  screenshot 2 and 3)

<img src=PICTURE3.PNG title="" alt="">
<img src=Picture4.png title="" alt="">
<img src=Picture5.png title="" alt="">

**Important Point:**

-This query might take a good amount of time to return data based on number and size of databases on which it is running. 
-Following query can be used to explore data stored in  msdb..TableInfo (Discovery Table)   
Last column “RowSearchQuery” from the output of following query  can give us query to find data at  row level. 

- -- Query can be used to fetch data from msdb..TableInfo
{{< highlight sql >}}

SELECT  [ID] , [DBName], [SchemaName], [TableName] , [ColumnName] , [SearchText] ,[ExecutionId] ,[DateInserted], 
'Select * From '+ '['+ [DBName] + '].'+ '['+ [SchemaName] + '].'+'['+ [TableName] + '] where [' +  [ColumnName]+ '] like ''%' +[SearchText] + '%''' RowSearchQuery  FROM [msdb].[dbo].[TableInfo]

{{< /highlight >}}


**Solution**

{{< highlight sql >}}

-- =============================================
-- Author: Sachin Dehran 
-- Create date: 12/30/2022
-- Description: This script can be used to search location of specific data in MSSQL database at table and column level
-- =============================================

Set QUOTED_IDENTIFIER OFF;
Set NOCOUNT ON ; 

--modify the variable, specify the text to search for SET @TextSearch = 'Sachin';

DECLARE @TextSearch varchar(2000)
SET @TextSearch = 'Sachin'


DECLARE @name NVARCHAR(2000) -- database name    
--Create Temp Table For  Table Results
IF OBJECT_ID(N'msdb..TableInfo') IS  NULL
BEGIN
--select * from msdb..TableInfo
CREATE TABLE msdb..TableInfo
(
ID INT IDENTITY,
DBName NVarchar(max),
SchemaName Nvarchar(max),
TableName Nvarchar(max),
ColumnName Nvarchar(max),
SearchText Nvarchar(2000),
ExecutionId nVarchar(255),
DateInserted DateTime default GetDate()
)
END

Declare @ExecutionId UniqueIdentifier
Set @ExecutionId = NEWID()

--cursor to check each db and table with created_date column
DECLARE db_cursor CURSOR FOR 
SELECT name FROM master.sys.databases WHERE DATABASEPROPERTYEX(name, 'Updateability') <> 'READ_ONLY' AND state = 0  
and name NOT IN ('master','model','msdb','tempdb') 

OPEN db_cursor  
FETCH NEXT FROM db_cursor INTO @name  

WHILE @@FETCH_STATUS = 0  
BEGIN  

Print @Name

Declare @DBQuery NVarchar(Max)



Set @DBQuery="
DECLARE
   @SearchText nvarchar(2000),
   @Table nvarchar(max),
   @SchemaName Nvarchar(max),
   @TableID int,
   @ColumnName nvarchar(max),
   @ExecID nVarchar(255),
   @String varchar(max);

      SET @SearchText = '"+@TextSearch+"'
	  SET @ExecID = '"+Convert(nVarchar(255),@ExecutionId) +"'

Use ["+ @name +"] ;

DECLARE CursorSearch CURSOR
    FOR SELECT obj.name, obj.object_id,sch.name  Schemaname
        FROM sys.objects  obj Join sys.schemas sch
		On obj.schema_id = sch.schema_id
      WHERE type = 'U';
--list of tables in the current database. Type = 'U' = tables(user-defined) OPEN CursorSearch;
OPEN CursorSearch
FETCH NEXT FROM CursorSearch INTO @Table, @TableID,@SchemaName;
WHILE
       @@FETCH_STATUS
       =
       0
    BEGIN
        DECLARE CursorColumns CURSOR
            FOR SELECT name
                  FROM sys.columns
                WHERE
                       object_id
                       =
                       @TableID AND system_type_id IN(167, 175, 231, 239);
        -- the columns that can contain textual data        
--167 = varchar; 175 = char; 231 = nvarchar; 239 = nchar        
OPEN CursorColumns;
        FETCH NEXT FROM CursorColumns INTO @ColumnName;
        WHILE
               @@FETCH_STATUS
               =
               0
            BEGIN
                SET @String = 
				            'IF EXISTS (SELECT * FROM ['
                            + @SchemaName
							+'].['
							+ @Table
                            + '] WHERE ['
                            + @ColumnName
                            + '] LIKE ''%'
                            + @SearchText
                            + '%'')  Begin '
							+
							'Insert into msdb..TableInfo (DBName, SchemaName,
TableName ,
ColumnName ,
SearchText ,
ExecutionId ) Values (db_name(),'''
                            + @SchemaName
							+ ''', '''
                            + @Table
                            + ''', '''  
                            + @ColumnName
                            + ''', ''' 
                            + @SearchText
							+ ''', ''' 
                            + @ExecId
                            + ''' )'

							+' End';

				--Print (@String);			
                EXECUTE (@String);
                
                
				FETCH NEXT FROM CursorColumns INTO @ColumnName;
            END;
        CLOSE CursorColumns;
        DEALLOCATE CursorColumns;
        FETCH NEXT FROM CursorSearch INTO @Table, @TableID,@SchemaName ;
    END;
CLOSE CursorSearch;
DEALLOCATE CursorSearch
                
				"
Execute  (@DBQuery)
--Print  (@DBQuery)
FETCH NEXT FROM db_cursor INTO @name 
END 
CLOSE db_cursor  
DEALLOCATE db_cursor 


--drop table msdb..TableInfo

Select * from msdb..TableInfo


//*
/******Following query can be used to explore data stored in  msdb..TableInfo (Discovery Table)  ******/ 
/******Last column “RowSearchQuery” from the output of following query  can give us query to find data at  row level.   ******/
SELECT  [ID]
      ,[DBName]
      ,[SchemaName]
      ,[TableName]
      ,[ColumnName]
      ,[SearchText]
      ,[ExecutionId]
      ,[DateInserted]
	  , 'Select * From '+ '['+ [DBName] + '].'+ '['+ [SchemaName] + '].'+'['+ [TableName] + '] where [' +  [ColumnName]+ '] like ''%' +[SearchText] + '%''' RowSearchQuery
  FROM [msdb].[dbo].[TableInfo]

*//

{{< /highlight >}}

##### Conclusion

 This article covers detailed information about the solution we have created to help DBA Team members with the solution script that we can use to search location of specific data in MSSQL database at table and column level.












 
<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed SQL Services.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/databases"> Learn about Rackspace Database Services.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).