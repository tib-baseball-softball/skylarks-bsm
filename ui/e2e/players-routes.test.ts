import { expect, test } from "@playwright/test"
import { checkNoConsoleErrors } from "./utils"

test("Players route loads correctly", async ({ page }) => {
  let response = await page.goto("/teams")
  let consoleErrors = await checkNoConsoleErrors(page)
  expect(response?.status()).toBe(200)
  expect(consoleErrors).toHaveLength(0)

  const teamLink = page.locator('a[href^="/teams/"]').last()
  await expect(teamLink).toBeVisible()

  let href = await teamLink.getAttribute("href")
  // @ts-ignore
  response = await page.goto(href)

  const playerSection = page.locator('[data-testid="team-players-section"]').first()
  await expect(playerSection).toBeVisible()

  if ((await playerSection.count()) === 0) {
    console.log("No player links found, skipping test")
    return
  }

  href = await playerSection.getAttribute("href")
  await expect(href).not.toBeNull()

  consoleErrors = await checkNoConsoleErrors(page)
  // @ts-ignore
  response = await page.goto(href)

  expect(response?.status()).toBe(200)
  expect(consoleErrors).toHaveLength(0)
})
