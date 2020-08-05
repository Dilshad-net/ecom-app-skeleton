const form = document.querySelector('#login')
// const API_URL = 'http://localhost:5000/some'; //route to (action='/account/login')
const API_URL = 'http://localhost:3000/account/login/me'

form.addEventListener('submit', (event) => {
  event.preventDefault(); // IDEA: prevent from data being send, while submitted
  const formData = new FormData(form);
  const email = formData.get('email'); // IDEA: (form.name.value);
  const password = formData.get('password');

  const object = {
    email,
    password
  }

  fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(object), // IDEA: convert js array, object into JSON in order to read in ....
    headers: {
      'content-type': 'application/json' // IDEA: Here the content type is application/json as the object/content send here is JSON ;)
    }
  }).then(response => response.json())
  .then((createdData) => {
        $window.sessionStorage.accessToken = response.body.Authorization
        window.localStorage.setItem('Authorization', createdData.token)
    }).catch((error) => {
        console.log({error: 'Error' })
    })
});
