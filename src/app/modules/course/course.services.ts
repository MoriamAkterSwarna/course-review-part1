/* eslint-disable @typescript-eslint/no-unused-vars */
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (course: TCourse) => {
  const newCourse = await Course.create(course);
  return newCourse;
};
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courses = await Course.find();
  return courses;
};

const updateCourseIntoDB = async (
  courseId: string,
  course: Partial<TCourse>,
) => {
  const { tags, details, ...coursesData } = course;
  const newUpdatedCourse: Record<string, unknown> = {
    ...coursesData,
  };
  if (tags && Object.keys(tags).length) {
    for (const [key, value] of Object.entries(tags)) {
      newUpdatedCourse[`tags.${key}`] = value;
    }
  }
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      newUpdatedCourse[`details.${key}`] = value;
    }
  }
  console.log(newUpdatedCourse);
  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    newUpdatedCourse,
    {
      new: true,
      runValidators: true,
    },
  );
  return updatedCourse;
};
const getCourseAndReviewsFromDB = async (courseId: string) => {
  const course = await Course.findById(courseId).populate('reviews');

  return course;
};

const getBestCoursesFromDB = async () => {
  try {
    const bestCourse = await Course.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'courseId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
          reviewCount: { $size: '$reviews' },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $limit: 1,
      },
    ]);
    return bestCourse;
  } catch (error) {
    console.log(error);
  }
};

export const CourseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  updateCourseIntoDB,
  getCourseAndReviewsFromDB,
  getBestCoursesFromDB,
};
