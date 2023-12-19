const express = require('express');
const router = express.Router();
const userValidator = require('../validators/user.model.validation');
const productCategoryValidator = require('../validators/product-category.model.validation');
const createProductCategory  = require('../controllers/product-category.controller');

const { register, login } = require('../controllers/user.controller');
const validation = require('../middlewares/model-validation');

//User Routes
router.post('/user/register', validation(userValidator.userRegistration), register);
router.post('/user/login', validation(userValidator.userLogin), login);

//Product Category Routes
router.post('/product-category/create', validation(productCategoryValidator.createCategory), createProductCategory.createProductCategory);
router.get('/product-category/all', createProductCategory.getAllProductCategories);
router.post('/product-category/:id', validation(productCategoryValidator.getSingleProductCategory), createProductCategory.getSingleProductCategory);
router.post('/product-category/update/:id', validation(productCategoryValidator.updateProductCategory), createProductCategory.updateProductCategory);
router.post('/product-category/delete/:id', validation(productCategoryValidator.deleteProductCategory),  createProductCategory.deleteProductCategory);
router.post('/product-category/filter', validation(productCategoryValidator.filterPorudctCategory), createProductCategory.filterPorudctCategory);


module.exports = router;