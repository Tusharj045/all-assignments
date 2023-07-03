const mongoose = require('mongoose');
//save these values in env Variables
const username = 'username';
const password = 'password';
const cluster = 'cluster';
const dbname = "OnlineCourse";

const MONGO_URL = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
