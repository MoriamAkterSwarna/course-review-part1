import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

export const ReviewSchema = new Schema<TReview>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

export const Review = model<TReview>('review', ReviewSchema);
