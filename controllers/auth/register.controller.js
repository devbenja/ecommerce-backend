import { User } from '../../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccesToken } from '../../utils/jwt.js';

export const register = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        
        const userExists = await User.findOne({ where: { email: email} });

        if (userExists) return res.status(400).json({ message: 'User Already Exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword, role: 'customer' });
        await user.save();

        // Token JWT
        const token = await createAccesToken({ 
            id: user._id, 
            role: user.role, 
            username: user.username 
        });

        res.cookie('jwt_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({ message: 'Register Successful' });

    } catch (error) {

        res.status(500).json({ error: 'Server Error' });

    }

};
