// Imports
import axios from 'axios'; // Importing axios for making HTTP requests
import { apiKey } from '../src/constants'; // Importing API key from constants file

// Base URL for all API requests to Spoonacular
const apiBaseUrl = 'https://api.spoonacular.com';

// Endpoints for various API requests
const featuredRecipesEndpoint = `${apiBaseUrl}/recipes/random?number=3&apiKey=${apiKey}`; // Endpoint for fetching featured recipes
const popularRecipesEndpoint = (offset = 0) => `${apiBaseUrl}/recipes/complexSearch?sort=popularity&offset=${offset}&number=10&apiKey=${apiKey}`; // Endpoint for fetching popular recipes with pagination
const recipeDetailsEndpoint = (id) => `${apiBaseUrl}/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`; // Endpoint for fetching detailed recipe information including nutrition
const similarRecipesEndpoint = (id) => `${apiBaseUrl}/recipes/${id}/similar?apiKey=${apiKey}`; // Endpoint for fetching similar recipes by ID
const healthyRecipesEndpoint = (offset = 0) => `${apiBaseUrl}/recipes/complexSearch?apiKey=${apiKey}&sort=healthiness&offset=${offset}&number=10`; // Endpoint for fetching healthy recipes
const budgetFriendlyRecipesEndpoint = (maxPrice, offset = 0) => `${apiBaseUrl}/recipes/complexSearch?maxPricePerServing=${maxPrice}&offset=${offset}&number=10&apiKey=${apiKey}`; // Endpoint for fetching budget-friendly recipes based on max price per serving
const lowCalorieRecipesEndpoint = (offset = 0) => `${apiBaseUrl}/recipes/complexSearch?apiKey=${apiKey}&maxCalories=400&offset=${offset}&number=10`; // Endpoint for fetching low-calorie recipes under 400 calories
const ingredientDetailsEndpoint = (id) => `${apiBaseUrl}/food/ingredients/${id}/information?amount=1&apiKey=${apiKey}`; // Endpoint for fetching ingredient details by ID
const recipesByIngredientEndpoint = (ingredientName, offset = 0) => `${apiBaseUrl}/recipes/findByIngredients?ingredients=${ingredientName}&offset=${offset}&number=10&apiKey=${apiKey}`; // Endpoint for finding recipes by ingredients
const searchRecipesEndpoint = (query, offset = 0) => `${apiBaseUrl}/recipes/complexSearch?query=${query}&offset=${offset}&number=20&apiKey=${apiKey}`; // Endpoint for searching recipes based on a query

// Generic API call function using axios
const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET', // Using GET method for data fetching
        url: endpoint, // URL endpoint for the API call
        params: params ? params : {} // Optional query parameters
    };

    try {
        // Attempting to make API request using axios
        const response = await axios.request(options);
        return response.data; // Returning response data from the API
    } catch (error) {
        // Handling errors during the API request
        console.log('error: ', error); // Logging the error to the console
        return {}; // Returning an empty object in case of an error
    }
};

// Functions for fetching specific types of data, utilizing the generic apiCall function
export const fetchFeaturedRecipes = () => {
    return apiCall(featuredRecipesEndpoint); // Fetching featured recipes
};

export const fetchPopularRecipes = (offset) => {
    return apiCall(popularRecipesEndpoint(offset)); // Fetching popular recipes with pagination
};

export const fetchHealthyRecipes = (offset) => {
    return apiCall(healthyRecipesEndpoint(offset)); // Fetching healthy recipes with pagination
};

export const fetchBudgetFriendlyRecipes = (maxPrice, offset) => {
    return apiCall(budgetFriendlyRecipesEndpoint(maxPrice, offset)); // Fetching budget-friendly recipes based on max price per serving
};

export const fetchLowCalorieRecipes = (offset) => {
    return apiCall(lowCalorieRecipesEndpoint(offset)); // Fetching low-calorie recipes under 400 calories
};

export const fetchRecipeDetails = (id) => {
    return apiCall(recipeDetailsEndpoint(id)); // Fetching detailed recipe information by ID
};

export const fetchSimilarRecipes = (id) => {
    return apiCall(similarRecipesEndpoint(id)); // Fetching similar recipes by ID
};

export const fetchIngredientDetails = (id) => {
    return apiCall(ingredientDetailsEndpoint(id)); // Fetching ingredient details by ID
};

export const fetchRecipesByIngredient = (ingredientName, offset) => {
    return apiCall(recipesByIngredientEndpoint(ingredientName, offset)); // Fetching recipes that include a specific ingredient
};

export const searchRecipes = (query, offset = 0) => {
    return apiCall(searchRecipesEndpoint(query, offset)); // Searching for recipes based on a query string
};
