const express = require('express');
const router = express.Router();
const userValidator = require('../validators/user.model.validation');
const productCategoryValidator = require('../validators/product-category.model.validation');
const productCategory  = require('../controllers/product-category.controller');
const authModdleware = require('../middlewares/authentication');
const { register, login } = require('../controllers/user.controller');
const validation = require('../middlewares/model-validation');

//User Routes
router.post('/user/register', validation.bodyValidator(userValidator.userRegistration), register);
router.post('/user/login', validation.bodyValidator(userValidator.userLogin), login);

//Product Category Routes
router.post('/product-category/create', authModdleware.userAuthenticationCheck, validation.bodyValidator(productCategoryValidator.createCategory), productCategory.createProductCategory);
router.get('/product-category/all', productCategory.getAllProductCategories);
router.get('/product-category', validation.queryValidator(productCategoryValidator.getSingleProductCategory), productCategory.getSingleProductCategory);
router.post('/product-category/update',authModdleware.userAuthenticationCheck, validation.bodyValidator(productCategoryValidator.updateProductCategory), productCategory.updateProductCategory);
router.post('/product-category/delete', validation.bodyValidator(productCategoryValidator.deleteProductCategory),  productCategory.deleteProductCategory);
router.post('/product-category/search', validation.bodyValidator(productCategoryValidator.filterPorudctCategory), productCategory.searchProudctCategory);
router.post('/product-category/filter', productCategory.filterPorudctCategory);


module.exports = router;