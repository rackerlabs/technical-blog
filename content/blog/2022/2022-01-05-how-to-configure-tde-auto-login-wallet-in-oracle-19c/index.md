---
layout: post
title: "How to Configure TDE Auto Login Wallet in Oracle 19c"
date: 2022-01-05
comments: true
author: Sunil Rathod
authorAvatar: 'https://secure.gravatar.com/avatar/c3a915969820000d5dc4fc4f04ad8276'
bio: ""
published: true
authorIsRacker: true
categories:
    - Oracle
    - Database
metaTitle: "How to Configure TDE Auto Login Wallet in Oracle 19c"
metaDescription: "Transparent Data Encryption (TDE) enables you to encrypt sensitive data that you store in tables and tablespaces."
ogTitle: "How to Configure TDE Auto Login Wallet in Oracle 19c"
ogDescription: "Transparent Data Encryption (TDE) enables you to encrypt sensitive data that you store in tables and tablespaces."
slug: "how-to-configure-tde-auto-login-wallet-in-oracle-19c"

---

In this post, I will discuss about enabling Transparent Data Encryption – TDE in Oracle 19c. 

<!--more-->

To configure Auto Login Wallet in Oracle 19c there are few parameters which needs to be set in spfile/pfile.

### Step 1: Create Wallet folder in ASM

If necessary, create a wallet directory. Typically, wallet directory is located in `ASM or $ORACLE_BASE/admin/db_unique_name/wallet.` 
Ideally wallet directory should be empty.
`./grid.env -- asm file system environment file env`
`asmcmd`

<img src=Picture1.png title="" alt="">

#### Step 2. Update wallet details in the parameter file.
You must configure Keystore location and type by setting WALLET_ROOT and TDE_CONFIGURATION parameters in pfile or spfile.
`. ./clprod.env`

<img src=Picture2.png title="" alt="">

### Step 3. Restart the Database

Source the container database environment
`. clprod.env`

`sqlplus '/as sysdba'`

`show con_name;`

`CON_NAME`
------------------------------
CDB$ROOT

CLPROD> shut immediate

Database closed.

Database dismounted.

ORACLE instance shut down.

CLPROD> startup

ORACLE instance started.

Total System Global Area 16106127360 bytes

Fixed Size 35621984 bytes

Variable Size 1017607903 bytes

Database Buffers 534432665431 bytes

Redo Buffers 9817655 bytes

Database mounted.

Database opened.

or if RAC

`srvctl status database -d CLPROD`

`srvctl stop database -d CLPROD`

`srvctl start database -d CLPROD`

### Step 4.Check the status of the wallet

<img src=Picture3.png title="" alt="">
<img src=Picture4.png title="" alt="">

### Step 5. Create KEYSTORE for container
Source the container database environment
`. clprod.env`
<img src=Picture5.png title="" alt="">
<img src=Picture6.png title="" alt="">

### Step 6. Open KEYSTORE for pdb
Source the container database environment
`. clprod.env`
<img src=Picture7.png title="" alt="">

### Step 7. Create an Auto-Login or a Local Auto-Login Software Keystore
Source the container database environment
`. clprod.env`
<img src=Picture8.png title="" alt="">
<img src=Picture9.png title="" alt="">
<img src=Picture10.png title="" alt="">

### Step 8. Restart the Database
`sqlplus '/as sysdba'`

`CLPROD> shut immediate`

Database closed.

Database dismounted.

ORACLE instance shut down.

CLPROD> startup

ORACLE instance started.

Total System Global Area 16106127360 bytes

Fixed Size 35621984 bytes

Variable Size 1017607903 bytes

Database Buffers 534432665431 bytes

Redo Buffers 9817655 bytes

Database mounted.

Database opened.

or if RAC

`srvctl status database -d CLPROD`

`srvctl stop database -d CLPROD`

`srvctl start database -d CLPROD`

### Step 9. Verify autologin

<img src=Picture11.png title="" alt="">
<img src=Picture12.png title="" alt="">

### Step 10. Recreate temp tspace in cdb

<img src=Picture13.png title="" alt="">

### Step 11. Enable TDE for all container tablespaces

<img src=Picture14.png title="" alt="">

### Step 12. Drop and recreate temp tspace for the pdb (prod)

<img src=Picture15.png title="" alt="">

### Step 13. Restart the application services.

### Step 14. Start Tablespace encryption

#### a) run the following command on VNC as terminal no.1

<img src=Picture16.png title="" alt="">

#### b) run the following command on VNC as terminal no.2

<img src=Picture17.png title="" alt="">
<img src=Picture18.png title="" alt="">

Update/edit the encrypt_prod_tspaces2.sql and run it to start the encryption for other tablespaces.

<img src=Picture19.png title="" alt="">

#### c) Complete the APPSUNDO tablespaces & system tspace at the end individually.

Make sure this is done only after all the other tablespaces are encrypted completely

<img src=Picture20.png title="" alt="">

#### d). Incase if the encryption process errors are out you need to restart the encryption process by using the following command.

To restart a failed encryption.

<img src=Picture21.png title="" alt="">

### Conclusion

Security
After the data is encrypted, it is transparently decrypted for authorized users or applications when accessed. TDE helps protect data stored on media (also called data at rest) if the storage media or data file is stolen.

Data is safe (some tools don’t encrypt by default).

Whole database encryption also hides SYSTEM, SYSAUX, TEMP and UNDO data.

You don’t need OMF anymore if you use tablespace online encryption. 

Keystore can be closed even SYSTEM, SYAUX and UNDO is encrypted.

Reference: 2586100.1
2559570.1



<a class="cta purple" id="cta" href="https://www.rackspace.com/applications/oracle">Learn about Rackspace Managed Oracle Applications.</a>

<a class="cta purple" id="cta" href="https://www.rackspace.com/data/managed-sql"> Learn about Rackspace Managed Relational Databases.</a>


Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).