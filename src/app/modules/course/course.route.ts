import express from 'express';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';
export const router = express.Router();

router.post(
  '/course',
  validateZodRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);
router.get('/courses', CourseController.getAllCourses);
router.patch(
  '/courses/:courseId',
  validateZodRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);

export const CourseRoutes = router;
