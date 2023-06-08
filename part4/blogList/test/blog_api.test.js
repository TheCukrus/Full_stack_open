const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/modelBlogList")

const api = supertest(app)

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

beforeAll(async () =>
{
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe("Testing HTTP GET api", () =>
{
    test('Find blogs', async () =>
    {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const temp = response.body;
        expect(temp.length).toBe(6);
    })

    test("Blog post have 'id' as the unique identifier", async () =>
    {
        const response = await api.get("/api/blogs")
        const blogPost = response.body;

        blogPost.forEach(ele =>
        {
            expect(ele.id).toBeDefined();
            expect(ele._id).toBeUndefined();
        });
    })

    test("find blog by ID", async () =>
    {
        const blogWeLookingFor = initialBlogs[3]
        const response = await api.get(`/api/blogs/${blogWeLookingFor._id}`)

        expect(response.status).toBe(200);
        expect(response.body === blogWeLookingFor)
    })
})

describe("Testing HTTP POST api", () =>
{
    test('create a new blog', async () =>
    {
        const blogsData = await api.get("/api/blogs")
        const newBlog = {
            "title": "test",
            "author": "creator",
            "url": "http://127.0.0.1:4000/api/blogs",
            "likes": 20
        }

        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        // Get the updated number of blogs 
        const response = await api.get("/api/blogs")
        expect(response.body.length).toBe(blogsData.body.length + 1);

        const createBlog = response.body.find(blog => blog.title === newBlog.title);
        expect(createBlog).toBeDefined()
    })

    test("create a new blog wihout likes value", async () =>
    {
        newBlog = {
            "title": "blogWithoutAuthor",
            "author": "creator",
            "url": "http://127.0.0.1:4000/api/blogs",
        }

        await api.post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const result = await api.get("/api/blogs")
        expect(result).toBeDefined()

        const findBlog = result.body.find(ele => ele.title === newBlog.title)
        expect(findBlog).toBeDefined()
        expect(findBlog.likes).toBe(0)
    })

    test("Check if title exists", async () =>
    {
        const newBlog = {
            "author": "creator",
            "url": "http://127.0.0.1:4000/api/blogs",
            "likes": 20
        }

        api.post("/api/blogs").send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test("Check if url exists", async () =>
    {
        const newBlog = {
            "title": "temptemp",
            "author": "creator",
            "likes": 20
        }

        api.post("/api/blogs").send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe("Testing HTTP DELETE api", () =>
{
    test("successfull delete blog", async () =>
    {
        const deleteBlog = initialBlogs[2]

        const result = await api.delete(`/api/blogs/${deleteBlog._id}`)

        expect(result.status).toBe(204)

    })
})

describe("Testing HTTP PUT api", () =>
{
    test("successfull update blog", async () =>
    {
        const updateBlog = initialBlogs[0]

        const result = await api.put(`/api/blogs/${updateBlog._id}`)
            .send({ "likes": 10 })

        expect(result.status).toBe(200)
    })
})

afterAll(async () =>
{
    await mongoose.connection.close()
})