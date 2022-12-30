import { Component, OnDestroy, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated = false;
    private authSubsription: Subscription;

    constructor(private dataStorage: DataStorageService, private authService: AuthService) {}

    onSaveData() {
        this.dataStorage.saveRecipeToDatabase();
    }

    onFetchData() {
        this.dataStorage.getRecipesFromDatabase().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnInit(): void {
        this.authSubsription = this.authService.user.subscribe(data => {
            this.isAuthenticated = !!data;
        });
    }

    ngOnDestroy(): void {
        this.authSubsription.unsubscribe();
    }
}
