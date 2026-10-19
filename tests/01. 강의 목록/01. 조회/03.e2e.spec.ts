import { expect, test } from "@playwright/test";

test("3. AI 채팅 인터페이스를 노출하지 않는다", async ({ page }) => {
  await page.route("**/api/v1.0.2/lessons", (route) =>
    route.fulfill({ json: { lessons: [] } }),
  );
  await page.goto("/");

  await expect(page.getByLabel("Message your English coach")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Send message" })).toHaveCount(
    0,
  );
  await expect(
    page.getByText("How can I help you practice English?"),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "이어서 학습하기" }),
  ).toBeVisible();
});
