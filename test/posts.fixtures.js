function makePostArray() {
  return [
    {
      id: 1,
      post_title: 'Post Title 1',
      post_content: 'Something something something'
    },
    {
      id: 2,
      post_title: 'Post Title 2',
      post_content: 'Something something something'
    },
    {
      id: 3,
      post_title: 'Post Title 3',
      post_content: 'Something something something'
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