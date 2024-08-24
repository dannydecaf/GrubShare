import axios from 'axios';
import { apiKey } from '../src/constants';


// Endpoints

const apiBaseUrl = 'https://api.spoonacular.com';
const randomRecipesEndpoint = `${apiBaseUrl}/recipes/random?number=3&apiKey=${apiKey}`;
const popularRecipesEndpoint = `${apiBaseUrl}/recipes/complexSearch?sort=popularity&number=10&apiKey=${apiKey}`;
const recipeDetailsEndpoint = (id) => `${apiBaseUrl}/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`;
const similarRecipesEndpoint = (id) => `${apiBaseUrl}/recipes/${id}/similar?apiKey=${apiKey}`;

const apiCall = async (endpoint, params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    }

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return {}
    }

}

export const fetchRandomRecipes = ()=> {
    return apiCall(randomRecipesEndpoint);
}

export const fetchPopularRecipes = ()=> {
    return apiCall(popularRecipesEndpoint);
}

export const fetchRecipeDetails = (id) => {
    return apiCall(recipeDetailsEndpoint(id));
};

export const fetchSimilarRecipes = (id) => {
    return apiCall(similarRecipesEndpoint(id));
};