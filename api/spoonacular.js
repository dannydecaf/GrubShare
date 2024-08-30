import axios from 'axios'; // Importing Axios for making HTTP requests
import { apiKey } from '../src/constants'; // Importing the API key from constants

// Base URL for the Spoonacular API
const apiBaseUrl = 'https://api.spoonacular.com';

// Defining various API endpoints for fetching data
const featuredRecipesEndpoint = `${apiBaseUrl}/recipes/random?number=3&apiKey=${apiKey}`; // Endpoint for fetching 3 random featured recipes
const popularRecipesEndpoint = (offset = 0) => `${apiBaseUrl}/recipes/complexSearch?sort=popularity&offset=${offset}&number=10&apiKey=${apiKey}`; // Endpoint for fetching popular recipes, with pagination support
const recipeDetailsEndpoint = (id) => `${apiBaseUrl}/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`; // Endpoint for fetching detailed information about a specific recipe
const similarRecipesEndpoint = (id) => `${apiBaseUrl}/recipes/${id}/similar?apiKey=${apiKey}`; // Endpoint for fetching recipes similar to a given recipe
const healthyRecipesEndpoint = (offset = 0) => `${apiBaseUrl}/recipes/complexSearch?apiKey=${apiKey}&sort=healthiness&offset=${offset}&number=10`; // Endpoint for fetching healthy recipes, sorted by healthiness
const budgetFriendlyRecipesEndpoint = (maxPrice, offset = 0) => `${apiBaseUrl}/recipes/complexSearch?maxPricePerServing=${maxPrice}&offset=${offset}&number=10&apiKey=${apiKey}`; // Endpoint for fetching budget-friendly recipes within a specified price range
const lowCalorieRecipesEndpoint = (offset = 0) => `${apiBaseUrl}/recipes/complexSearch?apiKey=${apiKey}&maxCalories=400&offset=${offset}&number=10`; // Endpoint for fetching recipes with low calories, up to 400 calories
const ingredientDetailsEndpoint = (id) => `${apiBaseUrl}/food/ingredients/${id}/information?amount=1&apiKey=${apiKey}`; // Endpoint for fetching details about a specific ingredient
const recipesByIngredientEndpoint = (ingredientName, offset = 0) => `${apiBaseUrl}/recipes/findByIngredients?ingredients=${ingredientName}&offset=${offset}&number=10&apiKey=${apiKey}`; // Endpoint for fetching recipes that use a specific ingredient
const searchRecipesEndpoint = (query, offset = 0) => `${apiBaseUrl}/recipes/complexSearch?query=${query}&offset=${offset}&number=20&apiKey=${apiKey}`; // Endpoint for searching recipes based on a query string

// Generic function to make API calls using Axios
const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET', // Setting the HTTP method to GET
        url: endpoint, // URL of the API endpoint
        params: params ? params : {} // Optional query parameters for the request
    };

    try {
        const response = await axios.request(options); // Making the API request with Axios
        return response.data; // Returning the response data if the request is successful
    } catch (error) {
        console.log('error: ', error); // Logging any errors that occur during the request
        return {}; // Returning an empty object in case of an error
    }
};

// Exporting functions to fetch data using specific endpoints

export const fetchFeaturedRecipes = () => {
    return apiCall(featuredRecipesEndpoint); // Fetching featured recipes
};

export const fetchPopularRecipes = (offset) => {
    return apiCall(popularRecipesEndpoint(offset)); // Fetching popular recipes with optional pagination
};

export const fetchHealthyRecipes = (offset) => {
    return apiCall(healthyRecipesEndpoint(offset)); // Fetching healthy recipes with optional pagination
};

export const fetchBudgetFriendlyRecipes = (maxPrice, offset) => {
    return apiCall(budgetFriendlyRecipesEndpoint(maxPrice, offset)); // Fetching budget-friendly recipes based on max price and pagination
};

export const fetchLowCalorieRecipes = (offset) => {
    return apiCall(lowCalorieRecipesEndpoint(offset)); // Fetching low-calorie recipes with optional pagination
};

export const fetchRecipeDetails = (id) => {
    return apiCall(recipeDetailsEndpoint(id)); // Fetching detailed information about a specific recipe
};

export const fetchSimilarRecipes = (id) => {
    return apiCall(similarRecipesEndpoint(id)); // Fetching recipes similar to a specific recipe
};

export const fetchIngredientDetails = (id) => {
    return apiCall(ingredientDetailsEndpoint(id)); // Fetching details about a specific ingredient
};

export const fetchRecipesByIngredient = (ingredientName, offset) => {
    return apiCall(recipesByIngredientEndpoint(ingredientName, offset)); // Fetching recipes by a specific ingredient with optional pagination
};

export const searchRecipes = (query, offset = 0) => {
    return apiCall(searchRecipesEndpoint(query, offset)); // Searching recipes based on a query with optional pagination
};
