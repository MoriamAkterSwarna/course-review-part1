import express from 'express';
import { CourseController } from './course.controller';
export const router = express.Router();

router.post('/', CourseController.createCourse);
router.get('/', CourseController.getAllCourses);

export const CourseRoutes = router;
