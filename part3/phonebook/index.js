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

const errorHandling = (err, request, response, next) =>
{
    console.log(err.message)

    if (err.message === "CastError")
    {
        return response.status(400).send({ error: "malformated id" })
    }
    else if (err.name === 'ValidationError')
    {
        return response.status(400).json({ error: err.message })
    }
    next(err)
}

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
index.get(`/api/persons`, async (request, response, next) =>
{
    try
    {
        const persons = await modelPerson.find();
        response.json(persons)
    }
    catch (err)
    {
        next(err)
    }
})

//GET all persons contacts
index.get(`/api/info`, async (request, response, next) =>
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
        next(err)
    }
});

//GET person data by it ID
index.get(`/api/persons/:id`, async (request, response, next) =>
{
    try
    {
        const person = await modelPerson.findById(request.params.id);

        if (!person)
        {
            response.status(400).end();
        }

        if (person)
        {
            response.send(person)
        }
    }
    catch (err)
    {
        next(err);
    }
})

//PUT the update person
index.put(`/api/persons/:id`, async (request, response, next) =>
{
    try
    {
        const body =
        {
            "name": request.body.name,
            "number": request.body.number
        }

        await modelPerson.findByIdAndUpdate(request.params.id, body, { new: true });

        response.status(200).json({ message: "successfull update" })
    }
    catch (err)
    {
        next(err)
    }
})

//REMOVE the person from phonebook
index.delete(`/api/persons/:id`, async (request, response, next) =>
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
        next(err)
    }
})

//POST create a new person contact
index.post(`/api/persons`, async (request, response, next) =>
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

        const newEntrie = {
            "name": request.body.name,
            "number": request.body.number
        }

        await modelPerson.create(newEntrie);

        response.status(201)
        response.json(newEntrie)
    }
    catch (err)
    {
        next(err)
    }
})


index.use(errorHandling);

const PORT = 3001;

index.listen(process.env.PORT || PORT, () => console.log(`Server running on port ${PORT}`))