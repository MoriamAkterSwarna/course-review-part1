/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsyncFunc from '../../utils/catchAsyncFunc';
import { ReviewService } from './review.services';

const createReview = catchAsyncFunc(async (req: Request, res: Response) => {
  const newReview = await ReviewService.createReviewIntoDB(req.body);
  res.status(201).json(newReview);
});
export const ReviewController = {
  createReview,
};
