import { Injectable } from "@angular/core"
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { Recipe } from "./recipe-model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];

    // private recipes: Recipe[] = [
    //     new Recipe("Schnitzel", "Tasty Schnitzel", "https://cdn.pixabay.com/photo/2016/11/19/02/22/schnipo-1837703_1280.jpg", [
    //         new Ingredient("Meat", 1),
    //         new Ingredient("French Fries", 20)
    //     ]),
    //     new Recipe("Burger", "Tasty Burger", "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg", [
    //         new Ingredient("Buns", 2),
    //         new Ingredient("Meat", 1)
    //     ]),
    // ];

    constructor(private shoppingList: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingList.addIngredients(ingredients);
    }

    getRecipeOnId(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}