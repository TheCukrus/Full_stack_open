
const dummy = (blogs) =>
{
    return 1;
}

const totalLikes = (blogs) =>
{
    const likeCounter = blogs.reduce((total, currentValue) => total + currentValue.likes, 0)
    return likeCounter;
}

const favoriteBlog = (blogs) =>
{
    if (blogs.length === 0)
    {
        return null
    }

    let highest = 0;
    let blog = {}
    blogs.map((ele) =>
    {
        if (ele.likes > highest)
        {
            highest = ele.likes
            blog = {
                "title": ele.title,
                "author": ele.author,
                "likes": ele.likes
            }
        }
    })
    return blog
}

const mostBlogs = (blogs) =>
{
    //Arr where we send all blogs
    const blogsArr = [];
    //Filter blogs so if blog exists in "blogsArr" then it add +1 to blogs
    blogs.map((ele) => 
    {
        let checkForExistance = blogsArr.find(blog => blog.author === ele.author)
        let checkIndex = blogsArr.indexOf(checkForExistance)

        if (!checkForExistance)
        {
            blogsArr.push({ "author": ele.author, "blogs": 1 })
        }
        else
        {
            const newValue = { "author": checkForExistance.author, "blogs": checkForExistance.blogs + 1 }
            blogsArr.splice(checkIndex, 1, newValue)
        }

    })

    let authorWithMostBlogs = null;
    //Find author with the most posted blogs
    blogsArr.map((ele) =>
    {
        if (!authorWithMostBlogs)
        {
            authorWithMostBlogs = ele
        }

        if (authorWithMostBlogs.blogs < ele.blogs)
        {
            authorWithMostBlogs = ele
        }
    })

    return authorWithMostBlogs
}

const mostLikes = (blogs) =>
{
    //Arr where we send all blogs
    const blogsArr = [];
    //Filter blogs so if blog exists in "blogsArr" then sum likes from post
    blogs.map((ele) => 
    {
        let checkForExistance = blogsArr.find(blog => blog.author === ele.author)
        let checkIndex = blogsArr.indexOf(checkForExistance)

        if (!checkForExistance)
        {
            blogsArr.push({ "author": ele.author, "likes": ele.likes })
        }
        else
        {
            const newValue = { "author": checkForExistance.author, "likes": blogsArr[checkIndex].likes + ele.likes }
            blogsArr.splice(checkIndex, 1, newValue)
        }
    })

    let authorWithMostLikes = null;
    //Find author with the most likes throw all posts
    blogsArr.map((ele) =>
    {
        if (!authorWithMostLikes)
        {
            authorWithMostLikes = ele
        }

        if (authorWithMostLikes.likes < ele.likes)
        {
            authorWithMostLikes = ele
        }
    })

    return authorWithMostLikes
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }