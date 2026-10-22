import { test, expect } from '@playwright/test';
import { TasksPage } from './pages/TasksPage';

test('adds a task and clears the input', async ({ page }) => {
  const tasksPage = new TasksPage(page);
  await tasksPage.goto();

  await expect(tasksPage.page).toHaveTitle('Playwright practice');
  await tasksPage.addTask('Learn Playwright codegen');
  await expect(tasksPage.taskItems).toHaveText(['Learn Playwright codegen']);
  await expect(tasksPage.newTaskInput).toBeEmpty();
});

test('rejects blank tasks and supports keyboard submission', async ({ page }) => {
  const tasksPage = new TasksPage(page);
  await tasksPage.goto();

  await tasksPage.addTask('   ');
  await expect(tasksPage.taskItems).toHaveCount(0);
  await tasksPage.addTaskWithEnter('Run TypeScript tests');
  await expect(tasksPage.taskItems).toHaveText(['Run TypeScript tests']);
});
