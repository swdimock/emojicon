import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EntrantsService } from '../services/entrants.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ EntrantsService ]
})
export class LoginComponent implements OnInit {

    public listEntrants = [];

    constructor(
        private entrants: EntrantsService,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.entrants.getEntrants().then(result => {
            this.listEntrants = result;
        });
    }

    selectUser(event): void {
        const userId = event.value;
        this.router.navigate(['entry', userId]);
    }

}
