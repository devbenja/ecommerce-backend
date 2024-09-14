import { Category } from "../../models/category.model.js";

export const readAllCategories = async (req, res) => {

    try {

        const categories = await Category.findAll();

        res.status(200).json({ categories });

    } catch (error) {

        res.status(500).json({ message: 'Server Error', error });

    }

};