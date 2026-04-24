import type {Match} from "bsm.js";
import {DateTimeUtility} from "$lib/dp/service/DateTimeUtility.ts";
import {toastController} from "$lib/dp/service/ToastController.svelte.ts";

export class ShareUtility {
  public shareGame(game: Match, locale = "en-US"): void {
    const shareData: ShareData = {
      text: this.createShareGameData(game, locale),
    };

    if (this.shareDataIsSupported(shareData)) {
      navigator
          .share(shareData)
          .then(() =>
              toastController.trigger({
                message: "Game Data shared successfully",
                background: "preset-filled-success-500",
              })
          )
          .catch((e: Error) => this.handleError(e));
    }
  }

  private handleError(error: Error) {
    console.error(error);
    toastController.trigger({
      message: "Sharing unsuccessful: Error occurred or user cancelled request.",
      background: "preset-filled-warning-500",
    });
  }

  private shareDataIsSupported(shareData: ShareData): boolean {
    if (!navigator.canShare) {
      toastController.trigger({
        message: "Web Share API not available",
        background: "preset-filled-error-500",
      });
      return false;
    }

    if (!navigator.canShare(shareData)) {
      toastController.trigger({
        message: "Share data unsupported, disallowed, or invalid",
        background: "preset-filled-error-500",
      });
      return false;
    }
    return true;
  }

  private createShareGameData(game: Match, locale = "en-US"): string {
    const dateFormatter = new Intl.DateTimeFormat(locale, {dateStyle: "short"});
    const timeFormatter = new Intl.DateTimeFormat(locale, {timeStyle: "short"});

    const rawDate = DateTimeUtility.parseDateFromBSMString(game.time);
    let date = "date";
    let time = "time";

    if (rawDate) {
      const d = new Date(rawDate);
      if (!Number.isNaN(d.getTime())) {
        date = dateFormatter.format(d);
        time = timeFormatter.format(d);
      }
    }

    const awayRuns = game.away_runs ?? 0;
    const homeRuns = game.home_runs ?? 0;

    const fieldName = game.field?.name ?? "No data";
    const street = game.field?.street ?? "";
    const postal = game.field?.postal_code ?? "";
    const city = game.field?.city ?? "";

    const scoresheet = game.scoresheet_url ?? "Not available yet";

    return [
      "Game data - sent from Skylarks app",
      "",
      `League: ${game.league?.name ?? ""}`,
      `Match Number: ${game.match_id}`,
      `Date: ${date}`,
      `Time: ${time}`,
      "",
      `Status: ${game.human_state}`,
      `Road Team: ${game.away_team_name} - ${awayRuns}`,
      `Home Team: ${game.home_team_name} - ${homeRuns}`,
      "",
      `Field: ${fieldName}`,
      `Address: ${street}, ${postal} ${city}`.trim(),
      "",
      `Link to Scoresheet: ${scoresheet}`,
    ].join("\n");
  }
}
