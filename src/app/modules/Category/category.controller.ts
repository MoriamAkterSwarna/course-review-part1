import { Request, Response } from 'express';
import catchAsyncFunc from '../../utils/catchAsyncFunc';
import { CategoryServices } from './category.services';

const createCategoryController = catchAsyncFunc(
  async (req: Request, res: Response) => {
    const newCategory = await CategoryServices.createCategoryIntoDB(req.body);
    res.status(201).json({
      message: 'Category created successfully',
      newCategory,
    });
  },
);
const getAllCategoriesController = catchAsyncFunc(
  async (req: Request, res: Response) => {
    const categories = await CategoryServices.getAllCategoriesFromDB();
    res.status(200).json({
      message: 'All categories fetched successfully',
      categories,
    });
  },
);

export const CategoryController = {
  createCategoryController,
  getAllCategoriesController,
};
