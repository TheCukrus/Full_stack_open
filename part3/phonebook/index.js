import express from "express";


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


index.get(`/api/persons`, (request, response) => response.json(persons))

index.get(`/api/info`, (request, response) =>
{
    response.send(
        `<p>Phonebook has info for ${persons.length}</p>
        <p>${new Date}</p>`
    )
})

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

const PORT = 3001;
index.listen(PORT, () => console.log(`Server running on port ${PORT}`))