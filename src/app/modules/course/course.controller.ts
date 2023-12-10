/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { CourseService } from './course.services';

const createCourse = async (req: Request, res: Response) => {
  try {
    const newCourse = await CourseService.createCourseIntoDB(req.body);
    res.status(201).json(newCourse);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await CourseService.getAllCoursesFromDB();
    res.status(200).json(courses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const CourseController = {
  createCourse,
  getAllCourses,
};
