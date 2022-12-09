import { EventEmitter, Injectable } from "@angular/core"
import { Ingridient } from "../shared/ingridient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { Recipe } from "./recipe-model";

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe("Schnitzel", "Tasty Schnitzel", "https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png", [
            new Ingridient("Meat", 1),
            new Ingridient("French Fries", 20)
        ]),
        new Recipe("Burger", "Tasty Burger", "https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png", [
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
}