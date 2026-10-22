import type { Locator, Page } from '@playwright/test';

export class TasksPage {
  readonly heading: Locator;
  readonly newTaskInput: Locator;
  readonly addTaskButton: Locator;
  readonly taskItems: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'My tasks' });
    this.newTaskInput = page.getByRole('textbox', { name: 'New task' });
    this.addTaskButton = page.getByRole('button', { name: 'Add task' });
    this.taskItems = page.getByRole('listitem');
  }

  async goto(): Promise<void> {
    await this.page.goto(process.env.BASE_URL || '/');
  }

  async addTask(task: string): Promise<void> {
    await this.newTaskInput.fill(task);
    await this.addTaskButton.click();
  }

  async addTaskWithEnter(task: string): Promise<void> {
    await this.newTaskInput.fill(task);
    await this.newTaskInput.press('Enter');
  }
}
