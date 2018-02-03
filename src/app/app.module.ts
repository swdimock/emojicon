import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule, MatInputModule, MatButtonModule } from '@angular/material';

import { AppRoutingModule } from './modules/app-routing.module';

import { AppComponent } from './app.component';
import { EntrantsService } from './services/entrants.service';
import { SlackService } from './services/slack.service';

import { LoginComponent } from './steps/login.component';
import { EntryComponent } from './steps/entry.component';
import { VoteComponent } from './steps/vote.component';
import { TabulateComponent } from './steps/tabulate.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        EntryComponent,
        VoteComponent,
        TabulateComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule
    ],
    providers: [EntrantsService, SlackService],
    bootstrap: [AppComponent]
})
export class AppModule { }
