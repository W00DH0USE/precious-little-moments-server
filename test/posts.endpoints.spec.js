const knex = require('knex');
const app = require('../src/app');
const {
    makePostArray,
    makeMaliciousPost
} = require('./posts.fixtures');
const { makeUserArray } = require('./users.fixtures');

describe('Posts Endpoints', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        });
        app.set('db', db)
    });

    after('disconnect from db', () => db.destroy());

    before(() => db('posts').truncate());

    afterEach(() => db('posts').truncate());

    describe('GET /api/posts', () => {
        context('given no posts', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/posts')
                    .expect(200, []);
            });
        });

        context('given there are posts in the database', () => {
            const testUsers = makeUserArray();
            const testPosts = makePostArray();

            beforeEach('insert posts', () => {
                return db.into('posts').insert(testUsers).then(() => {
                    return db
                        .into('posts')
                        .insert(testPosts)
                });
            });

            it('responds with 200 and all of the posts', () => {
                return supertest(app)
                    .get('/api/posts')
                    .expect(200, testPosts)
            });
        });

        context('Given an XSS attack post', () => {
            const testUsers = makeUsersArray();
            const { maliciousPost, expectedPost } = makeMaliciousPost();

            beforeEach('insert malicious post', () => {
                return db.into('posts').insert(testUsers).then(() => {
                    return db
                        .into('posts')
                        .insert([ maliciousPost ])
                });
            });

            it('removes XSS attack content', () => {
                return supertest(app)
                    .get('/api/posts')
                    .expect(200)
                    .expect(res => {
                        expect(res.body[0].post_title).to.eql(expectedPost.post_title);
                        expect(res.body[0].post_content).to.eql(expectedPost.post_content);
                    });
            });
        });
    });
});