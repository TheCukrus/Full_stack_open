
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

module.exports = { dummy, totalLikes, favoriteBlog }