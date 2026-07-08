import { test, expect } from "@playwright/test";

/**
 * Drives the real Lightbox (src/components/gallery/Lightbox.tsx) in a
 * browser against the family gallery page (cs, default locale, unprefixed
 * per localePrefix: "as-needed"). Closes a verification gap: focus trap,
 * Escape-restore, and background-inert were previously only verified by
 * static code reading.
 */
test.describe("Lightbox keyboard flow", () => {
  test("Tab-traps focus, marks background inert, and restores focus on close", async ({
    page,
  }) => {
    await page.goto("/gallery/family/");

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeHidden();

    // Open the lightbox from the first thumbnail.
    const firstThumb = page.getByRole("button", { name: /^Otevřít:/ }).first();
    await firstThumb.focus();
    await firstThumb.click();

    await expect(dialog).toBeVisible();

    const closeButton = page.getByRole("button", { name: "Zavřít lightbox" });
    const prevButton = page.getByRole("button", { name: "Předchozí fotografie" });
    const nextButton = page.getByRole("button", { name: "Další fotografie" });

    // On open, focus moves into the dialog (to the close button).
    await expect(closeButton).toBeFocused();

    // Background siblings of the dialog become inert while it's open — the
    // header (a fixed sibling of the portal target) must be unreachable.
    const header = page.locator("body > header").first();
    if ((await header.count()) > 0) {
      await expect(header).toHaveJSProperty("inert", true);
    }

    // Every top-level sibling of the dialog under <body> should be inert,
    // and the dialog itself must not be.
    const inertStates = await page.evaluate(() => {
      const dialogEl = document.querySelector('[role="dialog"]');
      return Array.from(document.body.children).map((el) => ({
        isDialog: el === dialogEl,
        inert: (el as HTMLElement).inert,
      }));
    });
    for (const { isDialog, inert } of inertStates) {
      expect(inert).toBe(!isDialog);
    }

    // Tab forward through the 3 buttons: close -> prev -> next -> (wraps) close.
    await page.keyboard.press("Tab");
    await expect(prevButton).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(nextButton).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(closeButton).toBeFocused(); // wrapped back to the first focusable

    // Shift+Tab backward: from close -> wraps to next (the last focusable).
    await page.keyboard.press("Shift+Tab");
    await expect(nextButton).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(prevButton).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(closeButton).toBeFocused(); // wrapped back to the last focusable

    // Escape closes the lightbox and restores focus to the originating thumbnail.
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(firstThumb).toBeFocused();

    // inert is removed from background siblings after close.
    const inertAfterClose = await page.evaluate(() =>
      Array.from(document.body.children).every((el) => (el as HTMLElement).inert === false),
    );
    expect(inertAfterClose).toBe(true);
  });

  test("clicking the close button also restores focus to the originating thumbnail", async ({
    page,
  }) => {
    await page.goto("/gallery/family/");

    const thumbs = page.getByRole("button", { name: /^Otevřít:/ });
    const secondThumb = thumbs.nth(1);
    await secondThumb.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await page.getByRole("button", { name: "Zavřít lightbox" }).click();

    await expect(dialog).toBeHidden();
    await expect(secondThumb).toBeFocused();
  });
});
