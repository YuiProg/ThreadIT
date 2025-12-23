import {} from "express";
import Product from "../models/ProductModel.js";
// const ErrorHandler = (err: any) : Promise<Errors> => {
//     let errors: Errors = {};
// }
export const getProducts = async (req, res) => {
    try {
        const products = await Product.getProducts();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};
export const addProduct = async (req, res) => {
    try {
        const { name, price, description, inStock, type, size } = req.body;
        const newProduct = await Product.addProduct({ name, price, description, inStock, type, size });
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to add product' });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.deleteProduct(productId);
        res.status(200).json(deletedProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
};
//# sourceMappingURL=productController.js.map