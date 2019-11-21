const knex = require('knex');
const app = require('../src/app');
const {
    makeCommentsArray,
    makeMaliciousComment
} = require('./comments.fixtures');
const { makeUserArray } = require('./users.fixtures');

describe('Comments Endpoints', () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        });
        app.set('db', db)
    });

    after('disconnect from db', () => db.destroy());

    before(() => db('comments').truncate());

    afterEach(() => db('comments').truncate());

    describe('GET /api/comments', () => {
        context('given no comments', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/comments')
                    .expect(200, []);
            });
        });

        context('given there are comments in the database', () => {
            const testUsers = makeUserArray();
            const testComments = makeCommentsArray();

            beforeEach('insert comments', () => {
                return db.into('comments').insert(testUsers).then(() => {
                    return db
                        .into('comments')
                        .insert(testComments)
                });
            });

            it('responds with 200 and all of the comments', () => {
                return supertest(app)
                    .get('/api/comments')
                    .expect(200, testComments)
            });
        });

        context('Given an XSS attack comment', () => {
            const testUsers = makeUsersArray();
            const { maliciousComment, expectedComment } = makeMaliciousComment();

            beforeEach('insert malicious comment', () => {
                return db.into('comments').insert(testUsers).then(() => {
                    return db
                        .into('comments')
                        .insert([ maliciousComment ])
                });
            });

            it('removes XSS attack content', () => {
                return supertest(app)
                    .get('/api/comments')
                    .expect(200)
                    .expect(res => {
                        expect(res.body[0].comment).to.eql(expectedComment.comment);
                    });
            });
        });
    });
});