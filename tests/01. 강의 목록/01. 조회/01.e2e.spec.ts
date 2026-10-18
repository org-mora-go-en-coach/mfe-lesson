import { expect, test } from "@playwright/test";

test("1. 강의 목록과 진행률을 표시한다", async ({ page }) => {
  await page.route("**/api/v1.0.2/lessons", route => route.fulfill({json:{lessons:[{id:"intro",title:"자신 있게 소개하기",level:"A1",durationMinutes:12,progress:40}]}}));
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "자신 있게 소개하기" })).toBeVisible();
  await expect(page.getByText("40% 완료")).toBeVisible();
});
