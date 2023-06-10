const mongoose = require("mongoose")
const modelUser = require("../models/modelUser")
const app = require("../app")
const supertest = require("supertest")

const api = supertest(app)

beforeAll(async () =>
{
    await modelUser.deleteMany({})
})

describe("Testing POST method api", () =>
{
    test("Create a new user", async () =>
    {
        const user = await api.post("/api/users")
            .send({
                "username": "testing users api",
                "name": "tester",
                "password": "secret"
            })
            .expect(201)
        expect(user).toBeDefined()
    })

    test("Fail to create because of unique username", async () =>
    {
        const user = await api.post("/api/users")
            .send({
                "username": "testing users api",
                "name": "tester",
                "password": "secret"
            })
            .expect(400)
        expect(user.body).toEqual({ message: 'Username is taken' })
    })

    test("Fail to create because of length of username is less than 3", async () =>
    {
        const user = await api.post("/api/users")
            .send({
                "username": "te",
                "name": "tester",
                "password": "secret"
            })
            .expect(400)
        expect(user.body).toEqual({ message: "input must contain minimum 3 characters" })

    })

    test("Fail to create because of length of password is less than 3", async () =>
    {
        const user = await api.post("/api/users")
            .send({
                "username": "testnumberfour",
                "name": "tester",
                "password": "st"
            })
            .expect(400)
        expect(user.body).toEqual({ message: "input must contain minimum 3 characters" })

    })

    test("Fail to create because missing username", async () =>
    {
        const user = await api.post("/api/users")
            .send({
                "name": "tester",
                "password": "secret"
            })
            .expect(400)
        expect(user.body).toEqual({ message: "Username field is empty" })

    })

    test("Fail to create because missing password", async () =>
    {
        const user = await api.post("/api/users")
            .send({
                "username": "newUser",
                "name": "tester",
            })
            .expect(400)
        expect(user.body).toEqual({ message: "Password field is empty" })

    })

})

afterAll(async () =>
{
    await mongoose.connection.close()
})