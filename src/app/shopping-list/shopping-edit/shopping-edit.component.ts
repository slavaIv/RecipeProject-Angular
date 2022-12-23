import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild("f", {static: false}) shForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedNumberIndex: number;
    editedItem: Ingredient;

    constructor(private shoppingListService: ShoppingListService) { }

    onAddItem(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        if(this.editMode) {
            this.shoppingListService.updateIngredient(newIngredient, this.editedNumberIndex);
        }
        else {
            this.shoppingListService.addIngredient(newIngredient);
        }
        this.editMode = false;
        this.shForm.reset();
    }

    deleteItem() {
        this.shoppingListService.deleteIngredient(this.editedNumberIndex);
        this.clearForm();
    }

    clearForm() {
        this.editMode = false;
        this.shForm.reset();
    }

    ngOnInit(): void {
        this.subscription = this.shoppingListService.startedEditing.subscribe(
            (index: number) => {
                this.editedNumberIndex = index;
                this.editMode = true;
                this.editedItem = this.shoppingListService.getIngredient(index);              
                this.shForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                });
            }
        )    
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
