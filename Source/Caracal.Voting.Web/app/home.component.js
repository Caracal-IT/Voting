"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var voting_service_1 = require("./voting.service");
var HomeComponent = (function () {
    function HomeComponent(service) {
        this.service = service;
        this.title = "Live Voting";
        this.message = "";
        this.votes = [];
        this.voteResults = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.hasVoted = false;
        this.service.start(this);
    };
    HomeComponent.prototype.broadcastMessage = function (message) {
        this.message = message;
    };
    HomeComponent.prototype.broadcastVoting = function (votes) {
        this.hasVoted = false;
        this.votes = votes;
    };
    HomeComponent.prototype.broadcastVotingResults = function (results) {
        this.voteResults = results;
    };
    HomeComponent.prototype.broadcastWinner = function (winner) {
        this.message = "The winner is " + winner;
    };
    HomeComponent.prototype.castVote = function (vote) {
        this.service.castVote(vote);
        this.hasVoted = true;
    };
    HomeComponent = __decorate([
        core_1.Component({
            templateUrl: "app/home.component.html"
        }), 
        __metadata('design:paramtypes', [voting_service_1.VotingService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map