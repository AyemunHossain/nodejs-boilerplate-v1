'use strict';

const productCategory = require("../models/product-category.model.js");
const Joi = require("joi");
const slugGenerator = require("../utils/slug-generator");
const mongoose = require('../services/mongodb');

// Create and Save a new ProductCategory
const createProductCategory = async (req, res) => {
  const slug = slugGenerator(req.body.name);

  try {

    const getSameSlugCategory = await productCategory.findOne({slug:slug});
    if(getSameSlugCategory){
      return res.status(400).json({
        message: "Product Category already exist with same name",
      });
    }
    const newProductCategory = new productCategory({
      name: req.body.name,
      slug: slug,
      createdBy: req.user.id,
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
    const id = req.query.id;
    const data = await productCategory.findOne({_id: id});

    console.log({data})
    if (!data) {
      return res.status(404).json({
        message: "Product Category not found with id " + id,
      });
    }

    return res.status(200).json({
      message: "Product Category",
      data: data,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

// Update a product category identified by the productCategoryId in the request
const updateProductCategory = async (req, res) => {
  try {
    const id = req.body.id;
    
    const data = await productCategory.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        slug: slugGenerator(req.body.name),
        lastUpdatedBy: req.user.id,
      },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        message: "Product Category not found with id " + id,
      });
    }

    return res.status(200).json({
      message: "Product Category updated successfully",
      data: data,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

// Delete a product category with the specified productCategoryId in the request
const deleteProductCategory = async (req, res) => {
  try {
    const id = req.body.id;
    const data = await productCategory.findByIdAndRemove(id);

    if (!data) {
      return res.status(404).json({
        message: "Product Category not found with id " + id,
      });
    }

    return res.status(200).json({
      message: "Product Category deleted successfully",
    });
  } catch (err) {
    res.json({ message: err });
  }
};

const searchProudctCategory = async (req, res) => {
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


const filterPorudctCategory = async (req, res) => {
  try {
   
    const {createdBy=null,lastUpdatedBy=null } = req.body 
    var filter = {};
    
    if(createdBy){
      filter.createdBy = new mongoose.Types.ObjectId(createdBy);;
    }

    if(lastUpdatedBy){
      filter.lastUpdatedBy = new mongoose.Types.ObjectId(lastUpdatedBy);
    }
    
    const data = await productCategory.find(filter);

    if (!data) {
      return res.status(404).json({
        message: "Product Category not found "
      });
    }

    return res.status(200).json({
      message: "Product Categories",
      data: data,
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
  searchProudctCategory,
  filterPorudctCategory,
};