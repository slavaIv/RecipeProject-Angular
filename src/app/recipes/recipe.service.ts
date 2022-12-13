import { EventEmitter, Injectable } from "@angular/core"
import { Ingridient } from "../shared/ingridient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { Recipe } from "./recipe-model";

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe("Schnitzel", "Tasty Schnitzel", "/assets/schnipo-g87de26108_1920.jpg", [
            new Ingridient("Meat", 1),
            new Ingridient("French Fries", 20)
        ]),
        new Recipe("Burger", "Tasty Burger", "/assets/hamburger-g7d0da8677_1920.jpg", [
            new Ingridient("Buns", 2),
            new Ingridient("Meat", 1)
        ]),
    ];

    constructor(private shoppingList: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngridientsToShoppingList(ingridients: Ingridient[]) {
        this.shoppingList.addIngridients(ingridients);
    }

    getRecipeOnId(id: number): Recipe {
        return this.recipes[id];
    }

}