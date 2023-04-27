export interface MovieIdInfo {
  id?: number;
}

export interface MovieBasicInfo {
  movieURL: string;
  title: string;
  releaseDate: Date;
  genreIds: Set<string>;
}

export interface MovieAdditionalInfo {
  rating: number;
  runtime: number;
  overview: string;
}

export interface RequiredBasicMovieInfo
  extends Required<MovieIdInfo>,
    MovieBasicInfo {}

export interface RequiredFullMovieInfo
  extends Required<MovieIdInfo>,
    MovieBasicInfo,
    MovieAdditionalInfo {}

export interface FullMovieInfo
  extends MovieIdInfo,
    MovieBasicInfo,
    MovieAdditionalInfo {}

export interface MovieFormInfo
  extends Omit<MovieBasicInfo, 'releaseDate'>,
    MovieAdditionalInfo {
  releaseDate: string;
}
