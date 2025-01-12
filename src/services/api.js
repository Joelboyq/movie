import axios from 'axios';

// Create an instance of Axios with default base URL
const apiClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        apikey: import.meta.env.VITE_FILMO_API_TOKEN,
    },
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_FILMO_API_TOKEN}` 
      }
});

// Handle responses
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized - Invalid Token');
        // Implement token refresh logic or redirect to login
      }
      return Promise.reject(error);
    }
  );
  
  export default apiClient;

// console.log(import.meta.env.VITE_FILMO_API_KEY);

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
export const getTrendingMovies = async () => {
    try {
        const response = await apiClient.get('/trending/movie/day', {
            params: { language: 'en-US' },
        });
        console.log('===========================',response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
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