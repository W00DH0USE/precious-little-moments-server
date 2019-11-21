function makePostArray() {
    return [
        {
            id: 1,
            post_title: 'Feeling Amazing',
            post_content: 'This has been an amazing week for me!'
        },
        {
            id: 2,
            post_title: 'Might relapse',
            post_content: 'Everything has been going wrong today and I might relapse. I dont feel too good.'
        },
        {
            id: 3,
            post_title: 'Doing good on week 3',
            post_content: 'Stay commited and push past week 1 it gets easier!'
        }
    ]
}

function makeMaliciousPost() {
    const maliciousPost = {
        id: 911,
        post_title: "Something <script>alert('xss');</script>",
        post_content: "someting bad that will cause issues <script>alert('xss')</script>",
    };

    const expectedPost = {
      ...maliciousPost,
        post_title: "this is another random title",
        post_content: "someting something something",
    };
    return {
        maliciousPost,
        expectedPost
    };
}

module.exports = {
    makePostArray,
    makeMaliciousPost
}