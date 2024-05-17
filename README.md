# Book Buddy
🔗 [GitHub Repository](https://github.com/hamentag/book-buddy)  
🔗 [Puppy Bowl API Documentation](https://fsa-book-buddy-b6e748d1380d.herokuapp.com/docs/)  
🔗 [Deployed site](https://hamentag-book-buddy.netlify.app/)
**********************

#### Demo account
Use `demo@example.com` as the email and `book_buddy` as the password to log in
**********************

### Summary
Book Buddy is a library management system that aims to create a user-friendly platform for managing library resources and interactions. The application streamlines tasks such as browsing books, registering accounts, logging in, and managing checkouts  with a focus on enhancing the overall library user experience.
### Functionality Features
#### Routes via React Router
* /books - Home page displaying all books in the library's catalog.
* /books/:id - Display details of an individual book.
* /login and /register - Authentication routes.
* /account - User account page displaying:
    - Username or email of logged-in user.
    - List of all books a user has checked out, or a message indicating they have 0 books checked out if applicable.
* /bookCard - Displays an abstract of each book in the Home page ( nested within /books route)
* /dialogBox - Appears to communicate with the user
* /navigations - Contains links to the principle pages
* /reservations - Displays the logged-in user's current reservations
* /singleBook - Displays detailed information about a single book
#### Unauthenticated Users
* Can observe a list of all the books in the library.
* Can sign up for an account with a username and password.
* Can sign in with the correct username/password combination.
* Cannot check out or return any book.
* Cannot see the account page of any user.
#### Authenticated Users
* Can check out an available book.
* Can return books they have currently checked out.
* Can view their own account page and currently checked out books.
* Cannot view the accounts of users other than themselves.
* Cannot checkout/return books for other users.
#### All Users
* Can view a list of all the library's books.
* Can filter books with a simple text matcher.
* Can view details of an individual book.
