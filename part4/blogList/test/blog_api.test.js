const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

test('create a blog', async () =>
{
    const newBlog = {
        "title": "pa",
        "author": "ha",
        "url": "sfl",
        "likes": 3
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

})

test('blogs are returned as json', async () =>
{
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

})

afterAll(async () =>
{
    await mongoose.connection.close()
})