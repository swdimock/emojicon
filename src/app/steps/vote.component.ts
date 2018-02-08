import { Component, OnInit } from '@angular/core';

import { EntrantsService } from '../services/entrants.service';

@Component({
    selector: 'app-vote',
    templateUrl: './vote.component.html',
    styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

    public listEntries = [];

    constructor(
        private entrants: EntrantsService
    ) { }

    ngOnInit() {
        this.entrants.getEntries().then(result => {
            this.listEntries = result;
        });
    }

    toggleEntry(userId: number, url: string) {
        this.entrants.toggleVote(userId, url);
    }

    entrySelected(userId: number, url: string) {
        this.entrants.isEntrySelected(userId, url);
    }
}
