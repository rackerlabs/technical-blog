---
layout: post
title: "Oracle deferred COGS accounting"
date: 2020-06-11 00:01
comments: true
author: Ajay Bajpai
published: true
authorIsRacker: true
categories:
    - Database
    - Oracle
metaTitle: "Oracle deferred COGS accounting"
metaDescription: "This post introduces the Deferred Cost of Goods Sold (DCOGS) account
functionality in Oracle&reg; Cost Management release 12.0.0 and later. This
enhancement directly matches the Cost of Goods Sold (COGS) to the revenue, which
was not possible previously."
ogTitle: "Oracle deferred COGS accounting"
ogDescription: "This post introduces the Deferred Cost of Goods Sold (DCOGS) account
functionality in Oracle&reg; Cost Management release 12.0.0 and later. This
enhancement directly matches the Cost of Goods Sold (COGS) to the revenue, which
was not possible previously."
---

This post introduces the Deferred Cost of Goods Sold (DCOGS) account
functionality in Oracle&reg; Cost Management release 12.0.0 and later. This
enhancement directly matches the Cost of Goods Sold (COGS) to the revenue, which
was not possible previously.

<!-- more -->

### Introduction

In previous versions, the system expensed the value of goods shipped from
inventory to COGS even though the shipment might not have earned the revenue.
With this enhancement, the system puts the value of goods shipped from inventory
in the DCOGS account.

The enhancement makes a change to synchronize the revenue and COGS per the
recommendations of generally accepted accounting principles (GAAP)&mdash;when
the program recognizes a percentage of revenue, it moves a matching percentage
of the value of goods shipped from inventory to the COGS account from the DCOGS
account.

Accounting practice requires that you must recognize revenue and the associated
COGS in the same accounting period. This enhancement automates matching the
COGS for a sales order line to the revenue billed for that specific sales order
line.

The deferral of COGS applies to the following elements:

- Sales orders of both pick-to-order (non-configurable) and assemble-to-order
  (configurable items).
- Sales orders from the customer-facing operating units. The new accounting flow
  introduced in v. 11.5.10 could drop shipments from these orders.
- Return merchandise authorizations (RMA) that reference a sales order with a
  deferred COGS. The enhancement accounts for these RMAs by using the original
  sales order cost to maintain the latest COGS recognition percentage.

**Note**: If an RMA is tied to a sales order, the system accounts for the
distribution of credits between deferred COGS and the actual COGS to maintain
the existing costing proportions. If an RMA has no sales order, there is no
deferred COGS.

### Set up a DCOGS account

To set up the DCOGS account, navigate to
**Inventory -> Setup -> Organization -> Parameters -> Other Accounts**.

![]({% asset_path 2020-06-11-oracle-deferred-cogs-accounting/Picture1.png %})

If you upgrade from an older version, the system populates the DCOGS account
with the COGS account if the organization parameter is null. You can change this
if needed.

### COGS data flow

The following image shows the COGS data flow:

![]({% asset_path 2020-06-11-oracle-deferred-cogs-accounting/Picture2.png %})

 The following sections describe how the enhancement handles various situations.

#### Sales order

The system makes the following changes when you issue a sales order:

1. Sets **Cst\_cogs\_events.COGS\_Percentage** to '0'.

2. Sets **Cst_cogs\_events.Mmt\_Transaction\_id** to the Transaction Id
   in the **Mtl\_Material\_Transactions** table for sales order issue transaction.

3. Sets **Cst_cogs\_events.costed** to **Mtl\_Material\_Transactions.costed\_flag**,
   which is NULL when the sales order transaction is costed.

4. Sets **Cst\_cogs\_events.Event Type** to '1' [where '1' signifies Sales
   Order Issue].

5. In the **cst\_revenue\_cogs\_match\_lines** table, the system populates the
   **Deferred\_COGS\_Acct\_id**, **COGS\_Acct\_id**, **Unit\_cost**, and
   **Original\_shipped\_Qty** columns.

**Note**: **Oe\_order\_lines\_all.Invoice\_Interface\_Status\_Code** = 'Yes'
[where 'Yes' signifies a standard sales order and 'Not_Eligible' signifies
ship-only lines].

This section shows how the columns integrate the tables and ensure that the data
flows seamlessly after entering the sales order and issuing the material.

#### Revenue recognition and accounting

**Note**: **RA_CUST\_TRX\_LINE\_GL\_DIST\_ALL.account\_set\_flag** = 'N'. [where
'Y' signifies that revenue recognition is not performed and 'N' signifies that
revenue recognition is run].

After you run the process to collect revenue recognition, make the following
changes tomatch costs and revenue:

1. Set **cst\_revenue\_recognition\_lines.potentially\_unmatched\_flag** = 'Y'.

2. Set **cst\_revenue\_recognition\_lines.revenue\_recognition\_percent** = '1'
  [where '1' signifies 100%].

#### COGS recognition

After you run the revenue recognition program, the system makes the following
changes:

1. Sets **cst\_cogs\_events.COGS\_percentage** to '1'[where '1' signifies 100%].

2. Sets **cst\_cogs\_events.mmt\_transaction_id** to the Transaction Id in the
   **Mtl_Material_Transactions** table for the COGS recognition transaction.

3. Sets **cst\_cogs\_events.Event Type** to '3'[where '3' signifies COGS recognition].

4. Sets **cst\_revenue\_recognition\_lines.potentially\_unmatched\_flag** to
   'Null'. This indicates successful genereation of the recognition event and
   the transaction.

### Conclusion

Hopefully, you found the concept of DCOGS accounting and the backend integration
between the tables valuable.

<a class="cta blue" id="cta" href="https://www.rackspace.com/dba-services">Learn more about Databases.</a>

Visit [www.rackspace.com](https://www.rackspace.com) and click **Sales Chat**
to start a conversation.

Use the Feedback tab to make any comments or ask questions.
