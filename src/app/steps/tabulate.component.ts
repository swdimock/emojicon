import { Component, OnInit } from '@angular/core';
import { EntrantsService } from '../services/entrants.service';

@Component({
    selector: 'app-tabulate',
    templateUrl: './tabulate.component.html',
    styleUrls: ['./tabulate.component.css']
})
export class TabulateComponent implements OnInit {

    private listEntrants: any;
    public topResults: any = [];

    constructor(
        private entrants: EntrantsService
    ) { }

    ngOnInit() {
        const $this = this;
        this.assignTheWinners(function() {
            $this.sortTheWinners();
        });
    }

    getEntrantName(userId) {
        const entrant = this.entrants.getEntrant(userId);
        return entrant['name'];
    }

    maxVotes() {
        return this.entrants.maxVotes;
    }

    private assignTheWinners(callback) {
        this.entrants.getEntrants().then(result => {
            this.listEntrants = result;

            for (const e in this.listEntrants) {
                if (this.listEntrants.hasOwnProperty(e)) {
                    const entrant = this.listEntrants[e];

                    if (typeof entrant.entries !== 'undefined') {
                        for (const f in entrant.entries) {

                            if (entrant.entries.hasOwnProperty(f)) {
                                const entries = entrant.entries[f];

                                if (typeof entries.votes !== 'undefined' && entries.votes.length > 0) {

                                    this.topResults.push({
                                        file: entries.file,
                                        votes: entries.votes.length,
                                        entrant: entrant.id
                                    });
                                }
                            }
                        }
                    }
                }
            }
            callback();
        });
    }

    private sortTheWinners() {
        this.topResults.sort(function(a, b) {
            return parseFloat(b.votes) - parseFloat(a.votes);
        });
    }

}
