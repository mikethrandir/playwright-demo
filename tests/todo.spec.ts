import { test, expect } from '@playwright/test';

test.describe('TodoMVC', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');
  });

  test('should display the application heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  });

  test('should add a todo item', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Learn Playwright');
    await todoInput.press('Enter');

   const todoItem = page.locator('.todo-list li')
  .filter({ hasText: 'Learn Playwright' });

await expect(todoItem).toBeVisible();
    await expect(todoInput).toBeEmpty();
  });

  test('should mark a todo item as completed', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Practice assertions');
    await todoInput.press('Enter');

    const todoItem = page.locator('.todo-list li').filter({ hasText: 'Practice assertions' });
    await todoItem.getByRole('checkbox').check();

    await expect(todoItem).toHaveClass(/completed/);
  });

  test('should clear completed todo items', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Remove this completed task');
    await todoInput.press('Enter');

    const todoItem = page.locator('.todo-list li').filter({ hasText: 'Remove this completed task' });
    await todoItem.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Clear completed' }).click();

    await expect(todoItem).toHaveCount(0);
  });
});