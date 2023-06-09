import { ShouldRevalidateFunction } from 'react-router-dom';

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
