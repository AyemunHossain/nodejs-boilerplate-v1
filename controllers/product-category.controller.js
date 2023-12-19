const productCategory = require("../models/product-category.model.js");
const Joi = require("joi");
const slugGenerator = require("../utils/slug-generator");

// Create and Save a new ProductCategory
const createProductCategory = async (req, res) => {
  const slug = slugGenerator(req.body.name);

  try {
    const newProductCategory = new productCategory({
      name: req.body.name,
      slug: slug,
    });
    const savedProductCategory = await newProductCategory.save();

    return res.status(200).json({
      message: "Product Category created successfully",
      data: savedProductCategory,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

// Retrieve and return all product categories from the database.
const getAllProductCategories = async (req, res) => {
  try {
    const productCategories = await productCategory.find();

    return res.status(200).json({
      message: "All Product Categories",
      data: productCategories,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

// Find a single product category with a productCategoryId
const getSingleProductCategory = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const id = req.body.id;

    const productCategory = await productCategory.findById(id);

    if (!productCategory) {
      return res.status(404).json({
        message: "Product Category not found with id " + id,
      });
    }

    return res.status(200).json({
      message: "Product Category",
      data: productCategory,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

// Update a product category identified by the productCategoryId in the request
const updateProductCategory = async (req, res) => {
  try {
    const id = req.body.id;
    
    const productCategory = await productCategory.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        slug: slugGenerator(req.body.name),
      },
      { new: true }
    );

    if (!productCategory) {
      return res.status(404).json({
        message: "Product Category not found with id " + id,
      });
    }

    return res.status(200).json({
      message: "Product Category updated successfully",
      data: productCategory,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

// Delete a product category with the specified productCategoryId in the request
const deleteProductCategory = async (req, res) => {
  try {
    const id = req.body.id;

    const productCategory = await productCategory.findByIdAndRemove(id);

    if (!productCategory) {
      return res.status(404).json({
        message: "Product Category not found with id " + id,
      });
    }

    return res.status(200).json({
      message: "Product Category deleted successfully",
      data: productCategory,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

const filterPorudctCategory = async (req, res) => {
  try {
    const query = req.body.query;

    const productCategories = await productCategory.find({
      name: new RegExp(query, "i"),
      slug: new RegExp(query, "i"),
    });

    if (!productCategories) {
      return res.status(404).json({
        message: "Product Category not found with query " + query,
      });
    }

    return res.status(200).json({
      message: "Product Categories",
      data: productCategories,
    });
    
  } catch (err) {
    res.json({ message: err });
  }
};



module.exports = {
  createProductCategory,
  getAllProductCategories,
  getSingleProductCategory,
  updateProductCategory,
  deleteProductCategory,
  filterPorudctCategory,
};