import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from "../models/UserModel.js";
import transporter from "../config/EmailHelper.js";

// Register function to create new users
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await UserModel.create({name, email, password: hashedPassword});

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        });

        // Welcome email sending
        const mailOptions = {
            from: process.env.SENDER_MAIL,
            to: email,
            subject: 'Welcome to CodeNext IT',
            text: `Hello ${name},\n\nThank you for registering with us! We're excited to have you on board.
            \n\nBest regards,\nCodeNext IT Team`
        }
        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: 'User registered successfully' });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Login function to authenticate users
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Password is Wrong!' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({ success: true, message: 'Login successful' });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Logout function to clear user session
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict'
        });
        res.status(200).json({ success: true, message: 'Logout successful' });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}