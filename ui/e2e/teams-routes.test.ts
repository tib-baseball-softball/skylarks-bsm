import { expect, test } from "@playwright/test"
import { checkNoConsoleErrors } from "./utils"

test("Teams route loads correctly", async ({ page }) => {
  let response = await page.goto("/teams")
  let consoleErrors = await checkNoConsoleErrors(page)
  expect(response?.status()).toBe(200)
  expect(consoleErrors).toHaveLength(0)

  const teamLink = page.locator('a[href^="/teams/"]').first()
  await expect(teamLink).toBeVisible()

  if ((await teamLink.count()) === 0) {
    console.log("No team links found, skipping test")
    return
  }

  const href = await teamLink.getAttribute("href")
  expect(href).not.toBeNull()

  consoleErrors = await checkNoConsoleErrors(page)
  // @ts-ignore
  response = await page.goto(href)

  expect(response?.status()).toBe(200)
  expect(consoleErrors).toHaveLength(0)
})
