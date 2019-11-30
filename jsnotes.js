////////////////////////////////////////////////////////////////////////
//////////////////////////25Nov2019/////////////////////////////////////
////////////////////////////////////////////////////////////////////////


const express = require(express)
const request = require(request)
const bodyParser = require(body-parser)
const app = express()
app.use(bodyParser.urlencoded ({extended:true}))


// How to incorporate static files(such as css and images) into the server
app.use(express.static("public"))
    //Make sure you put your css file in a new folder called "public" as well as your images folder in there
      //Make sure to change your css directory on your HTML page to 'css/styles.css'

// Setting up get route
app.get("/",function(req,res) {
  res.sendFile(__dirname+"/signup.html")
})


//Setting up post route
app.post("/", function(req,res) {
  var firstName = req.body.fName
  var lastName = req.body.lName
  var email = req.body.userEmail

  // Setting up data to avoid error 400. The parameters such as "data", "members", and the array/object has been specified by mailchimp. This will differ according to the API source.
  var data = {
    members: [
      {email_address: email,
      status: "subscribed",
      // merge_fields commonly used to customize data you want to receive or post. In this case, mailchimp has specified the object parameters to "FNAME" and "LNAME" to post the first and last names we received from our website.
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }}
    ]
  }

  // Converting our data object into JSON format
  var jsonData = JSON.stringify(data);

  // Creating an object to specify where to send our data to (in this case mailchimp)
  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/662a240645",
      // The last parameter after "lists" is the specific lists id for our list
    method: "POST",
      // This is default to get. but we are posting our collected data to mailchimp
    headers: {
      "Authorization": "jwpnim 777937e485dd591ba428c0c8b5d1033f-us4"
    },
      // Authorization in order for us to avoid statusCode 401. First string is any string, and second part is the API key. This method of authorization can be used to authorize any API, not just mailchimp

      // Added to avoid error 400. 
      body: jsonData
  }
  // request option to post our data received from our homepage to mailchimp. Also directs the user to other html pages from our directory depending on the result of the signup.
  request(options, function (error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html")
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
      } else {
        res.sendFile(__dirname + "/failure.html")
      }
    }
  })
})

    // Remember to set your form action="/" and method="POST"


// post request to redirect our users back to the homepage. Note that the form in the failure.html should have action="/failure"
app.post("/failure", function(req,res) {
   res.redirect("/")
 })


// Allows you to process the port by heroku as they want. || 3000 allows you to run it locally as well
app.listen(process.env.PORT || 3000, function () {
  console.log("Your server is currently running on port 3000.")
})




// USING HEROKU
//1. Install heroku by the website.
//2. Login to heroku by 'heroku login' on bash
//3. Ensure that npm, git, and heroku are installed by checking the versions '____ --version'
//4. Ensure that node is listening to process.env.PORT instead of local. 
//5. Create a file called "Procfile" on the directory with all your files
//6.Open the Procfile file and input 'web: node ___.js'
//7. Ensure that you are in the directory containing all the files and initialize git: 'git init'
//8. 'git add .' --> 'git commit -m ""'
//9. Deploy the files by inputting 'heroku create'
//10. Push your files to heroku 'git push heroku master
//11. The link will be the first link after 'heroku create'





// Creating EJS Templates
  //We're making a template so taht we don't have to create a new HTML page every time we want to direct our pages that are similar to each other


  // 1. npm install ejs
  // 2. Input 
          app.set('view engine', 'ejs')
            //This tells our app to use ejs as its view engine. Make sure to include it below the 
            const app=express()
  // 3. Create a folder called 'views' on the directory with your code. This is the location where ejs will look for by default to render your files.
  // 4. Input
          app.get('/', (req, res) => {
            res.render('index', {kindOfDay: 'day'})
              //'kindOfDay' is the ejs parameter name written in the ejs file (The value you want to be shown.) 'day' is the variable written in javascript that will change based on JS code. so it will go day --> render --> kindOfDay
          });
            //This tells the app to render the index file while using the ejs engine. 


            res.render('index', {kindOfDay: day}) //Can be put at the end of all the if and else statements and it will render after going through the if and else statement. 
            // NOTE!!! You cannot have more than one res.render elements in your node.js. In order to use more than one inputs and variables, you can put them together and then redirect the code to beginning of the webpage to render it back with the appropriate variables set. Ex:
              res.render('index', {kindOfDay: day, brandNewTask: newTask})

              res.redirect("/")

  // 5. In the EJS folder, input <=% kindOfDay => for the node to render into the EJS file and input the type of day


// res.render ISSUE
//When you are using res.render and you get an error saying that "in that line, we cannot identify a variable," there is a scope issue. Meaning that for example:
             app.get("/", function(req,res) {

              var today = new Date();
                
                var options = {
                 weekday: "long",
                 day: "numeric",
                 month: "long"
               }

               var day = today.toLocaleDateString("en-US", options)

              res.render("lists", {kindOfDay: day, brandNewTask: newTask})
                
            })



            app.post("/", function(req, res) {
              var newTask = req.body.newToDo

              res.redirect("/")
            })

                  // In this case, we will get an error saying "newTask is unidentified" because the app.post will only set a variable value only when the user requests a post. Therefore, we can create an empty variable also called newTask at the top of the code, so that when the app.post redirects the machine to top of the list, the variable newTask is set with the requested value the user as inputted


// Running code inside the EJS Template
// 1. Lets consider you're using a control flow javascript on EJS file
          <% if (kindOfDay === "Sunday" || kindOfDay === "Saturday") { %>
            <h1 style="color: pink"><%=kindOfDay%> ToDo List</h1>
              <% } else { %>
            <h1 style="color: burlywood"><%=kindOfDay%> ToDo List</h1>
           <% } %>

          //  Notice it's a if and else statement. but we are using something called 'scriplet tags.' <% %>. These are used to wrap around control flow statements in the EJS file that is not an HTML tag. Scriplet only allows you to change control flow. This is because you want all your logic code to be in your node server file.
  
// 



////////////////////////////////////////////////////////////////////////
//////////////////////////26Nov2019/////////////////////////////////////
////////////////////////////////////////////////////////////////////////


//SCOPE
//Imagine a variable within a function:
    function a {
      var x = 2
      console.log(x)
    }
    //Here, you would have no problem printing out 'x' as it is within the function. However...

    function a {
      var x = 2;
      console.log(x)
    }
    console.log(x)
    //Here, you will not be able to console.log(x), as THE SCOPE of variable 'x' is local to function 'a'. So the SCOPE of the variable 'x' is limited to the local function of 'a'. These type of variables are called LOCAL VARIABLES

    //GLOBAL VARIABLES are variables that are not restricted within any local functions. Example:

    var x = 2

    function a {
      console.log(x)
    }

    console.log(x)


    HOWEVER!!!!

    //Something specific to JavaScript, if a variable is within a for loop, while loop, if/else (so any type of function that is not straight funnction) they are considered SOFT VARIABLES.

    if (true) {
      var x = 2
      console.log(x)
    }

    console.log(x)

    //This is viable and it will work, as if/else statements are 'soft functions'

    //Now, for the different type of variables"

    var x = 2   //Value of 'x' can be changed

    let y = 3   //Value of 'y' can be changed

    const z= 4  //This value of 'z' cannot be changed whatsoever by any following code 

      //All of these types of variables will be 'local' variables when inside a function. They will all also be 'global' variables when they are outside of functions

      //HOWEVER, rules are different when you are using other types of functions as mentioned above (for, while, if/else)

      if (true) {
        var x = 2   //Global
        let y= 3    //Local
        const z= 4  //Local
      }



////////////////////////////////////////////////////////////////////////
//////////////////////////27Nov2019/////////////////////////////////////
////////////////////////////////////////////////////////////////////////
// CSS in Express:
      // You need to tell express to explicitly run the styles.css file.
      // 1. Create a new folder called 'public' in the directory with all your files
      // 2. Put JavaScript, styles.css, and images folder in there.
      // 3. Tell express to run the folder 'public' as a static folder.
            // Input this in your app.js file
              app.use(express.static('public'))
      // 4. <link rel="stylesheet" href="css/styles.css"
            // Assuming your styles.css file is in a folder called 'css' that is within the 'public' folder



// Using layouts
// 1. Create two files called header.ejs and footer.ejs in the folder 'views' (same folder that contains your other ejs)
// 2. Include all your header code inside header.ejs (including the first openning <body> tag) and your footer code in your footer.ejs (including the closing </body> tag)
// 3. Include the tags 
      <%- include('header') -%> OR <%- include('footer') -%>
      // at the beginning and end of your ejs code



// Basic to linking your ejs file to your app.js file
// 1. Create the ejs folder (ex: index.ejs)
// 2. Create a get request in your javascript file
        app.get('/directory' , function(req, res) {
          res.render('index')
        })




///////////////////////EXPORTING MODULES///////////////////////////
// Good practice to coding in javascript and ejs is that you should package logic heavy code and put it in another javascript file to let the main javascript code to handle the rendering and redirecting and post/get requests. But how do we get the data back into the main javascript file?

  // In this example, app.js will be the main js file, and the date.js will be the heavy logic file
  
  // We can export the values from other javascript files by using module
      // 1. Require the javascript file to your main javascript file
              const date = require(__dirname + "/date.js")
                // '__dirname' is required because we did not npm initiatize the 'date.js' file, rather it's local.
                // ensure that the 'date.js' file is in the same directory as the main javascript file.
      // 2. You can input the following into the date.js to log everything that is running in your date.js folder:
              console.log(module);
      // 3. To export, delete the console.log and input:
             module.exports = functionName
      // 4. Now the functionName will be run and the values from that function will be BOUND to the variable 'date' in the app.js folder. 

      // 5. Keep in mind that you'd need to set the 'date' variable as a function when you call it. So you might want to do this:
            var day = date()

      // 6. What if you have more than one function in the date.js folder? Remember that module is an object, therefore, you can set each module to a different variable. For example:

          module.exports.getDate = getDate

          function getDate () {
            ..
          }

          module.exports.getDay = getDay

          function getDay () {
            ..
          }

        // Now, in order for you to call it in the app.js file, you'd need to specify the moledule you are calling by using the dot notation

        let day = date.getDate()  //Remember that 'date' is a path to our date.js file




//////////////////Shortening functions/////////////

//Consider the following js code:
module.exports = getDate

function getDate () {
let today = new Date();
  
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  return today.toLocaleDateString("en-US", options)
}

  // Notice that getDate is repeated way too many times. You can set the function to equal to a variable value

module.exports = getDate

var getDate = function() {
let today = new Date();
  
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  return today.toLocaleDateString("en-US", options)
}

  // Or you can even make it shorter by getting rid of the varaible and making the module.export equal to the entire function

  module.exports = function() {
  let today = new Date();
    
    let options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    }
  
    return today.toLocaleDateString("en-US", options)
  }

  // You can even make it shorter by excluding the 'module.', as module.exports is used so frequently that they shortened it by just 'exports'
    exports = function () {
    let today = new Date();
      
      let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
      }
    
      return today.toLocaleDateString("en-US", options)
    }




////////////////////////////////////////////////////////////////////////
//////////////////////////28Nov2019/////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// To make your nav bar go to the respective pages when clicked on, all you have to do is set the <a href=""> to that link you've set up on your app.js file. For Example:
app.get('/', function(req,res) {
  res.render('home', {homeStartingContent: homeStartingContent})
})

app.get('/about', function(req,res) {
  res.render('about', {aboutContent: aboutContent} )
})

app.get('/contact', function(req,res) {
  res.render('contact', {contactContent: contactContent} )
})

  // Here, you just need to set your <a href="/"> <a href="/about"> <a href="/contact"> on your nav bar buttons, as you are directing them to those links you've made.





// forEach()    -   Allows you to print all of the items in an array without using for loop

var fruits = ['apple', 'peach', 'banana']

fruits.forEach(function(fruit) {
  console.log(fruit)
})

  // If you are using ejs and using variables from the other app.js file, you do not need to put scripplets around the variable. For example:

  <% fruits.forEach(function(fruit) { %>
    <h3><%= fruit.title %></h3>
    <p><%= fruit.content %></p>
  <% }) %>

  // It is important that parameter in the annoynmous function is parallel to the code inside the forEach function. (In this case 'fruit')


// EXPRESS ROUTING PROPERTY
// You do not have to set a app.get for every route you have. In fact, it would be exhaustive to do so. We can use the express. For Example:
app.get('/', function(req,res) {
  res.render('home', {homeStartingContent: homeStartingContent, posts: posts})
})

app.get('/about', function(req,res) {
  res.render('about', {aboutContent: aboutContent} )
})

app.get('/contact', function(req,res) {
  res.render('contact', {contactContent: contactContent} )
})

app.get('/compose', function(req,res) {
  res.render('compose')
})

  // This can be reduced by using express routing property:

  app.get('/home/:topic', function(req,res) {
    res.render(req.params.topic)
  })

    // Has to be :topic and req.params.topic





////////////////////////////////////////////////////////////////////////
//////////////////////////29Nov2019/////////////////////////////////////
////////////////////////////////////////////////////////////////////////


// LODASH - allows us to use tools on javascript for a lot of help
  // Installation
    // 1. Terminal:
          npm i -g npm
          npm i --save lodash
    
    // 2. In Node.js:
          var _ = require('lodash')

    // 3. Look at documentation at lodash to find what you can use.

    // 4. Example: 
          const requestedTitle = _.lowerCase(req.params.topic)
          // The lodash function _.lowerCase, removes all uppercase as well as dashes





////////////DATABASES//////////////

// There are many kinds of databases, but they all separate into two groups: SQL or NoSQL
    // SQL (Structured Query Language) (AKA Relational)
      // Examples: MySQL & PostgreSQL
      // Advantages: Good for structure. For ppl who are good with excel. Very good at relationships. What it means by that is you can form relationships or link with other data bases so it stays synced. This good relationship quality allows SQL databases to join the tables together if needed be. It forms the databases into tables. Able to add new categories if needed. BUT...
      // Disadvantges: Inserts 'null' for places where there is no information by default


      // CRUD - Create, Read, Update, Destroy     What we'll be doing the most in any database

      // How to CREATE a new table in SQLite
        CREATE TABLE products (   // Will create new colums for the new fields
          id INT NOT NULL,        //INT = integer.   NOT NULL = cannopt be null or empty
          name STRING,            // STRING = string
          price MONEY,            // MONEY = CURRENCY IN DOLLARS
          PRIMARY KEY (id)        // PRIMARY KEY = makes the parameter the identifier. Unique.
        )

      // How to INSERT values to the columns in SQLite
        INSERT INTO products      // 
        VALUES (1, "Pen", 1.20)   // Entering the values in order of the row
          
          // If you want to skip some values, you have to specify what values you do have in the parameters
            INSERT INTO products (id, name)     //Shows that you dont have 'price' value
            VALUES (2, "Pencil")
      
      // How to READ your table
        SELECT * FROM 'products';           //The * indicates you want to see the entire table

        SELECT name, price FROM 'products'; //Only wanna see name and price COLUMNS

        SELECT * FROM products WHERE id=1   //Specifies what row you wanna see with WHERE

      // How to UPDATE your table
        // Updating values
          UPDATE products
          SET price = 0.80
          WHERE id=2

        // Add, Delete, Update Columns
          ALTER TABLE products
          ADD stock INT           // Adds column called "stock" with values being integer

      
      // How to DELETE
          DELETE FROM products
          WHERE id = 2            // Deletes entire row with id = 2

    
    // How to link tables together with FOREIGN KEYS
    CREATE TABLE orders (
      id INT NOT NULL,
      order_number INT,
      customer_id INT,
      product_id INT,
      primary KEY (id),
      FOREIGN KEY (customer_id) REFERENCES customers(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
      )
        // Here, the FOREIGN KEY is identified from this very table. The REFERENCES will link to a differentTableName(what parameter). So the first instance will link customer_id value from the orders table to the id value in the customers table.

        // HOW TO JOIN TABLES USING FOREIGN KEYS
          SELECT orders.order_number, customers.first_name, customers.last_name, customers.address
          FROM orders
          INNER JOIN customers ON orders.customer_id = customers.id



    // NoSQL (Not Only Structured Query Language) (AKA Non-Relational)
      // Examples: MongoDB & Redis
      // Advantages: Able to add new categories without having 'null' come out as default for empty. A lot more flexible than SQL. Very good for start ups. It has great scalability. This is because you are able to take chunks of data and spread it. More like spreading your data horizontally and not vertically when building a building.
      // Disadvantages: Known as "non-relational" database because it's not as efficent as SQL when it comes to syncing datas together. You can have different objects containing different information about one customer, but it will be less convinent to join the data together if needed be than SQL.

      //MONGODB
        // 1. Make sure to make shortcuts to mongod and mongo once you've installed it.
        // 2. input 'mongod' on your bash
        // 3. open new bash and input 'mongo' to run mongo.

        // CRUD FOR MONGODB:
        https://docs.mongodb.com/manual/crud/

        // RELATIONSHIPS FOR MONGODB:
            db.products.insert(
              {
                _id: 2,
                name: "Pencil",
                price: 0.80,
                stock: 12,
                reviews: [
                  {
                    authorName: "Jae",
                    rating: 5,
                    review: "Best pencil ever!"
                  },
                  {
                    authorName: "Jason",
                    rating: 5,
                    review: "Awesome pencil!"
                  }
                ]
              }
            )
                //Here, we are able to draw relationships between one table to another by including them inside a table

      // How to connect mongoDB to node.js
        // There are two ways to do this. You can use the mongoDB native driver or use Mongoose. Mongoose is a lot easier to use, therefore more preferred.

        // MongoDB Native Driver:
              // How to get started: https://mongodb.github.io/node-mongodb-native/3.1/quick-start/quick-start/

              
