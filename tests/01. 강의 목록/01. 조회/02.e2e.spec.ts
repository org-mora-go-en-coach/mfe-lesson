import { expect, test } from "@playwright/test";

test("2. 강의 API 오류를 표시한다", async ({ page }) => {
  await page.route("**/api/v1.0.2/lessons", route => route.fulfill({status:503,json:{error:"unavailable"}}));
  await page.goto("/");
  await expect(page.getByText("Lessons are unavailable (503)." )).toBeVisible();
});
