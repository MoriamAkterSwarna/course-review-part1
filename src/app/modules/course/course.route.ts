import express from 'express';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';
export const router = express.Router();

router.post(
  '/',
  validateZodRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);
router.get('/', CourseController.getAllCourses);

export const CourseRoutes = router;
