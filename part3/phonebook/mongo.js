import mongoose from "mongoose";


if (process.argv.length < 3)
{
    console.log("Give password as argument")
    process.exit(1);
}

const password = process.argv[2]

const url = `mongodb+srv://Zenia:${password}@cluster0.f2drs.mongodb.net/FullStackOpen?authSource=admin&replicaSet=atlas-dddhj1-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
mongoose.set("strictQuery", false)

mongoose.connect(url);


const personSchema = new mongoose.Schema(
    {
        "name": String,
        "number": String
    }
);

const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 3)
{
    const person = new Person({
        "name": process.argv[3],
        "number": process.argv[4]
    })

    person.save().then(result =>
    {
        console.log(result)
        mongoose.connection.close()
    })
}

if (process.argv.length === 3)
{
    Person.find({})
        .then(persons =>
        {
            persons.forEach(pers =>
            {
                console.log(pers.name, pers.number)

            })
            mongoose.connection.close()
        })
}