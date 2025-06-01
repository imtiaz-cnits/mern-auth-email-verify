import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from "../models/UserModel.js";
import transporter from "../config/EmailHelper.js";

// YT Video Last Watched - 01:55:04

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

        res.status(201).json({ success: true, message: 'User registered successfully', userId: user._id });
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

// Function to send verification OTP to the user
export const sendVerificationOTP = async (req, res) => {
    try {
        const {userId} = req.body; // Assuming userId is passed in the request body
        const user = await UserModel.findById(userId); // Find user by ID

        if(user.isAccountVerified){
            return res.status(400).json({ success: false, message: 'Account already verified' });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000)); // Generate a 6-digit OTP

        user.verifyOtp = otp; // Generate a 6-digit OTP
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // OTP valid for 24 hours

        await user.save(); // Save OTP and expiration time to the user document

        // Send OTP via email
        const mailOptions = {
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP for account verification is ${otp}. It is valid for 24 hours.`
        };
        await transporter.sendMail(mailOptions); // Send the email

        return res.status(200).json({ success: true, message: 'Verification OTP sent successfully' });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Function to verify the OTP sent to the user
export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body; // Assuming userId and otp are passed in the request body

    if(!userId || !otp){
        return res.status(400).json({ success: false, message: 'Missing Details!' });
    }

    try {
        const user = await UserModel.findById(userId); // Find user by ID

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if OTP is correct
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        // Check if OTP has expired
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP expired' });
        }

        user.isAccountVerified = true; // Mark the account as verified
        user.verifyOtp = ''; // Clear the OTP
        user.verifyOtpExpireAt = 0; // Clear the OTP expiration time

        await user.save(); // Save the updated user document

        return res.status(200).json({ success: true, message: 'Account verified successfully' });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}