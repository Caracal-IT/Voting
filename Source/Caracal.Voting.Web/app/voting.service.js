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
/// <reference path="../Scripts/typings/signalr/signalr.d.ts" />
var core_1 = require('@angular/core');
var VotingService = (function () {
    function VotingService() {
    }
    VotingService.prototype.start = function (listener) {
        var self = this;
        var connection = $.hubConnection("/signalr", { useDefaultPath: false });
        connection.logging = true;
        this.proxy = connection.createHubProxy('votingHub');
        this.proxy.connection.logging = true;
        this.proxy.on("broadcastMessage", function (message) { return listener.broadcastMessage(message); });
        this.proxy.on("broadcastVoting", function (votes) { return listener.broadcastVoting(votes); });
        this.proxy.on("broadcastVotingResults", function (results) { return listener.broadcastVotingResults(results); });
        this.proxy.on("broadcastWinner", function (winner) { return listener.broadcastWinner(winner); });
        connection.start().done(function () {
            self.proxy.invoke("Start");
        });
    };
    VotingService.prototype.continueVoting = function () {
        this.proxy.invoke("ContinueVoting");
    };
    VotingService.prototype.castVote = function (vote) {
        this.proxy.invoke("CastVote", vote);
    };
    VotingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], VotingService);
    return VotingService;
}());
exports.VotingService = VotingService;
//# sourceMappingURL=voting.service.js.map