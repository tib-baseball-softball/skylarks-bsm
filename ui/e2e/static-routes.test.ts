import { expect, test } from "@playwright/test"
import { checkNoConsoleErrors } from "./utils"

test("Static routes load correctly", async ({ page }) => {
  const routes = [
    "/aktuelles",
    "/kontakt",
    "/login",
    "/privacy",
    "/signupconfirm",
    "/terms",
    "/legalnotice",
  ]

  for (const route of routes) {
    const consoleErrors = await checkNoConsoleErrors(page)
    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    expect(consoleErrors).toHaveLength(0)
  }
})
