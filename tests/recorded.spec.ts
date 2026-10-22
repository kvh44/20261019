import { test, expect } from '@playwright/test';
import { TasksPage } from './pages/TasksPage';

test('adds several tasks using keyboard and button', { tag: ['@tasks', '@regression', '@recorded'] }, async ({ page }) => {
  const tasksPage = new TasksPage(page);
  await tasksPage.goto();

  await tasksPage.addTaskWithEnter('hello');
  await tasksPage.addTask('world');
  await tasksPage.addTask('ni hao');

  await expect(tasksPage.heading).toBeVisible();
  await expect(tasksPage.taskItems).toHaveText(['hello', 'world', 'ni hao']);
});
  
