import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: `${__dirname}/../.env` });

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URL


mongoose.connect(url)
    .then(result =>
    {
        console.log( result, 'connected to MongoDB')
    })
    .catch((error) =>
    {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    "name": { type: String, minLength: 3 },
    "number": {
        type: String,
        validate: {
            validator: function (v)
            {
                return /^\d{2,3}-\d+$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        require: [true, `User phone number required`]
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) =>
    {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const modelPerson = mongoose.model("Person", personSchema)

export default modelPerson;