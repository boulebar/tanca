const pointsNeededForAWin = 7
const minimumScoreForAWin = 0.75

module.exports = {

  calculateScore: function(p1Score, p2Score, p1CurrentRanking, p2CurrentRanking) {
    //calaculates player1 and player2's scores from the points in the game to a value between 1 and 0
    let p1ScoreFactor, p2ScoreFactor = 0

    if (p1Score > p2Score) {
        p1ScoreFactor = minimumScoreForAWin + (p1Score - p2Score - 1.0) * (1 - minimumScoreForAWin) / (pointsNeededForAWin - 1);
        p2ScoreFactor = 1 - p1ScoreFactor;
    }
    else if (p2Score > p1Score) {
        p2ScoreFactor = minimumScoreForAWin + (p2Score - p1Score - 1.0) * (1 - minimumScoreForAWin) / (pointsNeededForAWin - 1);
        p1ScoreFactor = 1 - p2ScoreFactor;
    }
    else {
        p1ScoreFactor = 0.5;
        p2ScoreFactor = 0.5;
    }

    //calculates the expected score(on a scale from 0 to 1) of the game depending on the players mmr.
    const p1EScore = 1 / (1 + Math.pow(10, (p2CurrentRanking - p1CurrentRanking) / 400));
    const p2EScore = 1 - p1EScore;

    //updates the players mmr depending on how well they played compared to their mmr
    const p1Ranking = p1CurrentRanking + 64.0 * (p1ScoreFactor - p1EScore)
    const p2Ranking = p2CurrentRanking + 64.0 * (p2ScoreFactor - p2EScore)

    return { p1Ranking, p2Ranking }
  }
}