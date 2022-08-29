const tweetService = require("../service/tweets.service");

const createTweetController = async (req, res) => {
    try {
        const {message} = req.body;

        if(!message){
            res.status(400).send({
                message: "Try to send all data to your tweet.",
            });
        }

        const { id } = await tweetService.createTweetService(message, req.userId);

        return res.status(201).send({
            message: "Tweet has been created successfully.",
            tweet: {id, message},
        });
    } catch(err) {
        res.status(500).send({ message: "Unexpected error, try again later!" });
        console.log(err.message);
    }
};

const findAllTweetsController = async (req, res) => {
    try{
        const tweets = await tweetService.findAllTweetsService();

        if(tweets.length ===0) {
            return res.status(400).send({ message: "There is no data exist!" });
        }

        return res.send({
            results: tweets.map((tweet) => ({
                id: tweet._id,
                message: tweet.message,
                likes: tweet.likes.length,
                comments: tweet.comments.length,
                retweets: tweet.retweets.length,
                name: tweet.user.name,
                username: tweet.user.username,
                avatar: tweet.avatar,
            })),
        })
    }catch(err){
        res.status(500).send({ message: "Unexpected error, try again later"});
        console.log(err.message);
    }
};

const searchTweetController = async (req, res) => {
    try{
        const { message } = req.query;

        const tweets = await tweetService.searchTweetService(message);

        if(tweets.length ===0){
            return res
            .status(400)
            .send({ message: "There are no tweets with that message!"});
        }

        return res.send({
            tweets: tweets.map((tweet) => ({
                id: tweet._id,
                message: tweet.message,
                likes: tweet.likes.length,
                comments: tweet.comments.length,
                retweets: tweet.retweets.length,
                name: tweet.user.name,
                username: tweet.user.username,
                avatar: tweet.user.avatar,
                })),
            });
    }catch(err) {
        res.status(500).send({ message: "Unexpected error, try again later!"});
    }
};

module.exports = {createTweetController, findAllTweetsController, searchTweetController}