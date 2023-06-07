const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

// test('create a blog', async () =>
// {
//     const newBlog = {
//         "title": "test",
//         "author": "creator",
//         "url": "http://127.0.0.1:4000/api/blogs",
//         "likes": 20
//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(201)
//         .expect('Content-Type', /application\/json/)

// })

test('Find one blog', async () =>
{
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const temp = response.body;

    expect(temp.length).toBe(1);

})

afterAll(async () =>
{
    await mongoose.connection.close()
})