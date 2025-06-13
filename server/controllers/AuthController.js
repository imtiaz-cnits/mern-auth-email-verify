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
        const user = await UserModel.create({ name, email, password: hashedPassword });

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
            text: `Hello ${name},\n\nThank you for registering with us! We're excited to have you on board.\n\nBest regards,\nCodeNext IT Team`
        };
        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, message: 'User registered successfully', userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

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
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Password is incorrect' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({ success: true, message: 'Login successful', token }); // Return token in response
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Logout function to clear user session
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict'
        });
        res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Function to send verification OTP to the user
export const sendVerificationOTP = async (req, res) => {
    try {
        const userId = req.userId; // Assumes auth middleware sets this
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Set OTP and expiration time
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        // Send OTP via email
        const mailOptions = {
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: 'Your OTP Code',
            text: `Hello ${user.name},\n\nYour OTP code is ${otp}. It will expire in 10 minutes.\n\nBest regards,\nCodeNext IT Team`
        };
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Function to verify the OTP sent to the user
export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const userId = req.userId; // Assumes auth middleware sets this

    if (!otp) {
        return res.status(400).json({ success: false, message: 'OTP is required' });
    }

    try {
        const user = await UserModel.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if OTP is correct
        if (!user.verifyOtp || user.verifyOtp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        // Check if OTP has expired
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP expired' });
        }

        user.isAccountVerified = true; // Mark the account as verified
        user.verifyOtp = ''; // Clear the OTP
        user.verifyOtpExpireAt = null; // Clear the OTP expiration time

        await user.save();

        res.status(200).json({ success: true, message: 'Account verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Change isAuthenticated to a controller function
export const isAuthenticated = (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ success: true, userId: decoded.id });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// Send reset password OTP to the user
export const sendResetPasswordOTP = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Set OTP and expiration time
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save();

        // Send OTP via email
        const mailOptions = {
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Hello ${user.name},\n\nYour password reset OTP is ${otp}. It will expire in 15 minutes.\n\nBest regards,\nCodeNext IT Team`
        };
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Password Reset OTP sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Reset password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if OTP is correct
        if (!user.resetOtp || user.resetOtp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        // Check if OTP has expired
        if (user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP expired' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword; // Update the password
        user.resetOtp = ''; // Clear the OTP
        user.resetOtpExpireAt = null; // Clear the OTP expiration time

        await user.save();

        res.status(200).json({ success: true, message: 'Password has been reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import UserModel from "../models/UserModel.js";
// import transporter from "../config/EmailHelper.js";
//
// // YT Video Last Watched - 01:55:04
//
// // Register function to create new users
// export const register = async (req, res) => {
//     const { name, email, password } = req.body;
//
//     if (!name || !email || !password) {
//         return res.status(400).json({ success: false, message: 'All fields are required' });
//     }
//
//     try {
//         // Check if user already exists
//         const existingUser = await UserModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: 'User already exists' });
//         }
//
//         const hashedPassword = await bcrypt.hash(password, 10);
//
//         // Create new user
//         const user = await UserModel.create({name, email, password: hashedPassword});
//
//         // Generate JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
//             maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
//         });
//
//         // Welcome email sending
//         const mailOptions = {
//             from: process.env.SENDER_MAIL,
//             to: email,
//             subject: 'Welcome to CodeNext IT',
//             text: `Hello ${name},\n\nThank you for registering with us! We're excited to have you on board.
//             \n\nBest regards,\nCodeNext IT Team`
//         }
//         await transporter.sendMail(mailOptions);
//
//         res.status(201).json({ success: true, message: 'User registered successfully', userId: user._id });
//     }
//
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// }
//
//
//
// // Login function to authenticate users
// export const login = async (req, res) => {
//     const { email, password } = req.body;
//
//     if (!email || !password) {
//         return res.status(400).json({ success: false, message: 'All fields are required' });
//     }
//
//     try {
//         // Check if user exists
//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ success: false, message: 'Invalid credentials' });
//         }
//
//         // Verify password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ success: false, message: 'Password is Wrong!' });
//         }
//
//         // Generate JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
//             maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
//         });
//
//         res.status(200).json({ success: true, message: 'Login successful' });
//     }
//
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// }
//
//
//
// // Logout function to clear user session
// export const logout = async (req, res) => {
//     try {
//         res.clearCookie('token', {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict'
//         });
//         res.status(200).json({ success: true, message: 'Logout successful' });
//     }
//
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// }
//
//
//
// // Function to send verification OTP to the user
// export const sendVerificationOTP = async (req, res) => {
//     try {
//         const userId = req.userId; // Changed from req.body.userId to req.userId
//         const user = await UserModel.findById(userId);
//
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }
//
//         // Generate OTP
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//
//         // Set OTP and expiration time
//         user.verifyOtp = otp;
//         user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes
//
//         await user.save();
//
//         // Send OTP via email
//         const mailOptions = {
//             from: process.env.SENDER_MAIL,
//             to: user.email,
//             subject: 'Your OTP Code',
//             text: `Hello ${user.name},\n\nYour OTP code is ${otp}. It will expire in 10 minutes.\n\nBest regards,\nCodeNext IT Team`
//         }
//         await transporter.sendMail(mailOptions);
//
//         res.status(200).json({ success: true, message: 'OTP sent successfully' });
//     }
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// }
//
//
//
// // Function to verify the OTP sent to the user
// export const verifyEmail = async (req, res) => {
//     const {otp} = req.body;
//     const userId = req.userId;
//
//     if(!otp){
//         return res.status(400).json({ success: false, message: 'OTP is required!' });
//     }
//
//     try {
//         const user = await UserModel.findById(userId);
//
//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }
//
//         // Check if OTP is correct
//         if (user.verifyOtp === '' || user.verifyOtp !== otp) {
//             return res.status(400).json({ success: false, message: 'Invalid OTP' });
//         }
//
//         // Check if OTP has expired
//         if (user.verifyOtpExpireAt < Date.now()) {
//             return res.status(400).json({ success: false, message: 'OTP expired' });
//         }
//
//         user.isAccountVerified = true; // Mark the account as verified
//         user.verifyOtp = ''; // Clear the OTP
//         user.verifyOtpExpireAt = 0; // Clear the OTP expiration time
//
//         await user.save();
//
//         return res.status(200).json({ success: true, message: 'Account verified successfully' });
//     }
//     catch (error) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// }
//
//
//
// // Change isAuthenticated to a controller function
// export const isAuthenticated = (req, res) => {
//     const { token } = req.cookies;
//
//     if (!token) {
//         return res.status(200).json({ success: false, message: 'Not authenticated' });
//     }
//
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         return res.status(200).json({ success: true, userId: decoded.id });
//     } catch (error) {
//         return res.status(200).json({ success: false, message: 'Invalid token' });
//     }
// };
//
//
//
// // Send reset password OTP to the user
// export const sendResetPasswordOTP = async (req, res) => {
//     const { email } = req.body;
//
//     // Validate email input
//     if (!email) {
//         return res.status(400).json({ success: false, message: 'Email is required' });
//     }
//
//     try {
//         const user = await UserModel.findOne({ email });
//
//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }
//
//         // Generate OTP
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//
//         // Set OTP and expiration time
//         user.resetOtp = otp;
//         user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes
//
//         await user.save();
//
//         // Send OTP via email
//         const mailOptions = {
//             from: process.env.SENDER_MAIL,
//             to: user.email,
//             subject: 'Password Reset OTP',
//             text: `Hello ${user.name},\n\nYour password reset OTP is ${otp}. It will expire in 15 minutes.\n\nBest regards,\nCodeNext IT Team`
//         }
//         await transporter.sendMail(mailOptions);
//
//         res.status(200).json({ success: true, message: 'Password Reset OTP sent successfully' });
//     }
//     catch (error) {
//         return res.status(200).json({ success: false, message: 'Invalid token' });
//     }
// }
//
//
//
// // Reset password
// export const resetPassword = async (req, res) => {
//     const { email, otp, newPassword } = req.body;
//
//     // Validate input
//     if (!email || !otp || !newPassword) {
//         return res.status(400).json({ success: false, message: 'All fields are required' });
//     }
//
//     try {
//         const user = await UserModel.findOne( { email });
//
//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }
//
//         // Check if OTP is correct
//         if( user.resetOtp === '' || user.resetOtp !== otp) {
//             return res.status(400).json({ success: false, message: 'Invalid OTP' });
//         }
//
//         // Check if OTP has expired
//         if (user.resetOtpExpireAt < Date.now()) {
//             return res.status(400).json({ success: false, message: 'OTP expired' });
//         }
//
//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword; // Update the password
//         user.resetOtp = otp; // Clear the OTP
//         user.resetOtpExpireAt = 0; // Clear the OTP expiration time
//
//         await user.save(); // Save the updated user
//
//         return res.status(200).json({success: true, message: 'Password has been reset successfully' });
//
//     }
//     catch (error) {
//         return res.status(401).json({ success: false, message: 'Invalid password reset token' });
//     }
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
