import { expect, test } from "@playwright/test"
import { checkNoConsoleErrors } from "./utils"

test("favorites route loads correctly", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("link", { name: "Favorite" })).toBeVisible()
  await page.goto("/favorite")
  await page.getByLabel("Select Team").selectOption("23219")

  let consoleErrors = await checkNoConsoleErrors(page)
  expect(consoleErrors).toHaveLength(0)

  await expect(page.getByRole("heading", { name: "Quick Details" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Team Stats Links" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Team Stats Links" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Data per League" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Graphs and Mood" })).toBeVisible()
})
