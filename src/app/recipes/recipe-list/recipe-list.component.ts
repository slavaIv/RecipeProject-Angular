import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe-model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {

    @Output() recipeList = new EventEmitter<Recipe>();

    recipes: Recipe[] = [
        new Recipe("First test recipe", "First description", "https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png"),
        new Recipe("Second test recipe", "Second description", "https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png")
    ];

    onClickDone(recipe: Recipe) {
        this.recipeList.emit(recipe);
    }

    constructor() {

    }

    ngOnInit() {

    }
}
