import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (course: TCourse) => {
  const newCourse = await Course.create(course);
  return newCourse;
};
const getAllCoursesFromDB = async () => {
  const courses = await Course.find();
  return courses;
};

export const CourseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
};
