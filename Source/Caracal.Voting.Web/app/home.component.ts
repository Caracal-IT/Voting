import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VotingService } from "./voting.service";
import { HubListener, Vote, VoteResult } from "./model";

@Component({
    templateUrl: "app/home.component.html"
})
export class HomeComponent implements OnInit, HubListener {
    title = "Live Voting";
    message = "";
    votes: Vote[] = [];
    voteResults: VoteResult[] = [];
    hasVoted: boolean;

    constructor(private service: VotingService) {
    }

    ngOnInit(): void {
        this.hasVoted = false;        
        this.service.start(this);
    }

    broadcastMessage(message: string): void {
        this.message = message;
    }

    broadcastVoting(votes: Vote[]): void {        
        this.hasVoted = false; 

        this.votes = votes;
    }

    broadcastVotingResults(results: VoteResult[]): void {
        this.voteResults = results;
    }

    broadcastWinner(winner: string): void {
        this.message = `The winner is ${winner}`;
    }

    castVote(vote: string) {    
        this.service.castVote(vote);    
        this.hasVoted = true;
    }
}