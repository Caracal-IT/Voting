import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import './rxjs-extensions';
import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';

import { VotingService } from './voting.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        routedComponents
    ],
    providers: [
        VotingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }