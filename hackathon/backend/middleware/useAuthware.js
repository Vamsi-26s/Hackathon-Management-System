const jwt = require("jsonwebtoken");
require("dotenv").config();

const useAuthware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message); 
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = useAuthware;
