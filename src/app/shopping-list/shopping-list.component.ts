import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

    @Output() link = new EventEmitter<string>();

    ingridients:Ingridient[] = [
        new Ingridient("Apples", 7),
        new Ingridient("Tomatoes", 3)
    ];

    constructor() {}

    onLinkChoose(event) {
        this.link.emit(event);
    }

    onIngridientAdded(event: Ingridient) {
        this.ingridients.push(event);
    }

    ngOnInit(): void {
        
    }
}
