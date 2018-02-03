import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EntrantsService } from '../services/entrants.service';

@Component({
    selector: 'app-entry',
    templateUrl: './entry.component.html',
    styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

    private currentUserId: number;
    private currentUser: any;

    constructor(
        private entrants: EntrantsService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {

        // Get user ID from the route
        this.route.params.subscribe(params => {
            this.currentUserId = params['id'];
        });

        // Get the current entry
        this.currentUser = this.entrants.getEntrant(this.currentUserId);

    }

    addNewUrl(url: string) {
        this.entrants.recordEntry(this.currentUserId, url);
    }

    numOfEntries() {
        if (typeof this.currentUser.entries !== 'undefined' && this.currentUser.entries.length > 0) {
            return this.currentUser.entries.length;
        }
        return false;
    }
}
