import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import modelPerson from "./models/persons.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: `${__dirname}/.env` });


const index = express();

const persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

morgan.token("body", function getBody(req)
{
    return JSON.stringify(req.body);
})

//middlewares
index.use(express.json());
index.use(cors())
index.use(express.static('build'))

index.use(morgan(":method :url :status :total-time :req[header] :response-time :body "))

//GET all persons contacts
index.get(`/api/persons`, async (request, response) =>
{
    try
    {
        const persons = await modelPerson.find();
        response.json(persons)
    }
    catch (err)
    {
        console.log(err)
    }
})

//GET all persons contacts
index.get(`/api/info`, async (request, response) =>
{
    try
    {
        const persons = await modelPerson.find();

        response.send(
            `<p>Phonebook has info for ${persons.length}</p>
            <p>${new Date}</p>`
        )

    }
    catch (err)
    {
        console.log(err);
    }
});

index.get(`/api/persons/:id`, (request, response) =>
{
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person)
    {
        response.send(person);
    }
    else
    {
        response.status(404).end();
    }
})

//REMOVE the person from phonebook
index.delete(`/api/persons/:id`, async (request, response) =>
{
    try
    {
        const person = await modelPerson.findByIdAndRemove(request.params.id)

        if (!person)
        {
            return response.status(400).end();
        }
        response.status(204).end();
    }
    catch (err)
    {
        console.log(err)
    }
})

//POST create a new person contact
index.post(`/api/persons`, async (request, response) =>
{
    const { name, number } = request.body;
    //checks
    try
    {
        if (!name)
        {
            response.status(400).json({ error: "Name must not be empty" })
            return;
        }

        if (!number)
        {
            response.status(400).json({ error: "Number must not be empty" })
            return;
        }

        // if (persons.find(ele => ele.name === name))
        // {
        //     response.status(400).json({ error: "Name must be unique" })
        //     return;
        // }

        const newEntrie = {
            "id": Math.floor(Math.random() * 10000),
            "name": request.body.name,
            "number": request.body.number
        }

        await modelPerson.create(newEntrie);

        response.status(201)
        response.json(newEntrie)
    }
    catch (err)
    {
        console.log(err);
    }
})

const PORT = 3001;

index.listen(process.env.PORT || PORT, () => console.log(`Server running on port ${PORT}`))