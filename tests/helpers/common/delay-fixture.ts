import { test as base } from '@playwright/test';

export const test = base.extend({
  // Add a delay before each test
  beforeEach: async ({}, use) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    await use();
  },
});

export const expect = base.expect;
