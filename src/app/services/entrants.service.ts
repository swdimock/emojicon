import { Injectable } from '@angular/core';

@Injectable()
export class EntrantsService {

    public maxVotes = 5;
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
            name: 'Nick',
            entries: [
                {
                    file: 'https://media.giphy.com/media/l3V0bMLX1oJhnWeNG/giphy.gif',
                    votes: [1]
                },
                {
                    file: 'https://media.giphy.com/media/xT0xeOz9FBhOaUvwWI/giphy.gif',
                    votes: []
                }
            ]
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

    /**
     * Get a list of all entrants
     *
     * @returns {Promise<any>}
     */
    getEntrants(): Promise<any> {
        return Promise.resolve(this.entrants);
    }

    /**
     * Get data for a single entrant
     *
     * @param userId
     * @returns {any}
     */
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

    /**
     * Return all entries
     *
     * @param {boolean} skipSelf
     * @returns {Promise<any>}
     */
    getEntries(userId): Promise<any> {

        const entries = [];

        // Loop through the entrants
        for (const e in Object.keys(this.entrants)) {
            if (this.entrants.hasOwnProperty(e)) {
                const entrant = this.entrants[e];

                // Loop through each entrant's entry
                for (const l in entrant.entries) {
                    if (entrant.entries.hasOwnProperty(l)) {
                        const entry = entrant.entries[l];

                        // Only include entries that are not submitted by the current user
                        if (entrant.id === Number(userId)) {
                            continue;
                        }

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

    /**
     * Add a new entry to the user's entry object
     *
     * @param {number} userId
     * @param {string} url
     */
    recordEntry(userId: number, url: string) {

        const entrant: any = this.getEntrant(userId);

        if (!entrant) {
            return;
        }

        entrant.entries.unshift({
            file: url,
            votes: []
        });
    }

    /**
     * Increment the vote count for a given entry
     *
     * @param {number} userId
     * @param {string} url
     */
    toggleVote(userId: number, url: string) {

        const entrant = this.getEntrant(userId);
        const maxEntries = this.maxNumEntries(userId);

        if (!entrant) {
            return;
        }

        for (const e in entrant.entries) {
            if (entrant.entries.hasOwnProperty(e)) {
                const entry = entrant.entries[e];

                if (!entry.file) {
                    continue;
                }

                if (entry.file === url) {
                    if (!(entry.votes.indexOf(userId) > -1)) {
                        if (!maxEntries) {
                            entry.votes.push(userId);
                        }
                    } else {
                        const u = entry.votes.indexOf(userId);
                        entry.votes.splice(u, 1);
                    }
                    break;
                }
            }
        }
    }

    /**
     * Return boolean whether max number of votes has been reached
     *
     * @param {number} userId
     * @returns {boolean}
     */
    maxNumEntries(userId: number) {

        let votes = 0;

        for (const e in this.entrants) {
            if (this.entrants.hasOwnProperty(e)) {
                const entrant = this.entrants[e];

                if (typeof entrant.entries !== 'undefined') {
                    for (const f in entrant.entries) {

                        if (entrant.entries.hasOwnProperty(f)) {
                            const entries = entrant.entries[f];

                            if (typeof entries.votes !== 'undefined' && entries.votes.indexOf(userId) > -1) {
                                votes++;
                            }
                        }
                    }
                }
            }
        }
        return votes >= this.maxVotes;
    }

    /**
     * Counts the number of overall votes recorded
     *
     * @returns {number}
     */
    totalNumVotes() {

        let votes = 0;

        for (const e in this.entrants) {
            if (this.entrants.hasOwnProperty(e)) {
                const entrant = this.entrants[e];

                if (typeof entrant.entries !== 'undefined') {
                    for (const f in entrant.entries) {

                        if (entrant.entries.hasOwnProperty(f)) {
                            const entries = entrant.entries[f];

                            if (typeof entries.votes !== 'undefined') {
                                votes += entries.votes.length;
                            }
                        }
                    }
                }
            }
        }
        return votes;
    }

    /**
     * Check whether the maximum number of votes have been reached
     *
     * @returns {boolean}
     */
    totalVotesReached() {

        const entrants = this.entrants.length;
        const max = entrants * this.maxVotes;

       return max <= Number(this.totalNumVotes());
    }

    /**
     * Identify whether the given entry is selected
     *
     * @param {number} userId
     * @param {string} url
     * @returns {boolean}
     */
    isEntrySelected(userId: number, url: string) {

        const entrant = this.getEntrant(userId);

        if (!entrant) {
            return;
        }

        for (const e in entrant.entries) {
            if (entrant.entries.hasOwnProperty(e)) {
                const entry = entrant.entries[e];

                if (
                    entry.file === url &&
                    typeof entry.votes !== 'undefined' &&
                    (entry.votes.indexOf(userId) > -1)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Remove an entry from the user's entry object.
     *
     * @param {number} userId
     * @param {string} url
     */
    deleteEntry(userId: number, url: string) {

        if (confirm('Sure about that?')) {

            const entrant = this.getEntrant(userId);
            console.log(entrant);

            if (!entrant) {
                return;
            }

            for (const e in entrant.entries) {
                if (entrant.entries.hasOwnProperty(e)) {
                    const entry = entrant.entries[e];

                    if (!entry.file) {
                        continue;
                    }

                    if (entry.file === url && !(entry.votes.indexOf(userId) > -1)) {
                        entrant.entries.splice(+e, 1);
                        break;
                    }
                }
            }
        }
    }

}
