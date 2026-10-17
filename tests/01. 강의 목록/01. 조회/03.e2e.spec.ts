import { expect, test } from "@playwright/test";

test("3. 영어 코치에게 연습 주제를 보내고 답변을 표시한다", async ({ page }) => {
  await page.route("**/api/v1.0.2/lessons", route => route.fulfill({ json: { lessons: [] } }));
  await page.goto("/");

  await page.getByLabel("Message your English coach").fill("Practice ordering coffee");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Practice ordering coffee", { exact: true })).toBeVisible();
  await expect(page.getByText(/Let's practice “Practice ordering coffee” together/)).toBeVisible();
});
