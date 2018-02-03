import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../steps/login.component';
import { EntryComponent } from '../steps/entry.component';
import { VoteComponent } from '../steps/vote.component';
import { TabulateComponent } from '../steps/tabulate.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'entry/:id',
        component: EntryComponent
    },
    {
        path: 'tabulate',
        component: TabulateComponent
    },
    {
        path: 'vote/:id',
        component: VoteComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
