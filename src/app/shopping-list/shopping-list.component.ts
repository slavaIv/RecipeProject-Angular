import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})


export class ShoppingListComponent implements OnInit, OnDestroy {

    ingridients: Ingridient[];
    private subscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) {}

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }

    ngOnInit(): void {
        this.ingridients = this.shoppingListService.getIngridients();
        this.subscription = this.shoppingListService.ingridientsChanged.subscribe(
            (ingridients: Ingridient[]) => {
                this.ingridients = ingridients;
            }
        )
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
