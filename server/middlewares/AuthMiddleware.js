import jwt from "jsonwebtoken";

// Middleware to authenticate users using JWT
const authMiddleware = async (req, res, next) => {
    const { token } = req.cookies;

    // Check if token is present
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Unauthorized! Try to Login Again.' });
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID to request object
        if(tokenDecoded.id){
            req.userId = tokenDecoded.id;  // Changed from req.body.userId to req.userId
        }
        else{
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export default authMiddleware;

