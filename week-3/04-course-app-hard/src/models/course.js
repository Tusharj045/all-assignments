const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    published: {
        type: String,
        required: true,
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;