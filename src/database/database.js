const mongoose = require('mongoose');

const connectDatabase = () => {
    console.log('Connecting to database...');

    mongoose
        .connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB Connected!"))
        .catch((err) => console.log(`Error trying to connect with database: ${err}`));
};

module.exports = connectDatabase;