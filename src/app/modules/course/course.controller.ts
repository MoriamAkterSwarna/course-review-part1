/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsyncFunc from '../../utils/catchAsyncFunc';
import { CourseService } from './course.services';

const createCourse = catchAsyncFunc(async (req: Request, res: Response) => {
  const newCourse = await CourseService.createCourseIntoDB(req.body);
  res.status(201).json(newCourse);
});

const getAllCourses = catchAsyncFunc(async (req: Request, res: Response) => {
  const courses = await CourseService.getAllCoursesFromDB();
  res.status(200).json(courses);
});
export const CourseController = {
  createCourse,
  getAllCourses,
};
