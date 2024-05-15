const baseUrl = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

  export async function fetchAllbooks(){
    return fetch(`${baseUrl}/books`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
        .catch(console.error);
  }

  export async function fetchSingleBook(id){
    return fetch(`${baseUrl}/books/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
        
        .catch(console.error);     
  }

  export async function createAccount(firstName, lastName, email, password){
    return fetch(`${baseUrl}/users/register`, {   
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: password
        })
      }).then(response => response.json())
        .catch(console.error);  
  }

  export async function loginRequest(email, password){
    return fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }).then(response => response.json())
        .catch(console.error);
  }