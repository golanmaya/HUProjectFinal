import { IReview } from "./ReviewInterfaces"

export interface IMovie {
    _id?: string
    creator?: string
    title: string
    summary: string
    genre: string
    releaseYear: number | undefined
    director: string
    image: IImage
    likes?: string[]
    reviews?: IReview[]
    createdAt?: Date,
}

// -----------------------------------------------------------------------

interface IImage {
    _id?: string,
    url: string
    alt?: string
}
