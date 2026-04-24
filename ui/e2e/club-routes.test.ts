import { expect, test } from "@playwright/test"
import { checkNoConsoleErrors } from "./utils"

test("Club routes load correctly", async ({ page }) => {
  const routes = [
    "/club",
    "/club/ballpark",
    "/club/details",
    "/club/officials",
    "/club/scorer",
    "/club/umpire",
  ]

  for (const route of routes) {
    const consoleErrors = await checkNoConsoleErrors(page)
    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    expect(consoleErrors).toHaveLength(0)
  }
})
