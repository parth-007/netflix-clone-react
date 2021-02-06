import axios from 'axios';

// Base URL to make API requests to the movie database
export const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});