/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import GenericError from '../../errors/genericError';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (course: TCourse) => {
  const newCourse = await Course.create(course);
  return newCourse;
};
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .filter()
    .sort()
    .paginate();
  const courses = await courseQuery.newQuery;
  return courses;
};
const getTotalCourses = async () => {
  try {
    const totalCourses = await Course.countDocuments();
    return totalCourses;
  } catch (error) {
    throw new GenericError(
      httpStatus.BAD_REQUEST,
      'Failed to get the total count of courses',
    );
  }
};

const updateCourseIntoDB = async (
  courseId: string,
  course: Partial<TCourse>,
) => {
  const existsCourse = await Course.findById(courseId);
  if (!existsCourse)
    throw new GenericError(httpStatus.BAD_REQUEST, "Course doesn't exist");
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
  // console.log(newUpdatedCourse);
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
  const existsCourse = await Course.findById(courseId);
  if (!existsCourse)
    throw new GenericError(httpStatus.BAD_REQUEST, "Course doesn't exist");
  try {
    const course = await Course.findById(courseId).populate('reviews');
    console.log(course);
    return course;
  } catch (error) {
    throw new GenericError(httpStatus.BAD_REQUEST, "Course doesn't exist");
  }
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
    throw new GenericError(httpStatus.BAD_REQUEST, "Course doesn't exist");
  }
};

export const CourseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getTotalCourses,
  updateCourseIntoDB,
  getCourseAndReviewsFromDB,
  getBestCoursesFromDB,
};
