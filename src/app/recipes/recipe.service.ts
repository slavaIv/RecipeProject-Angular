import { Injectable } from "@angular/core"
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { Recipe } from "./recipe-model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe("Schnitzel", "Tasty Schnitzel", "/assets/schnipo-g87de26108_1920.jpg", [
            new Ingredient("Meat", 1),
            new Ingredient("French Fries", 20)
        ]),
        new Recipe("Burger", "Tasty Burger", "/assets/hamburger-g7d0da8677_1920.jpg", [
            new Ingredient("Buns", 2),
            new Ingredient("Meat", 1)
        ]),
    ];

    constructor(private shoppingList: ShoppingListService) { }

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