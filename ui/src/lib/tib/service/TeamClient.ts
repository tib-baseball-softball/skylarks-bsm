import {TYPO3Client} from "$lib/tib/service/TYPO3Client.ts";
import type {TiBTeam} from "$lib/tib/types/TiBTeam.ts";

export class TeamClient extends TYPO3Client {
  async fetchTeamByFilter(query: TeamQuery): Promise<TiBTeam[] | undefined> {
    const url = this.buildRequestURL("api/v2/teams", query);

    const response: Response = await this.fetch(url, {
      headers: this.HEADERS,
    });

    return await response.json();
  }
}

type TeamQuery = {
  id?: string
  league?: string
}
