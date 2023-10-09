const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  } else {
    return res.status(404).json({ message: "Unable to register user." });
  }
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  res.send(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  let book = books[req.params.isbn];
  res.send(book);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  let authors = Object.values(books).filter(
    (item) => item.author === req.params.author
  );
  res.send(authors);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  let titles = Object.values(books).filter(
    (item) => item.title === req.params.title
  );
  res.send(titles);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  let reviews = books[req.params.isbn]["reviews"];
  res.send(reviews);
});

module.exports.general = public_users;
