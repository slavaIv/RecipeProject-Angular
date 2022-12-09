import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

    @Output() link = new EventEmitter<string>();

    ingridients: Ingridient[];

    constructor(private shoppingListService: ShoppingListService) {}

    onLinkChoose(event) {
        this.link.emit(event);
    }

    ngOnInit(): void {
        this.ingridients = this.shoppingListService.getIngridients();
        this.shoppingListService.ingridientsChanged.subscribe(
            (ingridients: Ingridient[]) => {
                this.ingridients = ingridients;
            }
        )
    }
}
