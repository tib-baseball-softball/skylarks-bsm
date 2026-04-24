import type { Match } from "bsm.js"

export type PlayoffSeriesStatus = "leading" | "tied" | "won"

export type PlayoffSeries = {
  series_games: Match[]
  status: PlayoffSeriesStatus
  teams: {
    [teamName: string]: PlayoffTeam
  }
  leading_team: PlayoffTeam
  trailing_team: PlayoffTeam
  series_length: number
}

export type PlayoffTeam = {
  name: string
  wins: number
}
