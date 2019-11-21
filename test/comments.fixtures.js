function makeCommentsArray() {
    return [
        {
            id: 1,
            comment: 'Something something something'
        },
        {
            id: 2,
            comment: 'Something something something'
        }
    ]
}

function makeMaliciousComment() {
    const maliciousComment = {
        id: 911,
        comment: "Something <script>alert('xss');</script>",
    };

    const expectedComment = {
      ...maliciousComment,
        comment: "Something",
    };
    return {
        maliciousComment,
        expectedComment
    };
}


module.exports = {
    makeCommentsArray,
    makeMaliciousComment
}