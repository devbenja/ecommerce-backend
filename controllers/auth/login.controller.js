import { User } from "../../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccesToken } from "../../utils/jwt.js";

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ where: { email: email } });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const token = await createAccesToken({ 
            id: user._id, 
            role: user.role, 
            username: user.username 
        });

        res.status(200).json({ token });

    } catch (error) {

        res.status(500).json({ error: 'Server Error' });

    }

};
