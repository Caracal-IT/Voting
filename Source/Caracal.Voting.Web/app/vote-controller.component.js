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
var voting_service_1 = require('./voting.service');
var VoteControllerComponent = (function () {
    function VoteControllerComponent(service) {
        this.service = service;
        this.title = 'Caracal Voting';
        this.voteResults = [];
        this.message = "";
    }
    VoteControllerComponent.prototype.ngOnInit = function () {
        this.service.start(this);
    };
    VoteControllerComponent.prototype.continueVoting = function () {
        this.service.continueVoting();
    };
    VoteControllerComponent.prototype.broadcastMessage = function (message) {
        this.message = message;
    };
    VoteControllerComponent.prototype.broadcastVoting = function (votes) { };
    VoteControllerComponent.prototype.broadcastVotingResults = function (results) {
        this.voteResults = results;
    };
    VoteControllerComponent.prototype.broadcastWinner = function (winner) {
        this.message = "The winner is " + winner;
    };
    VoteControllerComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/vote-controller.component.html'
        }), 
        __metadata('design:paramtypes', [voting_service_1.VotingService])
    ], VoteControllerComponent);
    return VoteControllerComponent;
}());
exports.VoteControllerComponent = VoteControllerComponent;
//# sourceMappingURL=vote-controller.component.js.map