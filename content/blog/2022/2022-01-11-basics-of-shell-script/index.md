---
layout: post
title: "Basics of Shell Script"
date: 2022-01-11
comments: true
author: Love Uniyal
authorAvatar: ''
bio: ""
published: true
authorIsRacker: true
categories:
    - General

metaTitle: "Basics of Shell Script"
metaDescription: "This blog explains the basics of shell scripting for users of Linux or Unix operating systems."
ogTitle: "Basics of Shell Script"
ogDescription: "This blog explains the basics of shell scripting for users of Linux or Unix operating systems. "
slug: "basics-of-shell-script"

---

This blog explains the basics of shell scripting for users of Linux or Unix operating systems.

<!--more-->

### What is shell script?                                                                                                                                               
Shell script is basically a computer program which divided into two part _SHELL_ & _SCRIPT._                      
•	Shell  is an  Interpreter which converts low level & high level language in to machine language for Unix based Operating systems .                                                                                                                                
•	Script stands for Set of Commands.

### What Types of shell are Supported Shell in Linux ?                                                                                    
Below (snapshot) are the few examples of shells supported by Linux 6. It may vary from version to version 

<img src=Picture1.png title="" alt="">

### How to write as a shell script ?                                                                                                                           
`#!/bin/bash –` This is known as header or shebang of a script.                                                                                                    
`•	#! ` - Is a symbol which is called the  interpreter.                                                                                                    

•	#Commented line – Only readable format shows what script is executing /bin/bash is the location of shell & shell we are using is bash .

<img src=Picture2.png title="" alt="">


_For example._

Here we have created a script in bash shell & executed using sh.

<img src=Picture4.png title="" alt="">

<img src=Picture5.png title="" alt="">

### What are variables in shell scripting ?                                                                                        
Variables store any values which can be called during the execution of a script.

### What are the Types of variables ?                                                                                                                                                     There are two types of variables.
•	System defined Variable (SDV) - These are predefined & maintained by Linux only. SDV will always show  in Capital letters 

<img src=Picture6.png title="" alt="">

•	User defined Variable (UDV) – These can be created & maintained by user. UDV should always define in Small letters

<img src=Picture7.png title="" alt="">

### What are special variables ?

•	$0   - Check current script name

•	$n   - Sequence of arguments

•	$#   -  To check count (number of arguments) in script.

•	$*   - It stores complete set of positional parameter in a single string

•	$@  - Quoted string treated as separate arguments.

•	$?    - exit status of command

•	$$    - Check PID of current shell.

•	$!     - check PID of last background Job

Below is an example.

<img src=Picture8.png title="" alt="">

Output:

<img src=Picture9.png title="" alt="">

### Arithmetic Operators -

These operators are used for arithmetic calculations .

Below is an example:

<img src=Picture10.png title="" alt="">

Output:

<img src=Picture11.png title="" alt="">

### Functions and Arguments –
A function is a group of commands which can be used as a single handle. To execute this set of commands, call the function by the name provided.

Below is an example of single function.
We have created a shell script using a single function & called the function in script at very last.

<img src=Picture12.png title="" alt="">

Output

<img src=Picture13.png title="" alt="">

_Below is an example of two functions._

Below we have created shell script calling two different functions.
Output of script depends upon the calling sequence of functions.

<img src=Picture14.png title="" alt="">

Output:

<img src=Picture15.png title="" alt="">

### Conclusion –
Shell scripting can be used to automate manual tasks.
It is very useful for most repetitive tasks which are time consuming to execute or schedule using one line at a time


<a class="cta red" id="cta" href="https://www.rackspace.com/hub/modern-cloud-applications">Let our experts guide you on your cloud-native journey.</a>

Use the Feedback tab to make any comments or ask questions. You can also
[start a conversation with us](https://www.rackspace.com/contact).
