import { browser } from "$app/environment"

export class ColorUtility {
  public static SkylarksRed = "#BA0C2F"
  public static SkylarksNavy = "#041E42"
  public static SkylarksSand = "#CEB888"

  public static getDynamicColorNavySand(): string {
    if (browser && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return ColorUtility.SkylarksSand
    } else {
      return ColorUtility.SkylarksNavy
    }
  }
}
