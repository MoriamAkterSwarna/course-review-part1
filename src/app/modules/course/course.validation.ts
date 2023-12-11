import { z } from 'zod';
const TagsValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const DetailsValidationSchema = z.object({
  level: z.string(),
  description: z.string(),
});

const createCourseValidationSchema = z.object({
  title: z.string(),
  instructor: z.string(),
  categoryId: z.string(),
  price: z.number().min(1, { message: 'Price must be Greater than 0' }),
  tags: z.array(TagsValidationSchema),
  startDate: z.string(),
  endDate: z.string(),
  language: z.string(),
  provider: z.string(),
  durationWeeks: z.number().optional(),
  details: DetailsValidationSchema,
});

export const CourseValidation = {
  createCourseValidationSchema,
};
