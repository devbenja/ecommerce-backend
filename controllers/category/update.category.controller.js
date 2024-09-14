import { Category } from "../../models/category.model.js";

export const updateCategory = async (req, res) => {

    const { id } = req.params;
    const { name, description } = req.body;

    try {

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: 'Category Not Found' });
        }

        category.name = name || category.name;
        category.description = description || category.description;

        await category.save();

        res.status(200).json({ message: 'Category Updated Successfully', category });

    } catch (error) {

        res.status(500).json({ message: 'Server Error', error });

    }

};
