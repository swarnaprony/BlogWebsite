
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const req = require('express/lib/request');
const ejs = require("ejs");
// Load the full build.
var _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-swarna:eENsnPzypRAZ0OlT@cluster0.alvs2jv.mongodb.net/postsDB");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);



app.get("/", function (req, res) {
  Post.find({}, function (err, postItem) {
    res.render("home", { homeStarting: homeStartingContent, posts: postItem });
  })

});

app.get("/about", function (req, res) {
  res.render("about", { aboutContentPara: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContentPara: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});


app.get("/posts/:title", (req, res) => {
  const requstedTitle = req.params.title;

  Post.find({ title: requstedTitle }, function (err, postItem) {
    console.log(postItem);
    res.render("post", {
      title: postItem[0].title,
      content: postItem[0].content
    });
    
  });
  

});


app.post('/compose', function (req, res) {
  const postTitle = req.body.postTitle;
  const postContent = req.body.postBody;
  const post = new Post({
    title: postTitle,
    content: postContent
  });

  post.save();
  res.redirect("/");
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
    console.log("Server Started successfully.");
});