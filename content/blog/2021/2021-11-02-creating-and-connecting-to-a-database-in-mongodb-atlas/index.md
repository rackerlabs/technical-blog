---
layout: post
title: "Brief Overview of the Oracle Block Chain Table"
date: 2021-11-08
comments: true
author: Ravi Garkoti
authorAvatar: 
bio: ""
published: true
authorisRacker: true
categories: 
- Oracle

metaTitle: "Brief Overview of the Oracle Block Chain Table"
metaDescription: "This blog explains the Oracle Blockchain - A blockchain is a tabulated series of records, which are also called blocks, that are linked together. The contents of each block comprises a cryptographic hash of the previous block, a timestamp, as well as transaction data."
ogTitle: "Brief Overview of the Oracle Block Chain Table"
ogDescription: "This blog explains the Oracle Blockchain - A blockchain is a tabulated series of records, which are also called blocks, that are linked together. The contents of each block comprises a cryptographic hash of the previous block, a timestamp, as well as transaction data."
slug: "brief-overview-of-the-oracle-block-chain-table" 

---

A blockchain is a tabulated series of records, which are also called blocks, that are linked together. The contents of each block comprises a cryptographic hash of the previous block, a timestamp, as well as transaction data.
As each block contains information about the immediate block before him, a chain is formed. Hence, blockchains are resistant to changes in their data because once recorded, any change in a block will change all blocks after it.

<!--more-->

### Cryptographic Hash Function 

<img src=Picture1.png title="" alt="">

A cryptographic hash function is a mathematical algorithm that takes input data of an arbitrary size and converts it into output of a fixed size. 
Hash function is expected to have following features :
•	Same input will give same output always
•	No to same input have same output 
•	A small change in input will change output drastically

Some popular hash functions are 
•	MD5

•	SHA-1

•	SHA-2

•	SHA-3

•	BLAKE2

### Blockchain tables in Oracle
Oracle Blockchain tables are add only tables in which only insert operations are allowed. Deleting rows is either prohibited or restricted based on time which is pre defined. Hash function is part of  row metadata and helps in making it tamper proof
Blockchain Tables will be available with Oracle Database 21c and will also become available in 19c database when 19.10 Release is available .
This feature is a component of the Oracle Database so a new setup will be required.

Indexing and partitioning is allowed in blockchain table. 
Blockchain tables can be used along with (regular) tables in transactions and queries.

<img src=Picture2.png title="" alt="">

Blockchain tables are used to implement centralized blockchain applications where the central authority is the Oracle Database. It provides organizations with more customization and control to  decide who can work on chain. Participants must have privileges to insert data into the blockchain table. Blockchain content  is defined and managed by the application. Centralized blockchains are provide higher throughput and lower latency in transactions 
Rows in a blockchain table are corruption free. Each row has a hash value which is generated using row data and has value of previous row. If any row is changed it will cause all subsequent chain to change since hash values will be updated

### Example of Blockchain tables 

### Create the blockchain table 
CREATE BLOCKCHAIN TABLE command  requires additional condition to be stated. The NO DROP, NO DELETE, HASHING USING, and VERSION clauses are mandatory.

`CREATE BLOCKCHAIN TABLE emp (employee_id NUMBER, department_id NUMBER) NO DROP` `UNTIL 90 DAYS IDLE NO DELETE LOCKED HASHING USING "SHA2_512" VERSION "v1";`

We can use `user_blockchain_tables` view to check attributes of blockchain table

`SELECT row_retention, row_retention_locked, table_inactivity_retention,` `hash_algorithm FROM user_blockchain_tables WHERE table_name='EMP';` 
`ROW_RETENTION ROW TABLE_INACTIVITY_RETENTION HASH_ALG `
`------------- --- -------------------------- --------` 
`               YES                        90 SHA2_512`

### Description of the table

Standard describe command will show only visible columns. USER_TAB_COLS view displays all internal column used to store internal information.

`SELECT internal_column_id "Col ID", SUBSTR(column_name,1,30) "Column Name", SUBSTR`
` (data_type,1,30) "Data Type", data_length "Data Length" FROM user_tab_cols` WHERE 

`table_name = 'LEDGER_EMP' ORDER BY internal_column_id;` 

`Col ID 			Column Name    			Data Type Data Length `

`---------- ------------------------ ---------------------------- -----` 

`1 			EMPLOYEE_ID 					NUMBER 22 `

`2 			Department_ID 				NUMBER 22` 

`3 			ORABCTAB_INST_ID$ 				NUMBER 22`

### Insert row into the blockchain table

`INSERT INTO emp VALUES (106,12000);`

`SELECT ORABCTAB_CHAIN_ID$, ORABCTAB_SEQ_NUM$, ORABCTAB_CREATION_TIME$,`
`ORABCTAB_USER_NUMBER$, ORABCTAB_HASH$ FROM emp;`

### Delete, Drop and Truncate
You can delete rows in a blockchain table only by using the DBMS_BLOCKCHAIN_TABLE package, and only rows that are outside the retention period. Standard delete command will not work for blockchain table.

`DBMS_BLOCKCHAIN_TABLE.DELETE_EXPIRED_ROWS`
`(   schema_name 		 IN VARCHAR2,`
`table_name 	         IN VARCHAR2,` 
`   before_timestamp 	   IN TIMESTAMP WITH TIME ZONE DEFAULT NULL,`
`   number_of_rows_deleted     OUT NUMBER);`

If you created the table with the NO DELETE LOCKED attribute then you can never subsequently modify the row retention period for the purpose of deletion. 
You can only increase the retention value of block chain table and drop command will work only when retention period is over. 
Truncate command is not allowed for blockchain table.


<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle">Learn about Rackspace NoSQL Data Management.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
