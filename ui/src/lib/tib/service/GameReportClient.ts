import {env} from "$env/dynamic/public";
import {TYPO3Client} from "$lib/tib/service/TYPO3Client.ts";
import type {GameReport} from "$lib/tib/types/GameReport.ts";

export class GameReportClient extends TYPO3Client {
  /**
   * Loads single
   * @param bsmMatchID
   * @throws Error
   */
  public async loadSingleGameReportForBSMMatchID(
    bsmMatchID: string
  ): Promise<GameReport | undefined> {
    const url = this.buildRequestURL("api/v2/gamereports", [["bsmMatchID", bsmMatchID]]);

    if (env.PUBLIC_APPLICATION_CONTEXT === "Development") {
      console.log(url);
    }

    const response = await this.fetch(url, {
      headers: this.HEADERS,
    });

    let gameReport: GameReport | undefined;
    const gameReports: GameReport[] = await response.json();
    if (gameReports && gameReports.length > 0) {
      gameReport = gameReports.at(0);
    }

    return gameReport;
  }
}
