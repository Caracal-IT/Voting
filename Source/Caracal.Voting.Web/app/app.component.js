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
var core_1 = require("@angular/core");
var Vote_1 = require("./Vote");
var AppComponent = (function () {
    function AppComponent() {
        this.name = "Caracal Voting";
        // creates a new hub connection
        var connection = $.hubConnection("/signalr", { useDefaultPath: false });
        // enabled logging to see in browser dev tools what SignalR is doing behind the scenes
        connection.logging = true;
        // create a proxy
        this.proxy = connection.createHubProxy('chatHub');
        this.proxy.connection.logging = true;
        var self = this;
        $('#sendmessage').click(function () {
            var vote = new Vote_1.Vote();
            vote.Category = $('#displayname').val();
            vote.Item = $('#message').val();
            self.proxy.invoke("Send", vote);
        });
        this.proxy.on("hallo", function (name, message) {
            var encodedName = $('<div />').text(name).html();
            var encodedMsg = $('<div />').text(message).html();
            // Add the message to the page.
            $('#discussion').html('<li><strong>' + encodedName
                + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
        });
        this.proxy.on("broadcastMessage", function (votes) {
            try {
                $('#discussion').html("");
                for (var _i = 0, votes_1 = votes; _i < votes_1.length; _i++) {
                    var vote = votes_1[_i];
                    // Html encode display name and message.
                    var encodedName = $('<div />').text(vote.Category).html();
                    var encodedMsg = $('<div />').text(vote.Item + " - " + vote.NumberOfVotes).html();
                    // Add the message to the page.
                    $('#discussion').append('<li><strong>' + encodedName + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
                }
            }
            catch (excetion) {
                alert(excetion.message);
            }
        });
        $(function () {
            // start connection
            connection.start().done(function () {
                self.proxy.invoke("AfterConnected", $('#displayname').val());
            });
        });
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "<h1>Hello {{name}}</h1>"
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map