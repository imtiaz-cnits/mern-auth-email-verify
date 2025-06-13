import jwt from "jsonwebtoken";

// Middleware to authenticate users using JWT
const authMiddleware = async (req, res, next) => {
    // Log all incoming request details
    console.log('=== Request Debug Start ===');
    console.log('All headers:', JSON.stringify(req.headers, null, 2));
    console.log('Host:', req.hostname);
    console.log('Path:', req.path);
    console.log('Method:', req.method);

    // Check Authorization header
    const authHeader = req.headers['authorization'];
    console.log('Authorization header:', authHeader);

    if (!authHeader) {
        console.log('No Authorization header found.');
        return res.status(401).json({ success: false, message: 'No authorization header. Please log in again.' });
    }

    // Extract and validate token
    const tokenParts = authHeader.split(' ');
    const token = tokenParts.length === 2 && tokenParts[0].toLowerCase() === 'bearer' ? tokenParts[1] : null;
    console.log('Extracted token:', token);

    if (!token) {
        console.log('No valid token extracted from Authorization header.');
        return res.status(401).json({ success: false, message: 'No token provided. Please log in again.' });
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', tokenDecoded);

        if (tokenDecoded.id) {
            req.userId = tokenDecoded.id;
            console.log('User ID attached:', req.userId);
        } else {
            console.log('No ID in decoded token.');
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }

    console.log('=== Request Debug End ===');
};

export default authMiddleware;