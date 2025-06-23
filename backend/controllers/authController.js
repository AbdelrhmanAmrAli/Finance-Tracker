const User = require('../models/User');

const jwt = require('jsonwebtoken');

//generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}



//register user
exports.registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    //check if all fields are provided
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }
    //check if user already exists
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }

    //create the user
    try {
        const user = await User.create({ fullName, email, password });
        // const token = generateToken(user._id);
        res.status(201).json({
            id: user.id,
            user,
            token: generateToken(user._id)
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}



//login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    //check if all fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            id: user.id,
            user,
            token: generateToken(user._id)
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}




//get user
exports.getUserInfo = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}
