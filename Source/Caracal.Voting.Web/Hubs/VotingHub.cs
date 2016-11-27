using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using System.Linq;

namespace Caracal.Voting.Web.Hubs {
    public class VotingHub : Hub {
        private static readonly List<Vote> votes = new List<Vote>();
        private static readonly List<Vote> currentSession = new List<Vote>();
        private static readonly List<VoteResult> currentResults = new List<VoteResult>();
        private static int currentPosition = 0;

        static VotingHub() {
            ResetSession();
        }

        public void Start() {
            if (currentSession.Count > 0 && currentResults.Count > 0) {
                Clients.Caller.broadcastVoting(currentSession.ToArray());
                Clients.Caller.broadcastVotingResults(currentResults.ToArray());
            }
            else
                Clients.Caller.broadcastMessage("Session has not been started");
        }
        
        public void ContinueVoting() {
            var winner = currentResults.FirstOrDefault(i => i.Percentage >= 50);
            var looser = currentResults.FirstOrDefault(i => i.Percentage <= 50);

            if (looser != null && (winner == null || (winner == looser))) {
                Clients.Caller.broadcastMessage("No winner, please continue the voting");
                return;
            }

            if (looser != null)
                votes.Remove(votes.First(i => i.Text == looser.Text));
            
            if (currentPosition >= votes.Count - 1) 
                currentPosition = 0;
            
            currentSession.Clear();
            currentResults.Clear();

            if (votes.Count == 1) {
                Clients.All.broadcastWinner(votes[0].Text);
                ResetSession();
            }
            else {
                Clients.All.broadcastMessage("");
                currentSession.Add(votes[currentPosition++]);
                currentSession.Add(votes[currentPosition]);
                currentResults.Add(new VoteResult { Text = currentSession[0].Text });
                currentResults.Add(new VoteResult { Text = currentSession[1].Text });
            }

            Clients.All.broadcastVoting(currentSession.ToArray());
            Clients.All.broadcastVotingResults(currentResults.ToArray());
        }

        public void CastVote(string vote) {
            var item = currentResults.FirstOrDefault(i => i.Text == vote);

            if (item != null) {
                item.NumberOfVotes += 1;
                var sum = currentResults.Sum(i => i.NumberOfVotes);

                currentResults.ForEach(i => i.Percentage = (i.NumberOfVotes * 100) / sum);                
            }

            Clients.All.broadcastVotingResults(currentResults.ToArray());
        }
        
        private static void ResetSession() {
            votes.Clear();

            votes.Add(new Vote { Text = "C#" });
            votes.Add(new Vote { Text = "Java" });
            votes.Add(new Vote { Text = "SQL" });
            votes.Add(new Vote { Text = "Python" });
            votes.Add(new Vote { Text = "PHP" });
            votes.Add(new Vote { Text = "JavaScript" });

            currentPosition = 0;
        }
    }
}

public class Vote {
    public string Text { get; set; }
    public bool VotedOut { get; set; }
}

public class VoteResult {
    public string Text { get; set; }
    public int NumberOfVotes { get; set; }
    public int Percentage { get; set; }
    public string Result => Percentage >= 50 ? "success" : "danger";
}