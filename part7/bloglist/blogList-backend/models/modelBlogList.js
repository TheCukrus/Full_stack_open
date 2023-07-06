const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    url: String,
    likes: { type: Number, default: 0 },
    comments: [{ type: String }]

})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) =>
    {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Blog = mongoose.model("Blog", blogSchema, "blogs")

module.exports = Blog