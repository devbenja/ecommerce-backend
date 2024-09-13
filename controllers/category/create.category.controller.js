import { Category } from "../../models/category.model.js";

export const createCategory = async (req, res) => {

    const { name, description } = req.body;

    try {
 
        const categoryExists = await Category.findOne({ where: { name: name } });

        if (categoryExists) return res.status(400).json({ message: 'Category Already Exists' });

        const category = await Category.create({
            name,
            description
        });

        res.status(201).json({ message: 'Category Created Successfully', category });

    } catch (error) {

        res.status(500).json({ message: 'Server Error', error });

    }

};
