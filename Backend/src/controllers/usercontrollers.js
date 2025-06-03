import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { hashPassword, comparePasswords } from "../utils/bcrypt.js";

//JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

//POST api/v1/signup
export const signup = async (req, res) => {
    console.log("POST /api/v1/signup");
    const { username, email, password, isAdmin } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser)
            return res.status(400).json({ error: "Username already taken" });

        const existingUser1 = await User.findOne({ email });
        if (existingUser1)
            return res.status(400).json({ error: "Email already taken" });

        const hashed = await hashPassword(password);
        const user = new User({ username, email, password: hashed, isAdmin });

        await user.save();

        const token = generateToken(user);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: "Server error during signup" });
    }
};

//POST api/v1/login
export const login = async (req, res) => {
    console.log("POST /api/v1/login");
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid username or password" });

        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error during login" });
    }
};
