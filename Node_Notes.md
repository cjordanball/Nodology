# NodeJS

[toc]

## Installation and Setup

### Installation of NodeJS
1. Installing NodeJS is super simple. Just go to *https://noddejs.org* and click on the download button, and follow the directions on the installer.

2. This installation of NodeJS will also install the **node package manager**, which will allow easy installation of dependencies. Don't worry about this now, just know you have it installed, which one can see by typing the following at the command line:
    ```
    npm -v
    node -v
    ```
    The latter runs an instance of node. With the **-v** flag, this instance simply prints to the standard out the version of node that is running, then terminates.
    
### What is Node?
1. NodeJS, or Node, is a server-side language built on the JavaScript programming language. It does **not** run in a browser; however, it employs the same **Chrome V-8 runtime engine** as used in most modern browsers for interpreting the language, allowing it to run extremely fast for an interpreted language. One very helpful analogy is that the Node **global** object is analogous to the browser **window**, as the **process** object is analogous to the **document**.

2. The *engine* is the instruction set that converts the JavaScript code into much faster machine language code. The Chrome V-8 engine was exceptionally good at this task, making it possible for Node to run (as well as JavaScript in the browser) at a speed that would allow reasonable performance as a server.

3. In addition to the features found in basic JavaScript, Node offers a broad feature set for dealing with file i/o, http and https, *etc.*

4. Note that Node itself is written in C and C++, not JavaScript, and the V-8 engine is written in C++.

5. Perhaps the **single, key feature** of Node is its **event-driven, non-blocking, I/O model**. This is covered in much more detail in my paper on *Asynchronous Programming* is JavaScript, but the bottom line is this: doing things in memory is tons faster for the computer than anything involving reading or writing (input/output, or I/O). A server often does lots of I/O work with relatively light work otherwise. Because it is **non-blocking**, when it gets a request for some information that must be acquired from a database, for example, it sends out the request to the database. Then, it goes off to its next tasks, until it hears that the search has completed. Then it does the next step. **It does not wait around for the query to complete before going to the next task.**

6. Another important aspect of Node is that it is **single-threaded.** In an environment where there is lots of I/O and light local work, this hardly matters; however, if there is heavy computational work going on, the the single thread could get tied up, without the ability to set up another thread to handle other user's requests.

### Node Package Manager (npm)
:::danger
Note that many are now switching away from npm to **Yarn**, a joint project of Facebook, Google, and others. For more information, go to https://yarnpkg.com/lang/en/. However, note that the packages are still maintained on npm's repository site.
:::
1. **Node packeage manager** is a program that downloads automatically with Node if installed through the *nodejs.org* website installer. It provides a number of command-line tools that manage *packages* or *dependencies*, open-source code that we can access to handle tasks in our application.

2. At this point, we are not going to go into much detail regarding npm; however, one should definitely know the following commands:

    a. **npm init**: if run in our project directory, it asks a number of questions and then creates the **package.json** file, which keeps track of app information, including a list of the packages we need to download and install to run our app.
    
    b. **npm install**: if run in our project directory, this command gets npm to install all the packages required by our app to run.
    
    c. **npm install --save [name of package]**: if run in the project directory, it adds the package name to the list of dependencies, and installs the package in the *node_modules* directory.
    
    d. **npm install --save-dev [name of package]**: same as above, except that the package is listed in the devDependencies section of the package.json file.


### Starting Node
1. One of the very first things we can do with Node is, at the terminal, type in the command **node**. This creates a node process, and starts a **repl**, which stands for "read, eval, print loop". The repl keeps node open, the process does not immediately close. When we type something in at the **standard in**con (*i.e.*, the console), the node process takes the input, evaluates it, and prints the return value, if any to the standard out.  Consider the following:
    ```node
    > console.log(10);
    ```
    this will result in the output:
    ```node
    10
    undefined
    ```
    because it was instructed to log out the 10, and there is no value returned by the eval. Compare with the following:
    ```node
    > let x;
    undefined
    > x = 5;
    5
    > console.log(x);
    5
    undefined
    ```
    Declaring x has no return value.  Assigning x does have a return value of the assigned value. Console logging has an *effect* of printing out the value, but has no return value. 
    
2. Another thing of interest that we can do is type "process" at the command line to see the current node process (the analogue of the *document* in the browser). We can see lots of information, including environment variables, and methods available to the process (such as exit, which we can use to terminate the process).

3. Next, we can create a Node program and run it in a process. To do this, create a directory, and a file inside it with the following:
    ```javascript
    //gcw/app.js
    console.log('Goodbye, cruel world!');
    console.log('args', process.argv);
    ```
    Then, if we go to the gcw directory, and type the following command:
    ```
    node app.js
    ```
    we will create a new process that will immediately print our farewell message, as well as the array of arguments handed to the process. The first argument in the *argv* array will be the path to node, and the second will be the path to the file we are running.
    
## Modules / Require
1. One of the key aspects of Node is the module system, which allows us to isolate code into units of functionality, and keeping from placing everything on the global scope.

2. We have mentioned npm as a means of gaining access to code written by others to handle various tasks. In addition, Node itself is built out of numerous modules, which we can view by clicking on the API docs tab of *nodejs.org*. For example, there are File System, Crypto, Stream, etc. Node is meant to run very lightweight, so we must import in the particular modules for the functionality we need - only a very limited set of functionality is included in the plain node package.

3. The **require()** method is part of every module instance, and we can, but do not need to, precede "require()" with "module.".  So, the following are the same:
    ```
    const fs = module.require('fs');
    // or
    const fs = require('fs');
    ```
4. Note that when we require a module, node will first look to its modules, then to those in the *node_modules* folder. These do not need paths, since node will know where to look. But if we are immporting our own files, we will need to provide path information as well as the name.

5. On the other side of require is the **exports** property of the module object. *exports* is an object, and anything placed into it is made available to be required into another file/module.

## User Input via the Command Line
1. Of course, it is hard for an app to be of any interest unless it can get input from a user, or other source. We will cover many different forms of user input in this outline, but we start with a very basic source - the command line.

2. The first thing we can do is pass arguments into our node process when we start it up. To do this, we type at the command line the following:
    ```
    node index.js Jordan Jay Thompson 2
    ```
    This will add the following arguments to the array **process.argv**:
    
    a. the path to node
    
    b. the path to index.js
    
    c. the strings 'Jordan', 'Jay', 'Thompson', and '2'

3. If we wish to add flags and additional arguments at the command line on startup, Node is not very flexible; everything as separated by a space will be added to the *argv* array. We will have the information and can parse it, but it will be a lot of slogging through string manipulation.

4. For purposes of this outline and the accompanying *notes-node* app, we will avoid this tedium by using an npm module to handle the parsing of the command line input - a package called **yargs**.

## Socket.io
### Introduction
1. **Web Sockets** is a protocal for two-way, real-time communication between a server and client. The client could be a web-app, a phone app, *etc.*

2. Notice the change from the traditional relationship between a server and client, where a server only sends responses to a client's requests. So, for example, if the server got some information that a tornado was coming, it would not do anything to alert the client's, unless the client actually sent a request to the server asking for that information.

3. Historically, the following approaches were taken, leading up to websockets:

    a. **XHR Polling**: the client would make periodic requests to the server. As the time interval between the requests got smaller, it became more and more like real-time communication. However, the server mostly sent back null responses, since it didn't have any new data.
    
    b. **XHR Long Polling**: the client would make an XHR request to the server, but the server doesn't respons until it has some data to send. Upon receiving a response, the client immediately sends a new request.
    
    c. **Websockets**: This is the new protocol for real-time communication with HTML5.  A protocol "handshake" is made over HTTP and, once the connection is established, the client and server can have an ongoing communication channel over a TCP socket.