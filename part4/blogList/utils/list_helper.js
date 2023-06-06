
const dummy = (blogs) =>
{
    return 1;
}

const totalLikes = (blogs) =>
{
    const likeCounter = blogs.reduce((total, currentValue) => total + currentValue.likes, 0)
    return likeCounter;
}

module.exports = { dummy, totalLikes }