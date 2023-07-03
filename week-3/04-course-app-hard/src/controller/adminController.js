const Utils = require('../utils/utils');

const Admin = require('../models/admin');
const Course = require('../models/course');

const adminController = {
    signup: async (req, res) => {
        const { username, password } = req.body;
        try {
            const adminExists = await Admin.findOne({ username, password });
            if (adminExists) {
                return res.status(400).json({ message: 'Admin already exists' });
            }
            const newAdmin = new Admin({ username, password });
            await newAdmin.save({ username, password });
            const token = Utils.getLoginToken(username);
            res.status(201).json({ message: 'Admin created successfully', token })
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },

    login: async (req, res) => {
        const { username, password } = req.headers;
        try {
            const adminExists = await Admin.findOne({ username, password });
            if (adminExists) {
                const token = Utils.getLoginToken(username);
                return res.status(200).json({ message: 'Logged in successfully', token });
            } else {
                res.status(400).json({ message: 'Admin doesn\'t exist' });
            }
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },

    addCourse: async (req, res) => {
        const { title, description, price, imageLink, published } = req.body;
        try {
            const newCourse = new Course({ title, description, price, imageLink, published });
            const course = await newCourse.save();
            return res.status(201).json({ message: 'Course created successfully', _id: course._id });
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },

    updateCourse: async (req, res) => {
        // logic to edit a course
        const courseId = req.params.courseId;
        const { title, description, price, imageLink, published } = req.body;
        try {
            const courseExists = await Course.findById(courseId);
            if (!courseExists) {
                return res.status(400).json({message: "Course doesn\'t exist"});
            }
            await Course.updateOne({ _id: courseId }, { title, description, price, imageLink, published });
            return res.status(201).json({ message: 'Course updated successfully' });
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },

    getAllCourses: async (req, res) => {
        try {
            const Courses = await Course.find();
            return res.status(201).json(Courses);
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    }
};

module.exports = adminController;