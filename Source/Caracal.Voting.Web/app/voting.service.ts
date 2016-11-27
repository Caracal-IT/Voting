/// <reference path="../Scripts/typings/signalr/signalr.d.ts" />
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HubListener, Vote, VoteResult } from "./model";

@Injectable()
export class VotingService {
    proxy: SignalR.Hub.Proxy;
    
    start(listener: HubListener) {        
        var self = this;

        var connection = $.hubConnection("/signalr", { useDefaultPath: false });    
        connection.logging = true;
                        
        this.proxy = connection.createHubProxy('votingHub');
        this.proxy.connection.logging = true;
        
        this.proxy.on("broadcastMessage", (message: string) => listener.broadcastMessage(message));
        this.proxy.on("broadcastVoting", (votes: Vote[]) => listener.broadcastVoting(votes));
        this.proxy.on("broadcastVotingResults", (results: VoteResult[]) => listener.broadcastVotingResults(results));
        this.proxy.on("broadcastWinner", (winner: string) => listener.broadcastWinner(winner));
        
        connection.start().done(() => {
            self.proxy.invoke("Start");
        });        
    }

    continueVoting() {
        this.proxy.invoke("ContinueVoting");
    }


    castVote(vote: string) {
        this.proxy.invoke("CastVote", vote);
    }
}