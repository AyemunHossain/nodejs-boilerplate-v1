import express from 'express';
import userValidator from '../validators/user.model.validation.js';
import productCategoryValidator from '../validators/product-category.model.validation.js';
import productCategory from '../controllers/product-category.controller.js';
import authModdleware from '../middlewares/authentication.js';
import { register, login } from '../controllers/user.controller.js';
import validation from '../middlewares/model-validation.js';

const router = express.Router();

// User Routes
router.post('/user/register', validation.bodyValidator(userValidator.userRegistration), register);
router.post('/user/login', validation.bodyValidator(userValidator.userLogin), login);

// Product Category Routes
router.post('/product-category/create', authModdleware.userAuthenticationCheck, validation.bodyValidator(productCategoryValidator.createCategory), productCategory.createProductCategory);
router.get('/product-category/all', productCategory.getAllProductCategories);
router.get('/product-category', validation.queryValidator(productCategoryValidator.getSingleProductCategory), productCategory.getSingleProductCategory);
router.post('/product-category/update', authModdleware.userAuthenticationCheck, validation.bodyValidator(productCategoryValidator.updateProductCategory), productCategory.updateProductCategory);
router.post('/product-category/delete', validation.bodyValidator(productCategoryValidator.deleteProductCategory), productCategory.deleteProductCategory);
router.post('/product-category/search', validation.bodyValidator(productCategoryValidator.filterPorudctCategory), productCategory.searchProductCategory);
router.post('/product-category/filter', productCategory.filterProductCategory);

export default router;
