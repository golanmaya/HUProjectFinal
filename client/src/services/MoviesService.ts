import { apiBase } from "../config";
import { IMovie } from "../interfaces/MovieInterfaces";
import { getToken } from "./UserService";

export const doGetAllMovies = async (): Promise<{ error: string | null, result: IMovie[] | undefined }> => {
    try {
        const response = await fetch(`${apiBase}/movies`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = (await response.json()).data;
        if (!response.ok) return { error: data, result: undefined }
        return { error: null, result: data }
    } catch (err) {
        const errMessage = (err as Error).message
        return { error: errMessage, result: undefined }
    }
}

export const getMovieById = async (id: string): Promise<{ error: string | null, result: IMovie | undefined }> => {
    try {
        const response = await fetch(`${apiBase}/movies/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = (await response.json()).data;
        if (!response.ok) return { error: data, result: undefined }
        return { error: null, result: data }
    } catch (err) {
        const errMessage = (err as Error).message
        return { error: errMessage, result: undefined }
    }
}

export const doGetMyMovies = async (): Promise<{ error: string | undefined, result: IMovie[] | undefined }> => {
    try {
        const token = await getToken()
        if (!token) return { error: 'No token found', result: undefined }
        const response = await fetch(`${apiBase}/movies/my-movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        });
        const data = (await response.json()).data;
        if (!response.ok) return { error: data, result: undefined }
        return { error: undefined, result: data }
    } catch (err) {
        const errMessage = (err as Error).message
        return { error: errMessage, result: undefined }
    }
}

export async function createMovie(movie: IMovie): Promise<{ error: string | undefined, result: IMovie | undefined }> {
    try {
        const token = await getToken()
        if (!token) return { error: 'No token found', result: undefined }
        const response = await fetch(`${apiBase}/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(movie),
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        const result: IMovie = data;
        return { error: undefined, result: result }
    } catch (error) {
        throw (error);
    }
}

export async function updateMovie(movie: IMovie): Promise<{ error: string | undefined, result: IMovie | undefined }> {
    try {
        const token = await getToken()
        if (!token) return { error: 'No token found', result: undefined }
        const response = await fetch(`${apiBase}/movies/${movie._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify(movie),
        });
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        const result: IMovie = data;
        return { error: undefined, result: result }
    } catch (error) {
        throw (error);
    }
}

export async function likeAMovie(movieId: string): Promise<{ error: string | undefined, result: { success: boolean } | undefined }> {
    try {
        const token = await getToken()
        if (!token) return { error: 'No token found', result: undefined }
        const response = await fetch(`${apiBase}/movies/like/${movieId}`, {
            method: 'PATCH',
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

export async function deleteMovie(movieId: string): Promise<{ error: string | undefined, result: { success: boolean } | undefined }> {
    try {
        const token = await getToken()
        if (!token) return { error: 'No token found', result: undefined }
        const response = await fetch(`${apiBase}/movies/${movieId}`, {
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