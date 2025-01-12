import axios from 'axios';

// Create an instance of Axios with default base URL
const apiClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        apikey: import.meta.env.VITE_FILMO_API_KEY,
    },
});

// Fetch movies based on search query
export const searchMovies = async (query, page = 1) => {
    const response = await apiClient.get('/search/movie', {
        params: { query, page },
    });
    return response.data;
};

// Fetch movie details by ID
export const getMovieDetails = async (id) => {
    const response = await apiClient.get(`/movie/${id}`);
    return response.data;
};

// Function to fetch trending movies
export const getTrendingMovies = async (page = 1) => {
 
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTljNTY5NjEzMmYxMTRhY2ExN2I0NTUxZDMwMTg0MyIsIm5iZiI6MTczNjU5NTgzMi44MzksInN1YiI6IjY3ODI1OTc4YzVkMmU5NmUyNjdiNjk3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z8stMyx2T-eCgnf4tEzXuEJZEyV7haUL8PUVs8Xporc'
            }
          };
          
          fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));
  };

// Fetch movie credits (cast and crew)
export const getMovieCredits = async (id) => {
    const response = await apiClient.get(`/movie/${id}/credits`);
    return response.data;
};

// Fetch movie videos (trailers, teasers, etc.)
export const getMovieVideos = async (id) => {
    const response = await apiClient.get(`/movie/${id}/videos`);
    return response.data;
};