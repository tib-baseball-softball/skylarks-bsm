import type {LeagueGroup} from "bsm.js";
import type {Extension} from "$lib/dp/types/ExpandedResponse.ts";
import type {Media} from "$lib/dp/types/MediaData.ts";

export interface GameReport {
  uid: number;
  author: string;
  game_id: string;
  league: CachedLeagueGroup;
  game_toggle: "SG" | "DH";
  teaser_text: string;
  introduction: string;
  report_first: string;
  report_second?: string | null;
  preview?: string;
  teaser_image: Media[];
  header_image?: Media[];
  gallery?: Media[] | null;
  date: string; // ISO 8601 date-time format
  title: string;
  team: number;
  slug: string;
}

type CachedLeagueGroup = Extension<
  Pick<LeagueGroup, "acronym" | "name" | "season">,
  {
    league_id: number
  }
>
