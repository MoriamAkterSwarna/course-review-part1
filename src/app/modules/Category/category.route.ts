import express from 'express';
import { CategoryController } from './category.controller';
export const router = express.Router();

router.post('/', CategoryController.createCategoryController);
router.get('/', CategoryController.getAllCategoriesController);

export const CategoryRoutes = router;
