import { TErrorIssue, TErrorResponse } from './error.types';
import GenericError from './genericError';

const handlerGenericError = (err: GenericError): TErrorResponse => {
  const issues: TErrorIssue[] = [
    {
      path: '',
      message: err.message,
    },
  ];

  return {
    statusCode: err.statusCode,
    success: false,
    message: 'Generic Error',
    errorMessage: err.message,
    errorDetails: {
      issues,
      name: err.name,
    },
  };
};

export default handlerGenericError;
