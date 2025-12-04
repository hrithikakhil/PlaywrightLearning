// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30*1000, //timeout to run entire test
  expect: {
    timeout: 40*1000, //timeout set for assertion [Expect]
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on', //Helps to take SS ata every step
    trace: 'retain-on-failure' // Helps to log every step, helps in debugging
  },
});

