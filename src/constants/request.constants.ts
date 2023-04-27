export const REQUEST_HOSTNAME: string = process.env[
  'REACT_APP_MOVIE_BACKEND_HOSTNAME'
] as string;
export const REQUEST_PORT: string = process.env[
  'REACT_APP_MOVIE_BACKEND_PORT'
] as string;
export const REQUEST_PROTOCOL: string = process.env[
  'REACT_APP_MOVIE_BACKEND_PROTOCOL'
] as string;
export const REQUEST_URI = `${REQUEST_PROTOCOL}://${REQUEST_HOSTNAME}:${REQUEST_PORT}`;

export const CREATE_MOVIE_URI = `${REQUEST_URI}/movies`;
export const UPDATE_MOVIE_URI = `${REQUEST_URI}/movies`;
