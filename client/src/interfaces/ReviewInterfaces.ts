export interface IReview {
   _id?: string,
   userId?: string,
   movieId?: string,
   rating: number,
   text: String,
   date?: Date
}