import Category from '../models/categories';

exports.GetCategories = async (req, res) => {
    try {
        const info = await Category.find({});
        res.status(200).send({ message: 'success', contents: info });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}   

exports.CreateCategory = async (req, res) => {
    const body = req.body;
    const category = new Category({
        category_id: body.category_id,
        category_name: body.category_name,
    });
    try {
        const resp = await category.save();
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}
