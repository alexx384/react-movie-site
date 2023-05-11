import { ShouldRevalidateFunction } from 'react-router-dom';
import { JSONErrorResponse, JSONSuccessResponse } from '~/hooks';

export const doNotRevalidateWhenHrefsAreTheSame: ShouldRevalidateFunction = ({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}) => {
  if (currentUrl.href.normalize() === nextUrl.href.normalize()) {
    return false;
  } else {
    return defaultShouldRevalidate;
  }
};

export const createSuccessActionResponse = <T>(
  responseData: T
): JSONSuccessResponse<T> => {
  return { success: true, data: responseData };
};

export const createErrorActionResponse = (
  errorMessage: string
): JSONErrorResponse => {
  return { success: false, error: { message: errorMessage } };
};
