import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'RecipeProject';
    compToShow: string = "Recipes";


    onLinkChosen(link) {
        this.compToShow = link.target.text;
    }
}
