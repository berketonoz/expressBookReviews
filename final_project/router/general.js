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
public_users.get("/", async (req, res) => {
  //Write your code here
  let foo = async () => {
    return books;
  };
  return res.status(200).json(await foo());
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
  //Write your code here
  let foo = async () => {
    let book = await books[req.params.isbn];
    return book;
  };
  return res.status(200).json(await foo());
});

// Get book details based on author
public_users.get("/author/:author", async (req, res) => {
  //Write your code here
  let foo = async () => {
    let author = Object.values(books).filter(
      (item) => item.author === req.params.author
    );
    return author;
  };
  return res.status(200).json(await foo());
});

// Get all books based on title
public_users.get("/title/:title", async (req, res) => {
  //Write your code here
  let foo = async () => {
    let titles = Object.values(books).filter(
      (item) => item.title === req.params.title
    );
    return titles;
  };
  return res.status(200).json(await foo());
});

//  Get book review
public_users.get("/review/:isbn", (req, res) => {
  //Write your code here
  let reviews = books[req.params.isbn]["reviews"];
  return res.status(200).json(reviews);
});

module.exports.general = public_users;
