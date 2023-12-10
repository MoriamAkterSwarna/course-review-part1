import { Request, Response } from 'express';
import { CategoryServices } from './category.services';

const createCategoryController = async (req: Request, res: Response) => {
  const newCategory = await CategoryServices.createCategoryIntoDB(req.body);
  res.status(201).json({
    message: 'Category created successfully',
    newCategory,
  });
};
const getAllCategoriesController = async (req: Request, res: Response) => {
  const categories = await CategoryServices.getAllCategoriesFromDB();
  res.status(200).json({
    message: 'All categories fetched successfully',
    categories,
  });
};

export const CategoryController = {
  createCategoryController,
  getAllCategoriesController,
};
