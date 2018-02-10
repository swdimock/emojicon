import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntrantsService } from '../services/entrants.service';

@Component({
    selector: 'app-vote',
    templateUrl: './vote.component.html',
    styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

    private currentUserId: number;
    public listEntries = [];

    constructor(
        private entrants: EntrantsService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe(params => {
            this.currentUserId = params['id'];
        });
    }

    ngOnInit() {
        this.entrants.getEntries(this.currentUserId).then(result => {
            this.listEntries = result;
        });
    }

    toggleEntry(userId: number, url: string) {
        this.entrants.toggleVote(userId, url);
    }

    entrySelected(userId: number, url: string) {
        this.entrants.isEntrySelected(userId, url);
    }

    totalReached() {
        return this.entrants.totalVotesReached();
    }
}
