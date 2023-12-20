const express = require('express');
const router = express.Router();
const userValidator = require('../validators/user.model.validation');
const productCategoryValidator = require('../validators/product-category.model.validation');
const createProductCategory  = require('../controllers/product-category.controller');

const { register, login } = require('../controllers/user.controller');
const validation = require('../middlewares/model-validation');

//User Routes
router.post('/user/register', validation.bodyValidator(userValidator.userRegistration), register);
router.post('/user/login', validation.bodyValidator(userValidator.userLogin), login);

//Product Category Routes
router.post('/product-category/create', validation.bodyValidator(productCategoryValidator.createCategory), createProductCategory.createProductCategory);
router.get('/product-category/all', createProductCategory.getAllProductCategories);
router.get('/product-category/:id', validation.queryValidator(productCategoryValidator.getSingleProductCategory), createProductCategory.getSingleProductCategory);
router.post('/product-category/update/:id', validation.queryValidator(productCategoryValidator.updateProductCategory), createProductCategory.updateProductCategory);
router.post('/product-category/delete/:id', validation.queryValidator(productCategoryValidator.deleteProductCategory),  createProductCategory.deleteProductCategory);
router.post('/product-category/filter', validation.bodyValidator(productCategoryValidator.filterPorudctCategory), createProductCategory.filterPorudctCategory);


module.exports = router;