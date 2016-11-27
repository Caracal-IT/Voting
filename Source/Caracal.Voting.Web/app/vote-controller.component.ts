import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VotingService } from './voting.service';
import { HubListener, Vote, VoteResult } from "./model";

@Component({
    templateUrl: 'app/vote-controller.component.html'
})
export class VoteControllerComponent implements OnInit {
    title = 'Caracal Voting';
    voteResults: VoteResult[] = [];
    message = "";
        
    constructor(private service: VotingService) {
    }

    ngOnInit(): void {        
        this.service.start(this);
    }

    continueVoting(): void {
        this.service.continueVoting();
    }

    broadcastMessage(message: string): void {
        this.message = message;
    }

    broadcastVoting(votes: Vote[]): void { }

    broadcastVotingResults(results: VoteResult[]): void {
        this.voteResults = results;
    }

    broadcastWinner(winner: string): void {        
        this.message = `The winner is ${winner}`;
    }
}