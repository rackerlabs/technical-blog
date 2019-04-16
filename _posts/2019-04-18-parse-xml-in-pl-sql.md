---
layout: post
title: "Parse XML in PL/SQL"
date: 2019-04-11 00:01
comments: true
author: Sunil Sharma
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "Parse XML in PL/SQL"
metaDescription: "This blog explores a few choices for handling XML data in Oracle&reg; PL/SQL."
ogTitle: "Parse XML in PL/SQL"
ogDescription: "This blog explores a few choices for handling XML data in Oracle&reg; PL/SQL."
---

This blog explores a few choices for handling XML data in Oracle&reg; PL/SQL.
If you are looking to convert XML data into rows and columns by using PL/SQL,
then you have various options such as the following choices:

- You can load an XML file into an XML table and then extract each tag
  into individual columns and rows.
- You can directly extract tags from an XML file without loading it into an
  Oracle table. To load the XML data into an Oracle table you can use
  options such as `SQLLOADER`, `utl_file`, or `XML CLOB`.

<!-- more -->

After you load the data into a table, you need to extract value from each XML
tag. To extract the XML data, you can use few built-in functions provided by
Oracle such as `XMLELEMENT`, `XMLAGG`, `XMLTABLE`, `XMLSEQUENCE` and
`EXTRACTVALUE` .

This post covers in detail the following two methods to convert data from XML
file into Oracle PL/SQL rows and columns:

-	Load XML file into XML table and then parse it.
-	Directly parse XML file without loading into an XML table.

The main built-in function used is EXTRACT, which is shown in the following image.

![]({% asset_path 2019-04-18-parse-xml-in-pl-sql/Picture1.png %})

*Image Source*: [https://docs.oracle.com/cd/B19306_01/server.102/b14200/img/extract_xml.gif](https://docs.oracle.com/cd/B19306_01/server.102/b14200/img/extract_xml.gif)

### Example file

To explore the preceding options in detail, the example in this post use the
file, **Test.xml**. To access the file in database, use the **DBA** directory,
which is defined in Oracle. The examples use **XX\_UTL\_DIR** as the reference
directory. You can use your own directory of choice instead.

**Test.xml** has the following contents:

    <?xml version = '1.0' encoding = 'UTF-8'?>
    <UANotification xmlns="http://www.test.com/UANotification">
        <NotificationHeader>
        <Property name="ErrorMessage" value="User Data Invalid"/>
                <Property name="SPSDocumentKey" value="11111111111"/>
                <Property name="AppKey" value="22222222"/>
                <Property name="FileName" value="SH201701181418.61W"/>
                <Property name="SenderName" value="Test"/>
                <Property name="ReceiverName" value="Integrated Supply Network"/>
                <Property name="DocumentType" value="856"/>
                <Property name="SourceDataType" value="XML"/>
                <Property name="DestinationDataType" value="FEDS"/>
                <Property name="XtencilNet" value="shFedsWrite"/>
                <Property name="PreviousMaps" value="shFedsWrite]"/>
        </NotificationHeader>
        <FINotification xmlns="http://www.test.com/fileIntegration">
                <ServiceResult>
                        <DataError>
                                <Message>Invalid data test 1</Message>
                        </DataError>
                        <DataError>
                                <Message>Invalid data test 2</Message>
                        </DataError>
                </ServiceResult>
        </FINotification>
    </UANotification>

### First Approach:  Load XML file into XML table and then parse it.

First, create a table in Oracle that includes a column with data type **XMLTYPE**.

For example, use the following code to create the table:

    CREATE TABLE xml_tab (
      File_name  varchar2(100),
      xml_data  XMLTYPE
    );

After that insert data from **Test.xml** into **xml.tab** by using the following
command:.

    INSERT INTO xml_tab
    VALUES ( ‘Test.xml’,
    XMLTYPE (BFILENAME ('XX_UTL_DIR', ‘Test.xml’),
    NLS_CHARSET_ID ('AL32UTF8')
    ));

The preceding insert statement inserts the data of file **Test.xml**
into field `xml_data` of table **xml\_tab**. After the insert completes, the XML
data is available in table **xml\_tab**. To read the data in a select query, use
the following select statements:

To read the text of the tag `Message` that is available under parent tag
`DataError`, use the following SQL command:

    SELECT EXTRACT (VALUE (a1),
                '/DataError/Message/text()',
                'xmlns="http://www.test.com/fileIntegration')
          msg
     FROM xml_tab,
       TABLE (
          XMLSEQUENCE (
             EXTRACT (
                xml_data,
                '/UANotification/ns2:FINotification/ns2:ServiceResult/ns2:DataError',
                'xmlns="http://www.test.com/UANotification" xmlns:ns2="http://www.test.com/fileIntegration"'))) a1
    WHERE file_name = 'Test.xml';

To read `property name` and its value, use the following SQL command:

    SELECT EXTRACTVALUE (VALUE (a1),
                     '/Property/@name',
                     'xmlns="http://www.test.com/UANotification')
          attribute,
       EXTRACTVALUE (VALUE (a1),
                     '/Property/@value',
                     'xmlns="http://www.test.com/UANotification')
          VALUE
     FROM xml_tab,
       TABLE (
          XMLSEQUENCE (
             EXTRACT (
                xml_data,
                '/UANotification/NotificationHeader/Property',
                'xmlns="http://www.test.com/UANotification" xmlns:ns2="http://www.test.com/fileIntegration"'))) a1
     WHERE file_name = 'Test.xml';

### Second Approach: Directly parse XML file without loading into XML table

If you want to directly parse **Test.xml** without loading it into the Oracle
table, then you might use the following SELECT statement:

    SELECT EXTRACTvalue (VALUE (a1),
                '/Property/@name',
                'xmlns="http://www.test.com/UANotification') attribute,
                 EXTRACTvalue (VALUE (a1),
                '/Property/@value',
                'xmlns="http://www.test.com/UANotification') value
     FROM
       TABLE (
          XMLSEQUENCE (
             EXTRACT (
                xmltype(BFILENAME ('XX_UTL_DIR', 'Test.xml'),NLS_CHARSET_ID ('AL32UTF8')),
                '/UANotification/NotificationHeader/Property',
                'xmlns="http://www.test.com/UANotification" xmlns:ns2="http://www.test.com/fileIntegration"'))) a1

### Wrap up

Both methods to parse XML data described in this post give you the same final
output. The first approach is a three-step process, which requires the following
pieces of code:

1)	Create the Oracle table.
2)	Insert data of XML file into table created in step one.
3)	Write select statement to extract values from the Oracle table.

The second option is a single-step process where you write a SELECT statement
and get the desired result.

### Conclusion

Either parsing option works, but, if you need to store the XML file in Oracle for
future reference, then you should use first approach because the data persists
in the table for future reference and you can access it any time.

By choosing the second approach, you can directly parse the data, however, with
this option original XML file data can’t be accessed in future because this
option never stores the content of XML file in Oracle.


<table>
  <tr>If you liked this blog, share it by using the following icons:</tr>
  <tr>
   <td>
       <img src="{% asset_path line-tile.png %}" width=50 >
    </td>
    <td>
      <a href="https://twitter.com/home?status=https%3A//developer.rackspace.com/blog/parse-xml-in-pl-sql/">
        <img src="{% asset_path shareT.png %}">
      </a>
    </td>
    <td>
       <img src="{% asset_path line-tile.png %}" width=50 >
    </td>
    <td>
      <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//developer.rackspace.com/blog/parse-xml-in-pl-sql/">
        <img src="{% asset_path shareFB.png %}">
      </a>
    </td>
    <td>
       <img src="{% asset_path line-tile.png %}" width=50 >
    </td>
    <td>
      <a href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//developer.rackspace.com/blog/parse-xml-in-pl-sql&summary=&source=">
        <img src="{% asset_path shareL.png %}">
      </a>
    </td>
  </tr>
</table>

</br>

Learn more about our [database services](https://www.rackspace.com/dba-services)
and [Rackspace Application services](https://www.rackspace.com/application-management/managed-services).

If you have any questions on the topic, comment in the field below.
