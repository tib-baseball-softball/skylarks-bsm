import type { LeagueEntry, LeagueGroup, Person } from "bsm.js"

// this data has a custom structure and is therefore project-specific and not in bsm.js
export interface LeaderboardDataset {
  person: Person
  league_entry: LeagueEntry
  rank: number
  value: string | number // Value can be a string or a number depending on the endpoint
}

export interface LeaderboardData {
  league: LeagueGroup
  stats_category: string
  data: LeaderboardDataset[]
}

export interface LeaderboardSummary {
  league_id: string
  stats_type: string
  data: LeaderboardData[]
}
