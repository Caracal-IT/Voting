/// <reference path="../Scripts/typings/signalr/signalr.d.ts" />
import { Component } from "@angular/core";
import { Vote, VoteResult } from "./Vote";

@Component({
  selector: "my-app",
  template: `<h1>Hello {{name}}</h1>`
})
export class AppComponent {
    name = "Caracal Voting"; 

    proxy: SignalR.Hub.Proxy;


    constructor() {
     
        // creates a new hub connection
        var connection = $.hubConnection("/signalr", { useDefaultPath: false });

        // enabled logging to see in browser dev tools what SignalR is doing behind the scenes
        connection.logging = true;

        // create a proxy
        this.proxy = connection.createHubProxy('chatHub');
        this.proxy.connection.logging = true;

        var self = this;

        $('#sendmessage').click(function () {
            var vote = new Vote();
            vote.Category = $('#displayname').val();
            vote.Item = $('#message').val();

            self.proxy.invoke("Send", vote);
        });



        this.proxy.on("hallo",function(name, message) {
            var encodedName = $('<div />').text(name).html();
            var encodedMsg = $('<div />').text(message).html();
            // Add the message to the page.
            $('#discussion').html('<li><strong>' + encodedName
                + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
        });
        

        this.proxy.on("broadcastMessage", (votes: VoteResult[]) => {
            try {
                $('#discussion').html("");

                for (var vote of votes) {
                    // Html encode display name and message.
                    var encodedName = $('<div />').text(vote.Category).html();
                    var encodedMsg = $('<div />').text(vote.Item + " - " + vote.NumberOfVotes).html();
                    // Add the message to the page.
                    $('#discussion').append('<li><strong>' + encodedName + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');    
                }
            } catch (excetion) {
                alert(excetion.message);
            }
        });


        $(function() {
            // start connection
            connection.start().done(function () {
                self.proxy.invoke("AfterConnected", $('#displayname').val());
            });
        });

        

    }


}