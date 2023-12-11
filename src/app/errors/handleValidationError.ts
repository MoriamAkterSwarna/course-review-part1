import mongoose from 'mongoose';
import { TErrorIssue, TErrorResponse } from './error.types';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errorValues = Object.values(err.errors);
  const issues: TErrorIssue[] = [];
  errorValues.forEach(errObj => {
    issues.push({
      path: errObj.path,
      message: errObj.message,
    });
  });
  console.log(issues);

  return {
    statusCode: 400,
    success: false,
    message: 'Validation Error',
    errorMessage: 'Validation Error',
    errorDetails: {
      name: err.name,
      issues,
      errorCode: 'validation_error',
    },
  };
};

export default handleValidationError;
