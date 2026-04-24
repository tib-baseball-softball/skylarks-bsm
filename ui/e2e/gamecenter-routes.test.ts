import { expect, test } from "@playwright/test"
import { checkNoConsoleErrors } from "./utils"

test("Gamecenter route loads correctly", async ({ page }) => {
  const consoleErrors = await checkNoConsoleErrors(page)
  const response = await page.goto("/gamecenter")
  expect(response?.status()).toBe(200)
  expect(consoleErrors).toHaveLength(0)
})

test("Gamecenter game detail route loads correctly", async ({ page }) => {
  await page.goto("/gamecenter")

  await page.locator('[data-testid="segment-item-previous"]').click()

  const matchGrid = page.locator('div[data-testid="match-grid"]')
  await expect(matchGrid).toBeVisible()

  const matchLink = page.locator('a[href^="/gamecenter/game-detail/"]').first()
  await expect(matchLink).toBeVisible()

  if ((await matchLink.count()) === 0) {
    console.log("No match links found, skipping test")
    return
  }

  const href = await matchLink.getAttribute("href")
  expect(href).not.toBeNull()

  const consoleErrors = await checkNoConsoleErrors(page)
  // @ts-ignore
  const response = await page.goto(href)

  expect(response?.status()).toBe(200)
  expect(consoleErrors).toHaveLength(0)
})
