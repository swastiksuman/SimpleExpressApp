require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../index.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', ()=>{
    it('should allow a book to be posted and return read', (done) => {
        const bookPost = {title: 'My Book', author: 'Jon Doe', genre: 'Fiction'};
        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end((err, results) => {
                console.log(results);
                //results.body.read.should.not.equal('false');
                results.body.should.have.property('_id');
                done();
            });
    });

    afterEach((done) => {
        Book.deleteMany({}).exec();
        done();
    })
});