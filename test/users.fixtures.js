function makeUsersArray() {
  return [
    {
      id: 1,
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'janedoe@gmail.com',
      password: 'somethingsecret123!'
    },
    {
      id: 2,
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'somethingsecret123!'
    }
  ]
}


module.exports = {
  makeUsersArray
}