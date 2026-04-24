export class LeaderboardUtility {
  static statNames: Record<string, string> = {
    runs: "Runs",
    runs_batted_in: "Runs Batted In",
    hits: "Hits",
    doubles: "Doubles",
    triples: "Triples",
    homeruns: "Home Runs",
    strikeouts: "Strikeouts",
    base_on_balls: "Base on Balls",
    hit_by_pitches: "Hit by Pitches",
    stolen_bases: "Stolen Bases",
    caught_stealings: "Caught Stealings",
    batting_average: "Batting Average",
    on_base_percentage: "On-Base Percentage",
    slugging_percentage: "Slugging Percentage",
    on_base_plus_slugging: "On-Base Plus Slugging",
    assists: "Assists",
    putouts: "Putouts",
    errors: "Errors",
    fielding_average: "Fielding Average",
    double_plays: "Double Plays",
    triple_plays: "Triple Plays",
    passed_balls: "Passed Balls",
    games: "Games",
    complete_games: "Complete Games",
    innings_pitched: "Innings Pitched",
    batters_faced: "Batters Faced",
    earned_runs: "Earned Runs",
    base_on_balls_allowed: "Base on Balls Allowed",
    hit_by_pitches_allowed: "Hit by Pitches Allowed",
    wild_pitches: "Wild Pitches",
    wins: "Wins",
    losses: "Losses",
    saves: "Saves",
    earned_runs_average: "Earned Run Average",
    walks_and_hits_per_innings_pitched: "Walks and Hits Per Innings Pitched",
  }

  public static getHumanReadableStatName(stat: string): string {
    return LeaderboardUtility.statNames[stat] || "Unknown Stat"
  }
}
