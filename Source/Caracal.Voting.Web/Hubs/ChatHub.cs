using System;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Collections.Generic;

namespace Caracal.Voting.Web.Hubs {
    public class ChatHub : Hub {
        public static Dictionary<string, int> votingResults;


        static ChatHub() {
            votingResults = new Dictionary<string, int> {{"Ettiene", 0}};
        }

        public void AfterConnected(string name) {
            var voteResults = new List<VoteResult>();
            voteResults.Add(new VoteResult { Category = name, Item = "Item 1", NumberOfVotes = 3 });
            voteResults.Add(new VoteResult { Category = name, Item = "Item 2", NumberOfVotes = 5 });

            Clients.Caller.broadcastMessage(voteResults.ToArray());
        }

        /*public void Send(string name, string message) {
            votingResults[name] = votingResults[name] + 1;
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message + "  " + votingResults[name]);
        }*/

        public void Send(Vote vote) {
            votingResults[vote.Category] = votingResults[vote.Category] + 1;
            // Call the broadcastMessage method to update clients.

            var random = new Random(System.DateTime.Now.Millisecond);

            var voteResults = new List<VoteResult>();
            voteResults.Add(new VoteResult { Category = vote.Category, Item = "Item 1", NumberOfVotes = random.Next(0, 100) });
            voteResults.Add(new VoteResult { Category = vote.Category, Item = "Item 2", NumberOfVotes = random.Next(0, 100) });

            Clients.All.broadcastMessage(voteResults.ToArray());
        }
    }

    public struct Vote {
        public string Category { get; set; }
        public string Item { get; set; }
    }

    public struct VoteResult {
        public string Category { get; set; }
        public string Item { get; set; }

        public int NumberOfVotes { get; set; }
    }
}