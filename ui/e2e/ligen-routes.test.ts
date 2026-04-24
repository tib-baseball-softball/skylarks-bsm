import { expect, test } from "@playwright/test"
import { checkNoConsoleErrors } from "./utils"

test("Leagues route loads correctly", async ({ page }) => {
  let response = await page.goto("/ligen")
  expect(response?.status()).toBe(200)
  let consoleErrors = await checkNoConsoleErrors(page)
  expect(consoleErrors).toHaveLength(0)

  const leagueLink = page.locator('a[href^="/ligen/"]').first()
  await expect(leagueLink).toBeVisible()

  if ((await leagueLink.count()) === 0) {
    console.log("No league links found, skipping test")
    return
  }

  const href = await leagueLink.getAttribute("href")
  expect(href).not.toBeNull()

  consoleErrors = await checkNoConsoleErrors(page)
  // @ts-ignore
  response = await page.goto(href)

  expect(response?.status()).toBe(200)
  expect(consoleErrors).toHaveLength(0)

  const statsHref = `${href}/stats`
  const statsConsoleErrors = await checkNoConsoleErrors(page)
  const statsResponse = await page.goto(statsHref)

  expect(statsResponse?.status()).toBe(200)
  expect(statsConsoleErrors).toHaveLength(0)
})
