import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe-model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";


@Injectable({providedIn: "root"})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    saveRecipeToDatabase() {
        const recipes = this.recipeService.getRecipes();
        this.http.put("https://ng-recipe-book-b09ea-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
                        recipes).subscribe(response => {
                            console.log(response);
                        });
    }

    getRecipesFromDatabase() {
            return this.http.get<Recipe[]>("https://ng-recipe-book-b09ea-default-rtdb.europe-west1.firebasedatabase.app/recipes.json")
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }));
    }
}