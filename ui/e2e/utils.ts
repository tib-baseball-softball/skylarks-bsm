import { type Page } from "@playwright/test"

export async function checkNoConsoleErrors(page: Page) {
  const consoleErrors: string[] = []

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text())
    }
  })

  return consoleErrors
}
