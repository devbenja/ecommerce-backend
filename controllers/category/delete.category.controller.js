import { Category } from "../../models/category.model.js";

export const deleteCategory = async (req, res) => {

    const { id } = req.params;

    try {

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: 'Category Not Found' });
        }

        await category.destroy();

        res.status(200).json({ message: 'Category Deleted Successfully' });

    } catch (error) {

        res.status(500).json({ message: 'Server Error', error });

    }

};