//This file contains functions called by API endpoints

import { PrismaClient } from '@prisma/client'
import { env } from 'process';
const fetch = require('node-fetch');

const prisma = new PrismaClient()

export async function query(ingredientArr:Array<String>) {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=10&ignorePantry=false&ranking=2';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RECIPE_FOOD_NUTRITION_API_KEY,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        },
        ingredients: ingredientArr.toString(),
        number: 10,
        ignorePantry: false,
        ranking: 2
    };
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log("========== query result ==========");
        console.log(result);
        console.log('==================================');
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function searchIngredient(name:String) {
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/search?query=yogurt&addChildren=true&minProteinPercent=5&maxProteinPercent=50&minFatPercent=1&maxFatPercent=10&minCarbsPercent=5&maxCarbsPercent=30&metaInformation=false&intolerances=egg&sort=calories&sortDirection=asc&offset=0&number=10";
    const options = {
        method: "GET",
        headers: {
            'X-RapidAPI-Key': process.env.RECIPE_FOOD_NUTRITION_API_KEY,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        },
        query: name
    };
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log("========== ingredient result ==========");
        console.log(result);
        console.log("=======================================");
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function addIngredient(idString:String, userEmail:any) {
    //add names of ingredients instead of ids to user database
    //fetch name of ingredient
    var name:string;

    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/9266/information?amount=150&unit=grams';
    const options = {
        method: 'GET',
        headers: {
            "X-RapidAPI-Key": process.env.RECIPE_FOOD_NUTRITION_API_KEY,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        },
        id: idString
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log("========== add ingredient ==========");
        console.log(result.name);
        console.log("====================================");
        name = result.name;
    } catch (error) {
        console.error(error);
        return error;
    }

    //add names array to the user's ingredients JSON
    const updateUser = await prisma.users.update({
        where: {
            email: userEmail,
        },
        data: {
            ingredients: {
                push: name,
            },
        },
    });
    return "success";
}

export async function removeIngredient(ingredientName:string, userEmail:string) {
    //TODO: write wrapper function to remove items from a list in prisma
    //TODO: add a feature to automatically remove items from a list in prisma repo
    //remove ingredient from user database by name
    //get the ingredient list from the user's record
    const userData = await prisma.users.findUnique({
        where: {
            email: userEmail
        }
    });
    //modify the ingredient list
    var newIngredients:Array<string> = userData.ingredients;
    newIngredients.splice(newIngredients.indexOf(ingredientName),1);
    //update the user's record with the new list
    const updateUser = await prisma.users.update({
        where: {
            email: userEmail,
        },
        data: {
            ingredients: newIngredients,
        }
    });
}


export async function addRecipe(idString:string, userEmail:string) {
    //add a recipe to a user's data
    const updateRecipe = await prisma.users.update({
        where: {
            email: userEmail,
        },
        data: {
            recipes: {
                push: idString,
            },
        }
    });
}

export async function removeRecipe(idString:string, userEmail:string) {
    //get user data
    const userData = await prisma.users.findUnique({
        where: {
            email: userEmail,
        },
    });
    //modify content
    var newRecipes:Array<string> = userData.recipes;
    newRecipes.splice(newRecipes.indexOf(idString),1);
    //update record
    const updateUer = await prisma.users.update({
        where: {
            email: userEmail,
        },
        data: {
            recipes: newRecipes,
        }
    });
}

export async function createGroceryList(recipesArr:Array<string>) {
    //for each recipe in the list:
    //get a list of ingredients in the recipe
    //add the ingredient to the grocery list
    //return the list of all ingredient data
    for (var recipeId in recipesArr) {
        
    }
}

export async function getRecipe(idString:String) {

}

export async function getUser(userEmail:String) {

}

export async function getRecipeReport(ingredientsArr:Array<String>, id:String) {

}
