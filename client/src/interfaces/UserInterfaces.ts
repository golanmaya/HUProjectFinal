import { IMovie } from "./MovieInterfaces";

export interface IUserSigninJwtPayload {
  id: string;
  isAdmin: boolean;
  iat: number;
}

export interface IUserDetails {
  _id: string;
  name: IName;
  email: string;
  password: string;
  image: IImage;
  movies: string[]
  likes: IMovie[]
  reviews: string[]
  isAdmin: boolean;
}

export interface IUserSignup {
  name: IName;
  email: string;
  password: string;
  image: IImage;
}

export interface IUserEdit {
  _id: string,
  name?: IName;
  image?: IImage;
}

interface IName {
  _id?: string;
  first: string;
  middle?: string;
  last: string;
}

interface IImage {
  _id?: string;
  url: string;
  alt: string;
}


// ------------------- JOI schemas -------------------