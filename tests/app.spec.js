const { test, expect } = require("@playwright/test");

const scenarios = [
  { id: "ideal", label: "Ideal corner" },
  { id: "entry-speed", label: "Too much entry speed" },
  { id: "early-turn", label: "Turn-in too early" },
  { id: "early-throttle", label: "Throttle too early" }
];

test.describe("NASCAR Corner Coach", () => {
  test("loads without page errors and renders the main teaching UI", async ({ page }) => {
    const pageErrors = [];
    const consoleErrors = [];

    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");
    await expect(page.getByRole("heading", { name: "NASCAR Corner Coach" })).toBeVisible();
    await expect(page.locator("#canvas-holder canvas")).toBeVisible();
    await expect(page.locator("#scenario-title")).toHaveText("Ideal corner");
    await expect(page.locator("#phase-badge")).toContainText(/Entry|Center|Exit/);
    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test("playback controls and scenario switching work", async ({ page }) => {
    await page.goto("/");

    const playbackTime = page.locator("#playback-time");
    const playPause = page.locator("#play-pause");
    const restart = page.locator("#restart");
    const scenarioSelect = page.locator("#scenario-select");
    const title = page.locator("#scenario-title");

    const firstTime = await playbackTime.textContent();
    await page.waitForTimeout(1200);
    const secondTime = await playbackTime.textContent();
    expect(secondTime).not.toBe(firstTime);

    await playPause.click();
    const pausedTime = await playbackTime.textContent();
    await page.waitForTimeout(1200);
    await expect(playbackTime).toHaveText(pausedTime);

    await restart.click();
    await expect(playbackTime).toHaveText(/0\.0s|0\.1s/);

    await scenarioSelect.selectOption("entry-speed");
    await expect(title).toHaveText("Too much entry speed");
    await expect(page).toHaveURL(/scenario=entry-speed/);

    await playPause.click();
    await page.waitForTimeout(600);
    await expect(page.locator("#coaching-panel")).toContainText("What the driver did");
  });

  for (const scenario of scenarios) {
    test(`scenario ${scenario.id} renders teaching content`, async ({ page }) => {
      await page.goto(`/?scenario=${scenario.id}`);
      await expect(page.locator("#scenario-title")).toHaveText(scenario.label);
      await expect(page.locator("#coaching-panel")).toContainText("What the driver did");
      await expect(page.locator("#coaching-panel")).toContainText("What the car did");
      await expect(page.locator("#coaching-panel")).toContainText("Why");
      await expect(page.locator("#coaching-panel")).toContainText("What to change");
      await expect(page.locator("#steering-value")).not.toHaveText("0%");
      await expect(page.locator("#throttle-value")).not.toHaveText("0%");
    });
  }

  test("mobile viewport keeps controls accessible", async ({ browser }) => {
    const page = await browser.newPage({ viewport: { width: 430, height: 932 } });
    await page.goto("http://127.0.0.1:4173/");
    await expect(page.getByRole("heading", { name: "NASCAR Corner Coach" })).toBeVisible();
    await expect(page.locator("#scenario-select")).toBeVisible();
    await expect(page.locator("#play-pause")).toBeVisible();
    await expect(page.locator("#canvas-holder canvas")).toBeVisible();
    await page.close();
  });
});
