import { expect, test } from "@playwright/test"

test("test", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("h1")).toBeVisible()
  await page.getByRole("heading", { name: "Diamond Planner" }).click()
  await page.getByText("Previous Gameday").click()
  await page.getByText("Previous Gameday").click()
  await page.getByText("Current Gameday").click()
  await page.locator("button").filter({ hasText: "Next Gameday" }).click()
  await page.getByRole("link", { name: "Terms & Conditions" }).click()
  await page.getByRole("heading", { name: "Nutzungsbedingungen für die" }).click()
  await page.getByRole("link", { name: "Impressum" }).click()
  await page.getByRole("link", { name: "Datenschutzerklärung" }).click()
  const page1Promise = page.waitForEvent("popup")
  await page.getByRole("link", { name: "to Skylarks Facebook page" }).click()
  const page1 = await page1Promise
  const page2Promise = page.waitForEvent("popup")
  await page.getByRole("link", { name: "to Skylarks Instagram profile" }).click()
  const page2 = await page2Promise
  const page3Promise = page.waitForEvent("popup")
  await page.getByRole("link", { name: "to Turngemeinde in Berlin" }).click()
  const page3 = await page3Promise
  await page.getByRole("link", { name: "to home page" }).click()
  await page.locator("#Hero").click()
})
