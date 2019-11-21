function makeUsersArray() {
    return [
        {
            id: 1,
            first_name: 'Arman',
            last_name: 'Bhimani',
            email: 'armanbhimani98@gmail.com',
            password: 'somethingsecret123!',
            impact: 'Something something something',
            money_spent: 9
        },
        {
            id: 2,
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@gmail.com',
            password: 'somethingsecret123!',
            impact: 'Something something something',
            money_spent: 20
        }
    ]
}


module.exports = {
    makeUsersArray
}