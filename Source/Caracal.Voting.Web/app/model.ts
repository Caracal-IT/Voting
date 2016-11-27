export interface HubListener {
    broadcastMessage(message: string): void;
    broadcastVoting(votes: Vote[]): void;
    broadcastVotingResults(results: VoteResult[]): void;
    broadcastWinner(winner: string): void;
}

export class Vote {    
    Text: string;
    VotedOut: boolean;      
}

export class VoteResult {
    Text: string;
    NumberOfVotes: number;
    Percentage: number;
    Result: string;
}