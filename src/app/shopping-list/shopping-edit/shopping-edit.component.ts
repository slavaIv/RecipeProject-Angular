import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingridient } from 'src/app/shared/ingridient.model';
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
    editedItem: Ingridient;

    constructor(private shoppingListService: ShoppingListService) { }

    onAddItem(form: NgForm) {
        const value = form.value;
        const newIngridient = new Ingridient(value.name, value.amount);
        if(this.editMode) {
            this.shoppingListService.updateIngridient(newIngridient, this.editedNumberIndex);
        }
        else {
            this.shoppingListService.addIngridient(newIngridient);
        }
        this.editMode = false;
        this.shForm.reset();
    }

    deleteItem() {
        this.shoppingListService.deleteIngridient(this.editedNumberIndex);
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
                this.editedItem = this.shoppingListService.getIngridient(index);              
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
