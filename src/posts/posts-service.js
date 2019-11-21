const PostsService = {
  getAllPosts(knex) {
    return knex
      .from('posts')
      .innerJoin('users', 'posts.owner', '=', 'users.id')
      .select('posts.id', 'posts.post_title', 'posts.post_content', 'posts.date_created', 'users.first_name', 'users.last_name') 
  },
  insertPost(knex, newPost) {
    return knex
      .insert(newPost)
      .into('posts')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('posts').select('*').where('id', id).first()
  },
  getByOwnerId(knex, owner_id) {
    return knex.from('posts').select('*').where('owner', owner_id)
  },
  deletePost(knex, id) {
    return knex('posts')
      .where({ id })
      .delete()
  },
  updatePost(knex, id, newPostFields) {
    return knex('posts')
      .where({ id })
      .update(newPostFields)
  }
}


module.exports = PostsService