const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
let isbn_users = require('node-isbn');





// Get the book list available in the shop
public_users.get('/',function (req, res) {
var getAllBooks = new Promise(function(resolve, reject) {
    resolve(res.send(JSON.stringify({books},null,3)));
    });
    axios.getAllBooks.
        then(function () {
            console.log('All book list in the shop retrieved');
        }).
        catch(function () {
            console.log('Some error has occurred');
        });

    });
          
   





// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    var getBooksOnISBN = new Promise(function(resolve, reject) {
        const isbn = req.params.isbn;
    let filtered_books = Object.values(books).filter(book => book.isbn === isbn);
    resolve(res.send(filtered_books));
        });
        axios.getBooksOnISBN.
            then(function () {
                console.log('All book list retrieved based on isbn');
            }).
            catch(function () {
                console.log('Some error has occurred');
            });
 });

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    var getBooksOnAuthor = new Promise(function(resolve, reject) {
        const author = req.params.author;
    let filtered_books = Object.values(books).filter(book => book.author === author);
    resolve(res.send(filtered_books));
        });
        axios.getBooksOnAuthor.
            then(function () {
                console.log('All book list retrieved based on author');
            }).
            catch(function () {
                console.log('Some error has occurred');
            });
    
});



// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    var getBooksOnTitle = new Promise(function(resolve, reject) {
        const title = req.params.title;
    let filtered_books = Object.values(books).filter(book => book.title === title);  
    resolve(res.send(filtered_books));
        });
        axios.getBooksOnTitle.
            then(function () {
                console.log('All book list retrieved based on title');
            }).
            catch(function () {
                console.log('Some error has occurred');
            });
    
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    var getBooksOnISBN = new Promise(function(resolve, reject) {
        const isbn = req.params.isbn;
    let filtered_books = Object.values(books).filter(book => book.review === isbn);
    resolve(res.send(filtered_books));
        });
        axios.getBooksOnISBN.
            then(function () {
                console.log('All book reviews retrieved based on isbn');
            }).
            catch(function () {
                console.log('Some error has occurred');
            });
});


// PUT request: Add review of a book by ISBN
public_users.put("/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let filtered_books = Object.values(books).filter(book => book.review === isbn);
    if (filtered_books.length > 0) {
        let filtered_books = filtered_books[0];
        let review = req.query.review;
        //if the review has been inputed 
        if(review) {
            filtered_books.review = review
        }
       
        books_list = books.filter((book) => books.isbn != isbn);
        books.push(filtered_books);
        res.send("Book with the isbn " + isbn + " updated successfully!");
    }
    else{
        res.send("Unable to find book!");
    }
  });


  // DELETE book review by ISBN 
public_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    users = Object.values(books).filter(book => book.isbn === isbn);
    res.send("Review for user with the isbn " +  isbn + " deleted.");
  });

module.exports.general = public_users;
