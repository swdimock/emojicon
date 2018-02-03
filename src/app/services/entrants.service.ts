import { Injectable } from '@angular/core';

@Injectable()
export class EntrantsService {

    public currentEntrant: any;
    private entrants = [
        {
            id: 1,
            name: 'Steve',
            entries: [
                {
                    file: 'https://media1.giphy.com/media/xUOwGfx2T53wbj5DWM/giphy_s.gif',
                    votes: [2, 3, 7]
                },
                {
                    file: 'https://media2.giphy.com/media/nEZkc87t9u68U/giphy.gif',
                    votes: [4, 2]
                },
                {
                    file: 'https://media3.giphy.com/media/l0Extn1wgzXyZn0J2/giphy.gif',
                    votes: [4, 2]
                },
                {
                    file: 'https://media1.giphy.com/media/l49JO4hlQKUBQi2AM/giphy.gif',
                    votes: [4, 2]
                }
            ]
        },
        {
            id: 2,
            name: 'Nick'
        },
        {
            id: 3,
            name: 'Mike'
        },
        {
            id: 4,
            name: 'Kathleen'
        },
        {
            id: 5,
            name: 'Cale'
        },
        {
            id: 6,
            name: 'Josh'
        },
        {
            id: 7,
            name: 'Elder'
        }
    ];

    constructor() {}

    getEntrants(): Promise<any> {
        return Promise.resolve(this.entrants);
    }

    getEntrant(userId: any) {
        for (const e in Object.keys(this.entrants)) {
            if (this.entrants.hasOwnProperty(e)) {
                const entrant = this.entrants[e];

                if (parseInt(userId, 10) === entrant.id) {
                    return entrant;
                }
            }
        }
        return false;
    }

    getEntries(): Promise<any> {

        const entries = [];

        // Loop through the entrants
        for (const e in Object.keys(this.entrants)) {
            if (this.entrants.hasOwnProperty(e)) {
                const entrant = this.entrants[e];

                // Loop through each entrant's entry
                for (const l in entrant.entries) {
                    if (entrant.entries.hasOwnProperty(l)) {
                        const entry = entrant.entries[l];

                        // If the file is there, then add it to our list
                        if (typeof entry.file !== 'undefined') {
                            entries.push({
                                userId: entrant.id,
                                file: entry.file,
                                votes: (typeof entry.votes !== 'undefined' ? entry.votes : 0)
                            });
                        }
                    }
                }
            }
        }
        return Promise.resolve(entries);
    }

    recordEntry(userId: number, url: string) {

        const entrant = this.getEntrant(userId);
        entrant.entries.push({
            file: url
        });
    }

    recordVote(userId: number, url: string) {

        const entrant = this.getEntrant(userId);

        for (const e in entrant.entries) {
            if (entrant.entries.hasOwnProperty(e)) {
                const entry = entrant.entries[e];

                if (entry.file === url && !(entry.votes.indexOf(userId) > -1)) {
                    entry.votes.push(userId);
                    break;
                }
            }
        }
    }

    isEntrySelected(userId: number, url: string) {

        const entrant = this.getEntrant(userId);

        for (const e in entrant.entries) {
            if (entrant.entries.hasOwnProperty(e)) {
                const entry = entrant.entries[e];

                if (entry.file === url && (entry.votes.indexOf(userId) > -1)) {
                    return true;
                }
            }
        }
        return false;
    }

    deleteEntry(userId: number, url: string) {
        alert('NO TAKE BACKS!!');
    }

}
