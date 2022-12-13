import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe-model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    id: number;
    recipe: Recipe;
    
    constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

    onAddToShoppingList() {
        this.recipeService.addIngridientsToShoppingList(this.recipe.ingridients);
    }

    onEditRecipe() {
        this.router.navigate(["edit"], {relativeTo: this.route})
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params["id"];
                this.recipe = this.recipeService.getRecipeOnId(this.id);
            }
        );
    }
}
