import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTags } from './course.interface';

export const TagsSchema = new Schema<TTags>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const DetailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  instructor: {
    type: String,
    required: true,
    trim: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: [
    {
      type: TagsSchema,
      required: true,
    },
  ],
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    trim: true,
  },
  provider: {
    type: String,
    required: true,
    trim: true,
  },
  durationWeeks: {
    type: Number,
  },
  details: {
    type: DetailsSchema,
    required: true,
  },
});
courseSchema.pre('save', function (next) {
  const totalMilliSecondsInAWeek = 7 * 60 * 60 * 24 * 1000;
  const startDate = new Date(this.startDate);
  const endDate = new Date(this.endDate);
  const subtractMilliSeconds = endDate.getTime() - startDate.getTime();
  const durationWeeks = Math.ceil(
    subtractMilliSeconds / totalMilliSecondsInAWeek,
  );
  this.durationWeeks = durationWeeks;
  next();
});

export const Course = model<TCourse>('Course', courseSchema);
