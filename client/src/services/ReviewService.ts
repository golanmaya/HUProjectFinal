import { apiBase } from "../config";
import { IReview } from "../interfaces/ReviewInterfaces";
import { getToken } from "./UserService";

export async function writeReview(review: IReview): Promise<{ error: string | undefined, result: IReview | undefined }> {
    try {
        const token = await getToken()
        if (!token) return { error: 'No token found', result: undefined }
        const response = await fetch(`${apiBase}/reviews/${review.movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(review),
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        const result: IReview = data;
        return { error: undefined, result: result }
    } catch (error) {
        throw (error);
    }
}

export async function deleteReview(reviewId: string): Promise<{ error: string | undefined, result: { success: boolean } | undefined }> {
    try {
        const token = await getToken()
        if (!token) return { error: 'No token found', result: undefined }
        const response = await fetch(`${apiBase}/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        if (!response.ok) throw new Error(await response.text());
        return { error: undefined, result: { success: true } }
    } catch (error) {
        throw (error);
    }
}

export async function updateReview(review: IReview): Promise<{ error: string | undefined, result: IReview | undefined }> {
    try {
        const token = await getToken()
        if (!token) return { error: 'No token found', result: undefined }
        const response = await fetch(`${apiBase}/reviews/${review._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(review),
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        const result: IReview = data;
        return { error: undefined, result: result }
    } catch (error) {
        throw (error);
    }
}