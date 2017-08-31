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

## Express

1. Creating an Express server is super-simple, requiring only that we require Express, call the method **express()**, which returns the server, then running the **listen()** method on the server, as follows:
    ```javascript
    var server = require('express')();

    server.listen([port#], callback(err))
    ```
2. Express allows us to set up routing very easily; for example, we can use the **get()** method on the server, passing in a route and a callback as parameters. The callback will have the request and response objects as parameters, as follows:
    ```javascript
    app.get('/users', (req, res) => {
        res.send([some response]);
    ```
    **Note:** The **send()** method will automatically provide a *content-type* header of *tex/html*, unless the passed in argument is an object, in which case it will default to *application/json*.


3. **Middleware** are functions in express that let us configure how express works. To add middleware, we call **app.use()**, and pass in the route and a callback function that will take three parameters: the *req* and *res* objects, and the *next* method, which when called will send us on to the next registered middleware.   

4.  A very commonly used middleware is the **express.static()** method, which identifies a location where publicly-available static assets, such as images, html pages, *etc*., are kept. Typically, this will be in a directory named *public*, and is identified by the full path (which is simplified by using **__dirname**, as follows:
    ```javascript
    app.use(express.static(`${__dirname}/public`));
    ```
    
To set up path for static files, use this middleware:
    ```javascript
    [app.use](express.static(root, [options]));
    //place below calls for routing files, so http requests aren't
    //searched first in the static files before getting to the route files.
		
3. To choose a template-engine and set the path for views:

		app.set('views', './app/views');
		app.set('view engine', 'jade');
		
4. Mounting middleware functions:

		app.use([path], function(req, res, next) {
			function(){}
		});
	"path" is for matching the route.  It will match any path that contains the given path, and any followed by a "/".  So, '/' will match '/', '/test', '/whatever'.  '/test' will match '/test/jordan', 'test/bob', etc., but will not match '/text'.
	
	The default is '/', so if no [path] is given, every request to app will be subject to the middleware.
	
5.  Calling middleware:  Express can chain multiple middleware in a single routing definitation.  For example: 

		app.get('/', mid-function1, mid-function2)
	
### Templates & Engines
1. As we saw above, it is very easy to set up a public folder to distribute out static web-pages. In addition, we can create HTML **templates** into which we can insert dynamic data.

2. There are numerous options for templating engines (*ejs*, *pug*, *etc*.).  In the examples below, we will use *handlebars*, which can be found on npm as *hbs*. After installing it, we must require it into our server page, and then tell Express that it is being used, as follows:
    ```javascript
    //the second argument is the view engine we have chosen
    app.set('view engine', 'hbs');
    ```
3. Once that is done, we can place our templates in a directory named **views**. Then, we can assign a template to a route using the **res.render()** method:
    ```javascript
    app.get('/about', (req, res) => {
        res.render('about.hbs');
    });
    ```
    **Note**: Express will know to look in the *views* directory to find the file, *about.hbs*.

4. We can then interpolate data into the template by passing into the *res.render()* method as a second parameter an object of key-value pairs. Then we place the keys into the template, surrounded by double braces, {{ }}. For example:
    ```javascript
    //server.js
    app.get('/about', (req, res) => {
        res.render('about.hbs', {
            pageTitle: 'About Page',
            currentYear: new Date().getFullYear()
        });
    });
    ```
    ```html
    <!--about.hbs-->
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Some Website</title>
        </head>
        <body>
            <h1>{{pageTitle}}</h1>
            <p>Some text here!</p>
            <footer>
                <p>Copyright {{currentYear}}</p>
            </footer>
        </body>
    </html>
    ```

5. As we move beyond having a small number of view pages, we may want to take out parts that are common to all, or at least multiple, pages and keep the segregated. This will allow us to update them as necessary in a single location, rather than having to go into each view file to update. For example, it is very common to have a *header* or a *footer* on each page. These pieces are known as **partials**. 

6. With Handlebars, we must register the directory in which we are going to keep our partial files, with a single line of code using the **registerPartials()** method on the *hbs* object:
    ```javascript
    //server.js
    //requires absolute path to directory
    hbs.registerPartials(`${__dirname}/views/partials`);
    ```
7. Then, we create the *partial* file, just like it was a regular template. Finally, we call the partial into the parent template with the following syntax:
    ```html
    <!--home.html, insert the foooter partial -->
    {{> footer}}
    ```
8. In addition, we can register helper methods with Handlebars to run in the template. For example, we could have a line such as:
    ```javascript
    //server.js
    //two parameters, a name and a function
    hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
    });
    ```
    Then, where we need to have the year in a template, we just place *{{getFullYear}}*, and we do not have to place it into each individual route.
    
    **Note**: Our registered helper can take parameters, but uses a strange syntax, as follows:
     ```javascript
     <h1>{{helperName [arg1Name] [arg2Name] . . .}}
     ```
    Note that the method is followed by arguments with no parens, but only a space separating the method and the first argument, and each argument thereafter.
    
## Express Middleware
### Introduction
1. **Middleware** are functions in express that let us configure how express works. To add middleware, we call **app.use()**, and pass in the route and a callback function that will take three parameters: the *req* and *res* objects, and the *next* method, which when called will take us on to the next registered middleware in line.

2. Middleware is **registered** with Express using the **app.use()** method.
    ```javascript
    app.use([path,] callback [, callback]);
    ```
    The path is the path for which the middleware function is invoked (default is '/'), and the *callbacks* can be a middleware function, a series of such functions separated by commas, or an array of middleware functions.
    
    For example, we have a very simple middleware to tell Express where our static files are:
    ```javascript
    app.use([express.static(`${__dirname}/public`);
    ```
 
3. The callback in our *app.use()* method takes three parameters, **req**, **res**, and **next**. The last of these is used to tell Express when our middleware function is done. If *next()* is not called, the app will not move on to the next thing, but will get stuck. So, for example, if we have the following middleware:
    ```javascript
    app.use('/toast', (req, res, next) => {
	console.log('test0');
    });
    ```
    My app will work fine, until somebody visits the */toast* route, at which point "test0" will print to the console and the page will hang, waiting for the **next()** command that never comes. If, instead, our middleware was:
    ```javascript
    app.use((req, res, next) => {
	console.log('test0');
        next();
    });
    ```
    **Every** route would hit the middleware, as the default value is "/", and so every request would print "test0" to the console, and the app would move on.

4. It is **very important** to note that Express middleware is called in order as it is written. So, for example, we will probably want to have our *express.static()* setting middleware at the end, so that it only gets called if other middleware allows it to get that far.

## SSH Keys - Setting Up and GitHub
1. To see if you have any SSH keys already on your computer, type at the command line:
    ```
    ls -al ~/.ssh
    ```

2. To generate an SSH key, type at the command line:
    ```
    ssh-keygen -t rsa -b 4096 -C '[email address]'
    ```
    This will create a couple of files, the public/private key pair. We can then just hit enter a few times to accept the default filename and no passphrase option.
    
3. The **id_rsa** file is the **private key** file. **Never give access to this file.** The **id_rsa.pub** file is the **public key** file.

4. At this point, we need to run the **ssh-agen**. To do so, type at the command line:
    ```
    eval "$(ssh-agent -s)"
    ```
    If this is correctly entered, then we should get back a message with the pid (process id) of the SSH-Agent.
    
5. Then, we have to tell the SSH-Agent where the private-key file is:
    ```
    ssh-add ~/.ssh/id_rsa
    ```
    Assuming all went well, we should get back an "Identity Added" message. The computer now knows where to look if it needs the ssh key credentials.

:::danger
:::

####Express Methods
There is only one Express method, the *static* method.  It is responsible for serving static assets of an Express application.  It takes the form:

		express.static(root [,options])
		//root is the root directory from which static assets will be served (typically 'public');
		//options is an object of key:values.  See the express API document for the full list (typically without options).  

####Application Methods
The application object is an instance of the express application, and is primarily used to configure the application.



2. **app.all**: This is the same thing as the app.[GET/POST/PUT/DELETE] methods, except it matches all HTTP verbs.  It is useful as a mapping device for global logic.  Example:

		app.all('*', requireAuth, loadUser);
	This would have all requests, to all routes, going to the requireAuth middleware, then to the loadUser middleware.  Of course, the app.all could apply to specified routes.
	
	
3. **app.get**: This method sends the get request to the designated path (i.e., the first parameter).  Subsequent functions included as parameters will act as middleware, going from one to the next in order, but they can invoke *next ('route')* to bypass the remaining).

		app.get('/', function(req, res){}, function(req, res){});

4. **app.delete**: Similar in style to *app.get*.

5. **app.post**: Similar in style to *app.get*.

6. **app.put**: Similar in style to *app.put*.



7.  **app.route**: this returns an instance of a single route, which can then handle HTTP verbs with middleware.  Its form is:

		app.route(path)

	Common use is to be followed by HTTP verbs.  Example is:
	
		app.route(/route)
			.all(fucntion(req, res, next) {}) //runs on all HTTP verbs.

9.  **app.param**: used to attach functionality to any request made to a path that includes a designated parameter.  In form of:

		app.param([name], function(req, res, next){}) // [name] is the name of the parameter, or an array of them.

10. **app.render**: returns a rendered HTML view via a callback function.  Has three parameters: i) the view, ii) an object of local variables to inject into the view, iii) a callback function.

	This method is very similar to *res.render*, except it cannot send the rendered view to the client.  Res.render actually uses app.render behind the curtains, but then sends it.  App.render might be used for things not to be sent as a response, such as e-mail templates.
	
11. **app.set**: used to set the settings for the application.  For a complete list of the values that can be set, see the Express API.  The form is as follows:

		app.set(settingName, valule)
		
	The most commonly used is probably the "views" and "view engine" settings.



####Request Methods
The request object is a wrapper of the Node.js HTTP request object and is used to extract information aoub the HTTP request.

1. **req.query**: an object containing the parsed query-string parameters.

2. **req.param** a request METHOD, it is used to return a value, or to set the value if it includes the second ('defaultValute') parameter.  It looks for the given parameter in the following places, in this order: 
	a. req.params
	b. req.body
	c. req.query

			req.param('name', [opt def value])
			
	This method is deprecated.  Should use req.params, req.body or req.query.

3. **req.body** a request PROPERTY, it is an object of key-value pairs of data submitted in the request body.  It is undefined by default, and populated by such middleware as body-parser.

4. **req.params** is a request object containing properties mapped to the parameters of the named route.  It has a default of {}.  If their is a route, for example, of /user/:name, then there will be added a name parameter in params.

5. **req.query**: a request object containing a key for each string parameter in the route.  If no query string, it is {};

		//GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
		
		results in the following req.query object:
		
				{
					order: 'desc',
					shoe: {
						color: 'blue',
						type: 'converse'
					}
				}






####Response Methods
The response object is a wrapper of NodeJs HTTP response object, and is used to set response data and headers.

1.	**res.send**: used to i) set content-type header and send a response using Connect's res.end() method.  It sets the 'content-type' header to 'text/html' for a string, to 'application/octet-stream' for a buffer, and to 'application/json' for an object or array.

2. **res.json**: used to send a json response.  Identical to res.send, but with an object/array as parameter.  It can also convert other values to json (such a null, or undefined);

3. **res.status**: used to set the HTTP status code of the response.  Follows the form:

		res.status(code)
		
		Ex: res.status(400).send('Bad Reqest');
		
		Ex: res.status(404).sendFile('/absolutepat/to/404.png')

4. **res.redirect**: redirects an incoming request to the url derived from the specified path.  Default status code is 302, but can be set as the first parameter).  The redirect can be to a different site url (https://google.com); a path relative to the root of the host name.  To do so, include a preceding '/' (res.redirect('/admin')), or to a relative path.  Res.redirect('back') will redirect the request back to the referer (or '/', if missing).

4. **res.render**: takes the form res.render(view [,locals], [, callback(err)])

	It renders a view, and sends the rendered HTML string to the client.  Locals is an object of key:value pairs of local variables for the view.
	NOTE: if a callback is specified, the rendered HTML strng must be sent explicitly, with a res.send() or res.end() method.
	
5. **res.sendFile**: takes the form res.sendFile(path[,options][,callback])

	res.sendFile() transfers the file contained at the given path, setting the Content-Type response header based on the filename extension.  The path must be absolute, unless the root option is set in the options object.  See documentation for description of other object properties:
	
		app.get('/file/:name', function(req, res, next) {
			var options = {
				root: __dirname + '/public',
			}
			var fileName = req.params.name;
			res.sendFile(fileName, options, function(err) {
				if(err) {}
			})
		})



####Basic Structure Setup:

1.  As a basic project setup, it may be helpful to keep the following structure:

		app
			controllers
			models
			routes
			views
		config
			env
			config.js //to configure the Express application
			express.js //to initialize Express application
		public
			css
			img
			scripts
		server.js //the main file of the application, will load the express.js file as a module to bootstrap the Express application.
		package.json
		
	Note that their will be sever other folders in the public file when Angular is involved.

####Configuration

In Express, one can set up alternate configurations, and switch between them based on the environment. Typically, different configuarations are used for development and production.  This can be kept in node.js's **process.env.NODE_ENV** variable.  Take the following steps:

1. In the main file (server.js/app.js), start with the following line:

		process.env.NODE_ENV = process.env.NODE_ENV || 'development';
		
	This defaults to the development configuration.  This can be changed when uploading to Heroku to "production".
	
2. In the config/express.js file, have conditional middleware calls based on the value of process.env.NODE_ENV.

3. In the config folder, create an 'env' subfolder with separate files for each environment ('dev.js', 'production.js').

4. In the config folder, create a 'config.js' file containing the following snippet:

		module.exports = require('./env/' + process.env.NODE_ENV + '.js');
		
	This file, when called, simply requires the appropriate env configuration file.  It should be required into the express.js config file.
	


###Express-Session

1.  Express-session places a cookie with a unique ID on the client browser, so that user-specific data can be maintained during the client's session.  The actual data is on the server side.

2.  First step is to set a secret string in the dev and production env files.

		sessionSecret: 'developmentSecretWord'

3. After requiring 'express-session' into the express.js config file, it will need to be called as middleware, with app.use.

		app.use(session({
			saveUnitialized: false,
			resave: false,
			secret: config.sessionSecret
		)));
		//config.sessionSecret refers to the dev/production env file.
		//saveUnitialized: a session is unitialized when it is new but not modified.  False helps comply with legal requirements of user permission before storing a cookie.
		//resave: false is being made the new default value.  If true, the session will be saved to the session store, even if the session was never modified during the request.

4. The session middleware adds a *session* object to all request objects.  Once the session is established, data can be added to the session object, and then gotten from req.session.[whatever].``








## Promises

:::danger
The following is brought over from a paper on Generators, which had a good section on promises
:::

## Asynchronous Code in Javascript -
## Talking 'bout My Generator

### A.  Why Even Use Asynchronous Code

Typically, when one begins learning to code, one learns to do so in a very methodical manner. One might start a program by declaring a variable, then doing something to assign that variable a value, then do something else to transform that value, then return that value to a new variable, or print it to the screen in some manner.  For example:
```javascript
    var x;
    x = "Now is the winter of our discontent made glorious summer";
    x = x.split(' ').reverse().join(' '));
    console.log(x);
```    
After the above code runs, we see the rather unShakespearean "summer glorious made discontent our of winter the is Now".

The above code is **synchronous** in its approach. Each line is completed before the computer moves onto the next line.  We don't need to worry that we are splitting, reversing or joining parts of x before we knew what x is, because we can trust that the computer will complete the assignment of our string to the variable x, and *only then* will it start performing various string and array methods on that value.

In some contexts, it makes a lot of sense to have our code work in an asynchronous manner. For example, the code behind a web page often has no idea when it will be called. If we have two buttons, for example, one red and the other blue, and clicking on either one will turn the text in a paragraph the color of the chosen button, we have no idea the order in which the code will be called, or when particular code will be called, or even if it will ever be called at all.

To deal with this, we will attach to pieces of the webpage (or, rather, the **Document Object Model (DOM)** that tells the browser how to draw the webpage), **event listeners**, which lie in wait for the designated event to happen to the designated piece of real estate on the webpage (or, more technically, for the event to fire on a designated element in the DOM). To each event listener, we give two important pieces of information: the type of event (a click of the mouse, the typing of a particular key, *etc.*) and a **function**, generally referred to as an **event listener**, which tells the computer what to do when the event happens to the DOM element to which the listener is attached. Obviously, we never know when one of these functions may be called into action. The user may never desire to turn the text a funky color.

Another common use of asynchronous progromming arises in the context of a server, a computer program responsible for receiving requests from its clients and responding, typically by returning it some information that it either has readily available, or has the ability to obtain from other sources.

At this point, we should note that we are dealing with three very different ranges of time when we deal with web programs. The computer may be dealing with things within the memory contained within its processor or in random access memory, or may be getting data from its hard drive, or may be going out onto a network (including the internet) to obtain information.  These could be compared to one answering:

a.  what your own phone number is,
    
b.  what your neighbor's phone number is, requiring you to go to your home bookshelf and look up the number,
    
c.  what is the phone number of Sung-Jin Kim of Pusan, requiring that you go across town to a major library that has phone books from around the world.
    
The first answer is given in about one second, the second question may take about five minutes, and the third may take anywhere from a couple of hours to a couple of days, depending on when you have time to make the trip to the library.  Similarly, your computer takes much longer (tens to thousands of times longer, depending on the type of request) to get data contained on a file on its hard drive than to retrieve it from memory, and even greater amounts of time (going from milliseconds to seconds, minutes, hours) to obtain from a source on a network, including the internet.

Oftentimes, a server on a network may be engaged in very trivial work, but whole lots of it. For example, it may be receiving thousands of requests each minute for something as simple as checking to see if there is a message and, if so, to send it to the client.  It's total time of actually doing work may be minimal, but it may have a good amount of waiting around. It gets the request, sends its own request out to a database and may wait a couple of seconds for a response, only to take that data and create and send its response to the original request in a matter of nanoseconds.

This is where the synchronous / asynchronous comparison comes into play. Imagine a waiter at a crowded restaurant who greeted the customer at the door, sat them down at a table, stood at the ready until the table ordered, took the order to the kitchen, waited twenty minutes until the food was prepared, took it back to the customer, stood by the table until the meal was finished, presented the check, collected payment, and then, once the customer left, went to the door to greet the next customer.  This is basically the synchronous approach to table-waiting. Obviously, the restaurant owner will be unhappy with only one table being occupied at a time.  He can handle the problem in two ways.

First, he can continue the synchronous approach, but just hire more waiters, one for each table, who will continue to give excellent service, but at a very hight cost; each waiter will engage in short bursts of activity, followed by long intervals of waiting around. This approach is often used by computers, with the waiters being called threads.

Alternatively, the restaurant owner can point out that all the time spent standing around could be used to serve other customers, and that one waiter can easily handle several tables. Occasionally, this may cause some delay, if two tables happen to finish their meal at exactly the same time, for example, but such backups will be minor, because there is no single task that will block up the waiter for a very long time. This is very much the asynchronous approach, and a server language such as Node.js does the computer equivalent of circling the restaurant, constantly taking care of any task as it arises.

When our Node.js server is running asynchronously, looping and looping looking for the next thing to do, we should note the kind of operations that are going to act asynchronously. A lot of our code is going to run in a synchronous manner; for example, our initial little program that reverses the words of the Richard III is still going to run in an orderly way from start to finish. However, let us look at the following extension of that program:le:
```javascript
var x;
x = readFile('./richard3.txt');
x = x.split(' ').reverse().join(' '));
console.log(x);
```
In this imaginary code, readFile is represents a function that will go to the file designated in the parameter, will get the text contained in that file, and assign it to the variable x. However, although there is actually a method in Node called *readFile()* that performs roughly the task just described, the above approach will not work because the readfile method is **asynchronous**. Remember, the task of receiving text from another file, even one contained on the computer's own hard drive, takes tens, hundreds, or even thousands of times longer than the other operations going on in the computer's memory.  Thus, the approach taken by Node.js is to send off for the text in the other file, then move on to the next task at hand. (For what it's worth, Node.js actually provides a synchronous version of this method, readFileSync(), which works in a synchronous manner, waiting until completion then returning a value).

If we try the code as written above (actually, we would make a few additions first, "requiring in" the fs module in which readFile() resides, and adding another parameter to readFile to have it return text), we would have a problem: before readFile had gotten a value to assign to x, the computer would have moved on to the next line and x, still being undefined, would have no *split()* method and this would generate an error. So, basically, we are trying to write code in a synchronous style when the computer just won't behave.  Remember (really, please remember this for later), that all we want in this example is for the computer to just take a breather while we get the text from the text file, and then start back up.

### B. What to do About Asynchronous Code?

#### Callbacks

So, how do we get the computer to wait? The basic, standard approach is to use **callback functions** to wait around until the action is complete, then execute. Typically, an asynchronous method in Node.js will have the following form (the example below shows the readFile method as actually used:
```javascript
const fs = require('fs');

fs.readFile('./textFile.txt', {encoding: 'utf-8'}, (err, data) => {
    if (err) {
        //do something with the error
    } else {
        //do something with the data obtained
    }
}

```
The biggest feature of the above code may be what there is not - there is no assignment of a value from the readFile method; no way to put the data into one's pocket to bring out later when needed. Instead, one knows that whenever the computer gets around to reading the text contained in our file *textFile.txt*, then the callback function will spring into action.  If the *readFile()* method was unsuccessful, *e.g.*, the file did not exist, or the data was corrupted, then we will do something to handle the error; however, if all goes as planned, then the text obtained will be present in the *data* argument, and we can do what we want with it in the *else* condition.

Very quickly, however, one discovers that, like a crab pot, it is very easy to enter the callback world but very difficult to get out. **Anything that depends on the existence of the data obtained by our *readFile* must be dealt with in the *else* condition, it will not be available outside it.**  In addition, we may have further asynchronous tasks.  For example, we may take the data obtained, manipulate it some manner to obtain a URL, then go to that URL to obtain some data, which we will then wish to write to a file.  For each of those two operations, we will have another level of callbacks, and very quickly learn what is meant by the term **callback hell.**  One might compare the experience to a beginning skiier being halfway down an expert-level slope, just wanting to make everything stop, store his data somewhere, and never come back again, only to realize that the only way out is to just keep moving.

#### Promises

One means of dealing with asynchronous functions that has proved a popular alternative to callback hell has been the use of promises.  They have been in use through third-party libraries for a while, but have recently become a part of the "official" JavaScript language with the adoption of ES6.

Basically, a **promise** is an object that is returned by an asynchronous function that initially is in a state of **pending**, *i.e.*, the function is still out trying to do whatever it is supposed to do. For example, if we require in the node-fetch library, we can access its **fetch** method, which takes a URL and obtains data from that source.  For example:
```javascript
const fetch = require('node-fetch');

let x = fetch('https://www.google.com/#q=kitten+pictures')
```
The above code will assign a promise to x.  The promise has a **then()** method, which takes two parameters:

a.  the first is a "success function", the parameter of which is the data returned by the fetch,

b.  the second is a "failure function", the parameter of which is the error object returned by the failed promise.

So, our most basic example might look like:
```javascript
const fetch = require('node-fetch');

let x = fetch('https://www.google.com/#q=kitten+pictures');

x.then((res) => {
	console.log('success', res);
}, (err) => {
	console.log('failure', err);
});
```
The code above will result in a giant response object appearing in the console, aasuming Google coughs up its response.  If something goes wrong (for example, if you have Comcast as your internet provider), then you will end up getting an error object, to be handled by the callback passed in as the second parameter.

Promises do have some other features that make them more convenient to work with than callbacks. For example, they can be chained, and a **.catch()** method can be placed at the end of the chain, so that there is a single location for handling errors that arise, rather than having a separate error handling function for each promise in a chain. In addition, there are methods for handling multiple promises at a time and other situations; however, we will leave those points for the reader to research, in order to get to our primary focus, the use of generators.

#### Avoiding Descent into Callback Hell With Chaining

1. The following is a very simple, but real world example of how we can use promises to avoid the need to nest one action inside another, and thus avoid sliding into a *promise hell* situation. We will use two async calls to i) first, get the geolocation coordinates of the address we enter, then ii) call a weather API with our lat/lng pair to get current weather info. Obviously, with callbacks, we cannot start the second action until the first one is complete, so the second call will be made in the callback function of the successful first call.

2. We could also do something very similar with promises, calling the weather service in the callback of the *then()* method upon a successful first step. Then, upon successful return onf the weather data, we can have a *then* callback to the weather fetch.  In sum, it would look like:
    ```javascript
    axios.get(geocodeURL).then((response) => {
        //do stuff with response data
        axios.get(weatherURL).then((response) => {
            //do stuff with the weather data
        }
    }
    ```
    In contrast to the above, we can have our second *axios* request return a promise, which will then allow us to chain our second *then* statement to the first *then* statement, rather than burying it inside.  So, we would have something along the lines of:
    ```javascript
    axios.get(geocodeURL).then((response) => {
        //do stuff with response data
        return axios.get(weatherURL)
        }).then((response) => {
            //do stuff with the weather data
        })   
    ```


However, we can avoid this by 

#### One Last Issue - Promisifying an Asynchronous Method

As we have seen, many asynchronous methods do not employ the promise model, but use callbacks, very importantly the methods provided by Node.js.  We will be working below on a strategy for working simultaneously with generators and promises to allow one to write asynchronous code in a very synchronous manner. This would do us little good, however, if the methods we were running did not return promises, but used callbacks.

Fortunately, one can easily convert an asynchronous callback-style method into an asynchronous promise style method by a process referred to, logically enough, as **promisifying**.  In fact, some implementations of promises, such as *Bluebird*, comes with a ready-to-go promisfy method.  To understand it, however, let us look at a simple example, once again using Node.js's *fs.readFile()* method. As you probably recall, this asynchronous method employs callbacks, and the following is our method for converting it to a new method, which we will call *readFileP()*, which will use promises instead.
```javascript
readFileP (fileName, codeType) {
    return new Promise((resFunc, rejFunc) => {
        try {
            fs.readFile(fileName, { encoding: codeType }, (err, data) => {
                if (err) {
                    rejFunc(err);
                } else {
                    resFunc(data);
                }
            });
        } catch (err) {
            rejFunc(err);
        }
    });
}
```
The above code is quite straightforward, but notice that our new method, *readFileP*, actually returns something, a promise. It then converts the two situations, an error or success, addressed by the callback into the two parameters of the newly created Promise, which will be accessible to the *then()* or *catch()* methods.

#### Generators

**Generators** were introduced to Javascript in the ECMA-2015 standard, and offer a new way of dealing with asynchronous code in a very synchronous manner. Because the concept of a generator is rather new in Javascript, we will begin with small steps, before getting to our ultimate destination.

1.  To begin, lets examine the traditional syntax of a Javascript function declaration.

    ```javascript
    function createLogger() {
        console.log('Begin');
        console.log('End')
    }

    createLogger();
    ```
    Obviously, when called, it prints to the console the string 'Begin', followed on the line below by the string 'End'.
    
2.  The syntax of a **generator** looks very much like that of a function, even if it acts quite differently. To create a generator, add an \* to the *function* keyword. 
    ```javascript
    function* createLogger() {
        console.log('Begin');
        console.log('End');
    }
    ```
    Because of the asterisk, *createLogger* is now a generator, not a function. For those with a background in C, note that the asterisk has nothing to do with pointers, dereferencing, *etc*.

3.  When we call a generator, it returns an **iterator instance**, but there is no execution of the statements contained within the generator at that time.
    ```javascript
    function* createLogger(param1, param2) {
        console.log(param1);
        console.log(param2);
        return 'Bazoom!'
    }
    
    let logger = createLogger('Begin', 'End');
    ```
    As seen above, we call the generator in the same way we call a function, by the name followed by parenthesis, and we can pass in arguments into the generator. However, when called, the above generator does **not** return the return value "Bazoom!"; rather, it returns an **iterator**, assigned to logger.
    
4.  An **iterator** is an object with a very importan method, **next()**.  When called on the iterator instance, causes execution of the statements in the generator from the beginning, or where the iterator left off, if not the first next() call, to the next **yield** statment, and returns an object that contains two properties:

    a.  value: the value provided by the *yield* keyword in the generator,
    
    b.  done: a boolean, whether the end of the generator statements has been reached.
    
5.  As described in the previous paragraph, the **next()** method on the iterator causes the generator's statements to execute until the keyword **yield** is encountered.  The below would cause output of "Begin", but no "End". To start it up again from the yield statement to the end, we would need to call next() again.
    ```javascript
    function* createLogger() {
        console.log('Begin');
        yield;
        console.log('End');
    }

    let logger = createLogger();

    logger.next();
    ```
    In particular, note that a generator can be paused and resumed, so that it can run some of its statements, then take a break, then come back and run some more.  That, coupled with the ability to pass values into and out of the generator, make it a very useful object.

6.  The *value* property of the object returned by the *next()* method is set by the value contained after the **yield** keyword; thus, *yield* serves two purposes, to stop the execution of statement in the generator, and to pass values out of the generator.
    ```javascript
    function* createLogger() {
        console.log('Begin');
        yield {
            name: 'Jordan',
            age: 55
        }
        console.log('End');
    }

    let logger = createLogger();  //logger is our iterator

    let newObject = logger.next();  
  

    console.log(newObject);  //{value: {name: 'Jordan', age: 55}, done:false}
    ```

7.  In addition, we can send data back from the iterator to the generator, by including it as a parameter of the next() method.  This will be the return value of the yield statement.
    ```javascript
    function* createLogger() {
        console.log('Begin');
        const val = yield {
            name: 'Jordan',
            age: 55
        }
        console.log('End', val);
    }

    let logger = createLogger();
    
    //runs the generator up to the yield statement
    //This will result in the word "Begin" printing to the console.
    //Also, newObject will have the value property of the object after
    //the yield statement
    let newObject = logger.next(); 
    
    //this will set the return value of the first yield statement to
    //"Happy", which will be assigned to val in the generator.
    //then the generator is run to its end causing "Happy" to be printed
    //to the console
    logger.next('Happy!');

    //prints out the value object and done: false
    console.log(newObject);
    
    //print value:undefined, done: true
    console.log(logger.next());
    ```
    **NOTE**: Be careful as to where inputs are getting inserted. For example, if we have a single *yield* statement, the input into the generator will go where that section of the *next* statement begins. So, the **first** *next()* statment will not get its parameter assigned to anything. Also, the **last** *next()* statement can input a value into the generator, but its output will always be:
    ```javascript
    { value: undefined, done: true }
    ```
    
    Because we can pause and unpause the running of the generator using *yield* and *next*, we can have asynchronous events, with any amount of stuff happening between hitting a yield statement and stating up again.

6.  We can also use "throw", instead of 'next', to send an error into the generator.
    ```javascript
    function* createHello() {
        const word = yield 2;
        console.log(`Hello ${word}!`);
    }

    const hello = createHello()
    let test = hello.next();
    
    //This will stop everything, and show the yield getting the error,
    //as well as the input error message.
    hello.throw('user error'); 
    
    console.log(test.value);
    ```

7.  We can use a standard try/catch to handle the error:
    ```javascript
    function* createHello() {
        try {
            const word = yield 2;
            console.log(`Hello ${word}!`);
        } catch (err) {
            console.log('ERROR: ', err);
        }
    }

    const hello = createHello();

    let test = hello.next();
    
    //Now, the following will show the error in the output for the catch, 
    //but will go on to the subsequet line of code.
    hello.throw('user error'); 
    console.log(test.value);
    ```
9.  Along with generators, ECMA-6 included a new kind of for loop to iterate of generators by value.  The **for . . . of** statement works as follows:
    ```javascript
    function* createCounter() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
    
    const counter = createCounter();
    
    for (let val of counter) {
        console.log(val)
    }
    ```
    The above loop will put out a list of 1, 2, 3, 4 to the console. Note that it does not give a final value of undefined. Also note that it is going through the generator, not merely pulling out the yield values. So if there were executable statments between the *yield* statements, they would be run.

10. Note that a return statement in a generator, as opposed to a yield statment, will cause a return to the *next()* method of:
    ```javascript
    {value: [returned value], done: true};
    ```

#### Use of Generators With Promises

Having taken a broad overview of promises and a more detailed look into generators, we will now work on combining the two to facilitate a coding style that is more synchronous in style, and hopefully avoids any trips into callback hell.  We will do so while constructing a program that will perform the following steps:

a.  retrieves an array of strings from another file, in the form of a JSON string, and one element of such array being the URL of a weather website we want to access in order to get the weather for Richmond, Virginia,

b.  parse the array string to convert it into a JSON array object,

c.  grab the the URL from the array of strings,

d.  make a get request to the URL in order to get the desired information,

e.  extract the desired data from the response to our GET request, and

f.  print to the console a statement in the form: "The weather in Richmond today is [cloudy/sunny/windy, etc].  The current temperature is [temperature in F] degrees Fahrenheit."

##### **STEP ONE**

First, we will start by creating a setup in which to run our code.

1.  This example assumes you have Node.js and NPM installed and are familiar with their use. Create a directory (I will call mine "generators") and, from inside the directory, run *npm init* to create a *package.json* file.

2.  Install the following package with npm:

    a.  *node-fetch*, which will handle http get requests.

3.  Create a file to hold some text. I am naming mine "strings.txt". In this file, add the following text:

```javascript
[
    "Now is the winter of our discontent made glorious summer.",
    "How oft when thou, my music, music play\'st",
    "http://api.openweathermap.org/data/2.5/weather?q=Richmond&APPID="
    "Four score and seven years ago, our forefathers brought forth on this continent"
]
```
OpenWeatherMap.org is a weather api service with a free account offering that makes a convenient resource for testing out http requests. One must go to the site and sign up to obtain an API key, however. 

4.   Create a file in our folder called "globals.js"  In this file, insert the following code:
```javascript
module.exports = {
    weatherAPIKey: '[your API Key]'
}
```
5.  Create a new file called "helpers.js".  For now, this file will export an object with a single method, our "promisify" method.  The contents should look like:
```javascript
const fs = require('fs');

module.exports = {
    readFileP (fileName, codeType) {
        return new Promise((res, rej) => {
            fs.readFile(fileName, { encoding: codeType }, (err, data) => {
                if (err) {
                    rej(err);
                } else {
                    res(data);
                }
            });
        });
    }
}
```
6.  Finally, create our main file, which I will call app.com, with the following require statements at the top:
```javascript
const fetch = require('node-fetch');
const helpers = require('./helpers');
const source = './text.txt';
const globals = require('./globals')
```

#####   **STEP TWO**

In the *app.js* file, lets create a function called "getWeather".  To start, the code below reads as if everything acts synchronously; obviously it will not actually work!
```javascript
function* getWeather() {
    //read in the text from our text file
    const data = helpers.readFileP(source, 'utf-8');
    //convert the string into a JSON object
    const stringArray = JSON.parse(data);
    //select the string in our array that is a URL;
    const urlStem = stringArray.find(val => {
        return val.includes('http:')
    });
    //add the APIKey to our URL
    const url = urlStem.concat(globals.weatherAPIKey);
    //go fetch the data at our URL
    const response = yield fetch(url);
    //parse the response to get the json data
    const weather = yield response.json();
    //assuming there is data returned
    if(weather) {
        let temp = weather.main.temp;
        //convert Kelvin temps into Fahrenheit
        if (temp > 150) {
            temp = Math.round(temp * 9 / 5 - 459.67);
        }
        return `The weather in Richmond today is ${weather.weather[0].main.toLowerCase()}. The current temperature is ${temp} degrees Fahrenheit.`
    } else {
        return `The music of Wagner is much better than it sounds. - attr. Mark Twain`
    }
}
```
Obviously this code will not work, in three places it is using asynchronous functions: the *readFileP()*, *fetch()*, and *json()* methods.  What we will do, however, is take each of these three lines of code and tell our function to simply stop and wait, using the **yield** keyword.  The *yield* will come before the asynchronous function call, as follows:
```javascript
const data = yield helpers.readFileP(source, 'utf-8');
```
Because our readFileP method returns a promise, it will be that promise that is passed as a value into our iterator.  Then once that promise is resovled in a few milliseconds, a few seconds, or a few hours later, we will run the **next()** method on our iteratore, passing in our response, which will then be assigned to the variable.  Our total code would look as follows:
```javascript
const fetch = require('node-fetch');
const helpers = require('./helpers');
const source = './text.txt';
const globals = require('./globals')

function* getWeather() {
    const data = yield helpers.readFileP(source, 'utf-8');
    const stringArray = JSON.parse(data);
    const urlStem = stringArray.find(val => {
        return val.includes('http:')
    });
    const url = urlStem.concat(globals.weatherAPIKey);
    const response = yield fetch(url);
    const weather = yield response.json();
    if(weather) {
        let temp = weather.main.temp;
        if (temp > 150) {
            temp = Math.round(temp * 9 / 5 - 459.67);
        }
        return `The weather in Richmond today is ${weather.weather[0].main.toLowerCase()}. The current temperature is ${temp} degrees Fahrenheit.`
    } else {
        return `The music of Wagner is much better than it sounds. - attr. Mark Twain`
    }
}

//create our iterator
const weatherIterator = getWeather();

//run getWeather until the first yield
weatherIterator.next().value 
    //when the promise received resolves, send it into the const data
    .then(res => weatherIterator.next(res).value)
    //when the promise received resolves, send it into the const response
    .then(res => weatherIterator.next(res).value) 
    //when the promise received resolves, send it into the const weather
    .then(res => weatherIterator.next(res).value)
    //if successful, log out the returned string to the console
    .then(res => console.log(res))
    //if not, log out the error message
    .catch(err => console.log('ERROR: ', err));
```

#####   **STEP THREE**

The above code really does allow us to write code in a very synchronous style within the *getWeather()* generator, using the generator's abilities to pause and restart and to pass values in and out.  However, notice that to make it work, we have to count up the number of asynchronous calls we are making in our generator and make sure we have the proper number of *then* statments so that we get enough *next()* methods to fully traverse our iterator.  Also, we might notice that, until the end, our *then* statements are all exactly the same:
```javascript
.then(res => weatherIterator.next(res).value)
```
After working with a few of these, we can see pretty clearly a general rule of "until we have gotten to the end, just resolve the promise, send the resolution back to the generatore and get the next promise."  Fortunately, the *done* property of the iterator object allows us to know that we have reached the end of the line, and instead of sending our resolution back to the generator, we do whatever it is we are supposed to do - in this case, log the data string to the console.

The following is a clever implementation of the above general principle, for which I cannot claim credit. It operates in a recursive fashion, and the best way to understand will probably be to simply walk through it step-by-step a few times, until it becomes familiar.  The key, however, if it is difficult to follow at first review, may be to become familiar with the **Promise.resolve()** method and how it operates when the resolution of the returned Promise is itself a Promise.
```javascript
const fetch = require('node-fetch');
const helpers = require('./helpers');
const source = './text.txt';
const globals = require('./globals')

function* getWeather() {
    const data = yield helpers.readFileP(source, 'utf-8');
    const stringArray = JSON.parse(data);
    const urlStem = stringArray.find(val => {
        return val.includes('http:')
    });
    const url = urlStem.concat(globals.weatherAPIKey);
    const response = yield fetch(url);
    const weather = yield response.json();
    if(weather) {
        let temp = weather.main.temp;
        if (temp > 150) {
            temp = Math.round(temp * 9 / 5 - 459.67);
        }
        return `The weather in Richmond today is ${weather.weather[0].main.toLowerCase()}. The current temperature is ${temp} degrees Fahrenheit.`
    } else {
        return `The music of Wagner is much better than it sounds. - attr. Mark Twain`
    }
}

//The following implements a helper method
const weatherResult = coroutine(getWeather);
weatherResult.then(weather => {
    if (weather) {
        console.log('res', weather);
    }
})

//the following function may be kept in the helpers.js file
function coroutine (gen) {
    const iterator = gen();
    const handler = (iterObject) => {
        if (!iterObject.done){
            return Promise.resolve(iterObject.value)
                .then(resp => {
                    handler(iterator.next(resp))})
                .catch(err => console.log('ERROR: ', err ));
        }
        else {
            return iterObject.value;
        }
    }
    return handler(iterator.next());
}
```

## Node - Path Module
1. The **path** module contains a number of useful methods for working with paths in our applications. To use them, we must require in *path*:
    ```javascript
    const path = require('path');
    ```


## Socket.io
### Introduction
1. **Web Sockets** is a protocal for two-way, real-time communication between a server and client. The client could be a web-app, a phone app, *etc.*

2. Notice the change from the traditional relationship between a server and client, where a server only sends responses to a client's requests. So, for example, if the server got some information that a tornado was coming, it would not do anything to alert the client's, unless the client actually sent a request to the server asking for that information.

3. Historically, the following approaches were taken, leading up to websockets:

    a. **XHR Polling**: the client would make periodic requests to the server. As the time interval between the requests got smaller, it became more and more like real-time communication. However, the server mostly sent back null responses, since it didn't have any new data.
    
    b. **XHR Long Polling**: the client would make an XHR request to the server, but the server doesn't respons until it has some data to send. Upon receiving a response, the client immediately sends a new request.
    
    c. **Websockets**: This is the new protocol for real-time communication with HTML5.  A protocol "handshake" is made over HTTP and, once the connection is established, the client and server can have an ongoing communication channel in both directions over a TCP socket.
    
4. On both the client and server, we will have a connection, which will be creating and listening for *events* to and from the other end of the connection.


4. To set up websockets, we will use a library called **sockets.io**. This library has consists of both a *server* and *front-end* library.

5. After installing the **socket.io** library, we need to require it into our server.js page:
    ```javascript
    const socketIO = require('socket.io');
    ```
    
6. **Broadcast** is the method for emitting an event to everybody **except** the one who sent it.
    ```javascript
    io.on('connection', (socket) => {
        console.log('New user connected.');

        socket.on('createMessage', (newMessage) => {
            console.log('createEmail', newMessage);
                io.emit('newMessage', {
                    from: newMessage.from,
                    text: newMessage.text,
                    createdAt: new Date()
                })
            })
        
        socket.broadcast.emit('eventName', () => {});

        socket.on('disconnect', () => {
            console.log('User disconnected.');
        });
    });
    ```
    In contrast, **socket.emit()** will send it back to the same socket, and **io.emit()** will send it to all sockets, including the emitting socket.