import axios from 'axios';
import { apiKey } from '../src/constants';


// Endpoints

const apiBaseUrl = 'https://api.spoonacular.com';
const featuredRecipesEndpoint = `${apiBaseUrl}/recipes/random?number=3&apiKey=${apiKey}`;
const popularRecipesEndpoint = `${apiBaseUrl}/recipes/complexSearch?sort=popularity&number=10&apiKey=${apiKey}`;
const recipeDetailsEndpoint = (id) => `${apiBaseUrl}/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`;
const similarRecipesEndpoint = (id) => `${apiBaseUrl}/recipes/${id}/similar?apiKey=${apiKey}`;
const healthyRecipesEndpoint = `${apiBaseUrl}/recipes/complexSearch?apiKey=${apiKey}&sort=healthiness&number=10`;
const budgetFriendlyRecipesEndpoint = (maxPrice) => `${apiBaseUrl}/recipes/complexSearch?maxPricePerServing=${maxPrice}&number=10&apiKey=${apiKey}`;
const lowCalorieRecipesEndpoint = `${apiBaseUrl}/recipes/complexSearch?apiKey=${apiKey}&maxCalories=400&number=10`;
const ingredientDetailsEndpoint = (id) => `${apiBaseUrl}/food/ingredients/${id}/information?amount=1&apiKey=${apiKey}`;



const apiCall = async (endpoint, params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    };

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return {}
    }
};

export const fetchFeaturedRecipes = ()=> {
    return apiCall(featuredRecipesEndpoint);
}

export const fetchPopularRecipes = ()=> {
    return apiCall(popularRecipesEndpoint);
}

export const fetchHealthyRecipes = () => {
    return apiCall(healthyRecipesEndpoint);
};

export const fetchBudgetFriendlyRecipes = (maxPrice) => {
    return apiCall(budgetFriendlyRecipesEndpoint(maxPrice));
};

export const fetchLowCalorieRecipes = () => {
    return apiCall(lowCalorieRecipesEndpoint);
};

export const fetchRecipeDetails = (id) => {
    return apiCall(recipeDetailsEndpoint(id));
};


export const fetchSimilarRecipes = (id) => {
    return apiCall(similarRecipesEndpoint(id));
};

export const fetchIngredientDetails = (id) => {
    return apiCall(ingredientDetailsEndpoint(id));
};