import express from 'express';
import { ReviewController } from './review.controller';
export const router = express.Router();

router.post('/', ReviewController.createReview);

export const ReviewRoutes = router;
