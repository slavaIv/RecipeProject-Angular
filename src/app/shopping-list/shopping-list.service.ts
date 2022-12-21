import { Subject } from "rxjs";
import { Ingridient } from "../shared/ingridient.model";

export class ShoppingListService {

    ingridientsChanged = new Subject<Ingridient[]>();
    startedEditing = new Subject<number>();
    
    private ingridients:Ingridient[] = [
        new Ingridient("Apples", 7),
        new Ingridient("Tomatoes", 3)
    ];

    getIngridient(index: number) {
        return this.ingridients[index];
    }

    getIngridients() {
        return this.ingridients.slice();
    }

    addIngridient(ingridient: Ingridient) {
        this.ingridients.push(ingridient);
        this.ingridientsChanged.next(this.ingridients.slice());
    }

    addIngridients(ingridients: Ingridient[]) {
        this.ingridients.push(...ingridients);
        this.ingridientsChanged.next(this.ingridients.slice());
    }

    updateIngridient(ingridient: Ingridient, index: number) {
        this.ingridients[index] = ingridient;
        this.ingridientsChanged.next(this.ingridients.slice());
    }

    deleteIngridient(index: number) {
        this.ingridients.splice(index, 1);
        this.ingridientsChanged.next(this.ingridients.slice());
    }
}