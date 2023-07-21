//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


var posts = []

let postLength = posts.length


app.get('/home', function (req, res) {
  res.render('home.ejs', { homeStartingContent: homeStartingContent, posts: posts })

})


app.get('/about', function (req, res) {
  res.render('about.ejs')
})


app.get("/contact", function (req, res) {
  res.render('contact.ejs', { contactString: contactContent })
})


app.get("/compose", function (req, res) {
  res.render("compose.ejs")
})


app.post("/home", function (req, res) {

  var content = {
    post_title: req.body.post_title,
    post_body: req.body.post_body
  }
  posts.push(content)
  res.redirect("/home")

})

app.get("/home/:title", function (req, res) {
  var _ = require("lodash")

  var rTitle = _.lowerCase(req.params.title);


  for (var i = 0; i < posts.length; i++) {
    var post_title = _.lowerCase(posts[i].post_title);
    if (rTitle === post_title) {
      res.render("post.ejs" , {title: posts[i].post_title , content : posts[i].post_body } )
    }
    else {
      console.log("match not found")
    }

  }

  res.render("post.ejs")
})

app.get("/",(req,res)=>{
  res.redirect("/home")
})


let port = 3000

if (process.env.PORT) {
  port = process.env.PORT
}

app.listen(port, function () {
  console.log("Server started on port 3000");
});
