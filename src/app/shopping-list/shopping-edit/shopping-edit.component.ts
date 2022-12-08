import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingridient } from 'src/app/shared/ingridient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

    @ViewChild("nameInput", {static: false}) nameInputRef: ElementRef;
    @ViewChild("amountInput", {static: false}) amountInputRef: ElementRef;

    @Output() ingridientAdded = new EventEmitter<Ingridient>();


    onClickAdd() {
        const ingName = this.nameInputRef.nativeElement.value;
        const ingAmount = this.amountInputRef.nativeElement.value;
        const newIngridient = new Ingridient(ingName, ingAmount);
        this.ingridientAdded.emit(newIngridient);
    }

    ngOnInit(): void {
        
    }

}
