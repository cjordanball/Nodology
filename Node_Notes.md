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
Note that many are now switching away from npm to **Yarn**, a joint project of Facebook, Google, and some others. For more information, go to https://yarnpkg.com/lang/en/. However, note that the packages are still maintained on npm's repository site.
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

2. We have mentioned npm as a means of gaining access to code written by others to handle various tasks. In addition, Node itself is built out of numerous modules, which we can view by clicking on the API docs tab of *nodejs.org*. For example, there are *File System*, *Crypto*, *Stream*, *etc*. Node is meant to run very lightweight, so we must import in the particular modules for the functionality we need - only a very limited set of functionality is included in the plain node package.

3. The **require()** method is part of every module instance, and we can, but do not need to, precede "require()" with "module.".  So, the following are the same:
    ```javascript
    const fs = module.require('fs');
    // or
    const fs = require('fs');
    ```
4. Note that when we require a module, node will first look to its modules, then to those in the *node_modules* folder. These do not need paths, since Node will know where to look. But if we are immporting our own files, we will need to provide path information as well as the name.

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

4. For purposes of this outline and the accompanying *notes-node* app, we will avoid this tedium by using an npm module to handle the parsing of the command line input - a package called **yargs**. Yargs makes available on the property **yargs.argv** our command line input in an object with the following form:

    a. commands without any preceding notation are stored in an array as the value of the "_" property,
    
    b. properties preceded by two dashes and assigned a value (node app.js --name=Jordan or node app.js --name Jordan) will be properties in the object, as a key/value pair.
    
    c. if we put quotation marks around our value, it can be multiword.

5. *Yargs* is actually a pretty powerful and comprehensive application for dealing with command-line input. The documentation is generally rather scattered, and obfuscated by a need to adhere to a pirate theme, but one can find a good be of information in the API documentation. Below, we go through some of its key features, to get a start.

6. At its most basic, we have *yargs.argv*, which is simply an object containing the parsed arguments as a group of key/value pairs. But before the *.argv*, we can chain a wide variety of methods, as documented. For example, we will use the **command()** method. This method takes a command name as the first parameter, followed by a description for the second parameter (used to build help dcoument), followed by an options object detailing what arguments the command requires:

    ```javascript
    const argv = yargs
        .command('add', 'Add a new note', {
            title: {
                describe: 'Title of the note.',
                demandOption: true,
                alias: 't'
            },
            body: {
                describe: 'This is the text of the note.',
                demandOption: false,
                alias: 'b',
                default: "Four score and seven years ago . . ."
            }
        })
        .help()
        .argv
    ```
    We can pass in a *command* method for each command that we anticipate being entered by our user.
    
    Note the provision of an **alias**. This allows us to provide shortcuts to the user. Also, the alias can be preceded by a single hyphen, rather than double hyphens for the main argument name.
    
    Note the insertion of the **help()** method. This allows someone to access information by running "--help** at the command line.
    
    
    
    

## Debugging Node (Version 8+)
1. Version 8 of Node has a couple of new debugging tools, so confirm that you are using a current version before trying to apply the techniques described herein.

### Debug Mode
1. One new feature added was a **debugging mode** allowing debugging from the command line. This is engaged by inserting the word **inspect** between the *node* command and the file name, as so:
    ```
    node inspect app.js
    ```
2. When node is running in *debug mode*, it will pause even before it executes any lines. At the beginning, we see something interesting:
    ```javascript
    < Debugger listening on ws://127.0.0.1:9229/89fe2a27-e345-4b91-b502-63affcd0a042
    < For help see https://nodejs.org/en/docs/inspector
    < Debugger attached.
    Break on start in debugging.js:1
    > 1 (function (exports, require, module,
        __filename, __dirname) { let person = {
      2   name: 'Jordan'
      3 };
    ```
    The first three lines are merely boilerplate. However, note that our code is wrapped in a self-executing function with a number of parameters important to a module. This is done by Node for all module files. This gives us access to a number of properties, as listed above.
    
3. Inside the debug mode, we can access the node **repl**, by typing "repl" at the command line. To close the *repl* and go back to debug mode, type *Ctrl + C*. Using the repl, can check to see what the values of our variables are, *etc.* In short, in the repl mode, **we can access the application as it currently stands.**

4. If we have a larger application, we would not want to go line-by-line through our code using the *n* command (see below) to get to some place we need to go look. Instead, we can place the **debugger** statment in our code, which acts as a break. Then, if we hit the *c* command, we will continue up to the next debugger statement. 

5. Some commands we can use are:

    a. **list**(x): instructs node to display in the terminal the preceding and following x lines of code from where we are.
    
    b. **n**: is short for *next*, and moves the application along to the very next statement. This will run the code to the beginning of the next statement. For example, if oour program shows in the terminal as:
    ```
    < Debugger listening on ws://127.0.0.1:9229/89fe2a27-e345-4b91-b502-63affcd0a042
    < For help see https://nodejs.org/en/docs/inspector
    < Debugger attached.
    Break on start in debugging.js:1
    > 1 (function (exports, require, module, __filename, __dirname) { let person = {
      2 	name: 'Jordan'
      3 };
      4
      5 person.age = 25;
      6
      7 person.name = 'Mike';
      8
      9 console.log(person);
     10 });
    ```
    After we enter *n* once, we will advance from the wrapper function to the first line of our code. However, this first line has not yet run, and *person still has no name*. After we enter *n* a second time, the arrow will move down to line 5, and *person* will have the name of "Jordan"; however, person will not yet have an age.
    
    c. **c**: is short for *continue*, and tells the application to continue on to the end, or to the next **debugger** statement, not stopping line-by-line.

6. We can also use the debug mode with **nodemon**. This allows us to make changes, then immediately start back up in debug mode. Just substitute *nodemon* for *node* in the command line.

### Debugging with Chrome Dev Tools
1. We can do pretty much exactly the same things in the browser (Google Chrome) as we are doing above in the terminal; however, to do this, we should run our app as follows:

    ```
    node --inspect-brk appName.js
    ```
    After doing that, we can get to the debugging page by entering the following in our address bar:
    ```
    chrome://inspect
    ```
    Then, on the inspect page, we need to click on the "Open dedicated DevTools for Node" link.

2. Note that we can toggle access to the console from the new window with the *ESC* key. In the console, of course, we will have access to the REPL.

3. The primary tab that we will use is the *Sources* tab, which will show our code and debugger tools on the side.

4. We can set breakpoints in our code simply by clicking on the lines in the debugger window.


## Asynchronous Programming
1. One of the core features of Node is that most of its methods are **asynchronous**, or **non-blocking**. This means that they do not stop the programming flow, but allow other things to happen while the computer is waiting for the asynchronous process to complete. For example, let's say that the user can click on a button, at which time the front-end will send a request to a server to get the current price of Google stock. Instead of freezing the client machine until the stock price gets back to it, it can be doing other things.

2. As a quick example, look at the following:
    ```javascript
    console.log('Starting app.');

    setTimeout(() => {
        console.log('inside of callback');
    }, 2000);

    setTimeout(() => {
        console.log('second timeout');
    }, 0);

    console.log('Finishing up');
    ```
    The above code will generate the following output in the console:
    ```
    Starting app.
    Finishing up
    second timeout
    inside of callback //(pops up after two seconds)
    ```
    The first line should be no surprise. The last line should be guessable from any understanding of the concept of *non-blocking*, we know it is not going to happen for 2 seconds, and the others are ready to go! The big surprise might be the position of the second and third lines - if the first one is set to wait for 0, then why is it behind the last line?
    
3. Below is an illustration of the pieces that are operating behind-the-scenes with Node. When there are no asynchronous methods, then the only part that will be in use is the **Call Stack**. This is a **LIFO** data structure that holds open operations. When we call on a function, it goes onto the top of the stack, when it returns (or completes), it goes off the stack; however, things can only happen at the top of the stack. 

![image](https://s3.amazonaws.com/cjbinfo-docs/AsyncPieces.png)
    

4. So, in the above, the first thing that will go onto the call stack will be the **main()** function, the wrapping function that Node puts on all modules. Then, on top of that, we wil have the assignment of 1 to the variable x. That will complete and go off the stack, but *main()* will remain open at the bottom, since it also wraps the other two lines. Then, the assignment to y of (x + 9) will occur and go off the stack. Then the console.log method will go on the stack and be executed, go off the stack.

5. When we have an async method, it goes to the Call Stack, and the thing that it does is register the method with the **Node API**. It will sit there until the occurence of an event that will tell it to send a callback to the **Callback Queue**. A *queue* is a **FIFO** data structure, so things get in line to be sent to the *Call Stack*.

6. The **Event Loop** continuously runs, and, if the *Call Stack* is empty and there is something in the *Callback Queue*, it moves the first item in the queue to the Call Stack for execution.

7. When the *Call Stack*, *Node API*, and *Callback Queue* are all empty, then the process will terminate. Note, however, that there it is not necessary that the process ever terminates. We could have a server, for example, that waits indefinitely for a request to come in, which will cause it to do something and send a callback to the Callback Queue containing the response. That process would remain open, until someone kills it by hitting Ctrl + C.

## Http Requests
1. In a **response** to an http request, we can expect to receive a giant object with tons of meaningless properties. We can weed out most of these by running **JSON.stringify()** on the response object, which ignores non-enumerable properties and symbol properties.  To make it print to the console well, then we can add a *null* second parameter and an number third parameter, being the size of the space indentation of inner lines. To make it an object again we can run *JSON.parse(JSON.object(response))*.

2. The stripped down object will contain the following important properties:

    a. **statusCode**: 200, 404, etc.,
    
    b. **body**: the response data,
    
    c. **headers**: these are for the response, generated by the server,
    
    d. **request**: this will contain the parsed url, the method, and the request headers.
    
3. Note that the *statusCode* will tell us whether there is an error, or not; however, this is a code sent back from the server describing whether there is an error on the server. The *error* included as a parameter to an http request callback is dealing with the status of our request. For example, if we send a request to "htt://maps.gorgle" we will generate our own error, not receive one from a nonexistent website.

4. What we actually get is an error object, the most important property of which will be **code**.

## Socket.io
### Introduction
1. **Web Sockets** is a protocal for two-way, real-time communication between a server and client. The client could be a web-app, a phone app, *etc.*

2. Notice the change from the traditional relationship between a server and client, where a server only sends responses to a client's requests. So, for example, if the server got some information that a tornado was coming, it would not do anything to alert the client's, unless the client actually sent a request to the server asking for that information.

3. Historically, the following approaches were taken, leading up to websockets:

    a. **XHR Polling**: the client would make periodic requests to the server. As the time interval between the requests got smaller, it became more and more like real-time communication. However, the server mostly sent back null responses, since it didn't have any new data.
    
    b. **XHR Long Polling**: the client would make an XHR request to the server, but the server doesn't respons until it has some data to send. Upon receiving a response, the client immediately sends a new request.
    
    c. **Websockets**: This is the new protocol for real-time communication with HTML5.  A protocol "handshake" is made over HTTP and, once the connection is established, the client and server can have an ongoing communication channel over a TCP socket.