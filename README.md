# Puppeteer Navigation Tracker

This project uses Puppeteer to monitor browser navigation events and evaluate whether the user visits specific relevant pages (e.g., checkout or thank-you pages). It also identifies the browser being used based on the `userAgent` string.

## Dependencies and Installation

### Required Packages

- **Node.js**: Ensure you have Node.js installed (version 16.x or higher is recommended).
- **Puppeteer**: Puppeteer is the main library used to automate the browser.

### Installation Steps

1. Clone this repository or copy the script file into your local machine.
2. Navigate to the project directory in your terminal.
3. Run the following command to initialize the project and install Puppeteer:

   ```bash
   npm init -y
   npm install puppeteer
   ```

## Running the Project

1. Make sure you are in the project directory.
2. Execute the script using Node.js:

   ```bash
   node detect-browser.js
   ```

3. The script will open a browser window and navigate to `https://elgeniox.com/`. It will then wait for navigation events to detect specific pages (e.g., checkout or thank-you pages).

## Project Logic

### Key Functionalities

1. **Browser Launch**:
   - The script launches a Chromium browser in non-headless mode using Puppeteer.
   - A new browser page is opened and navigates to the initial URL (`https://elgeniox.com/`).

2. **Navigation Detection**:
   - The `page.on("framenavigated")` event listener monitors navigation events in the browser.
   - For each navigation event, it checks whether the URL matches patterns for relevant pages (e.g., containing `checkouts` or `thank_you`).

3. **Page Evaluation**:
   - Once a relevant page is detected, the script waits for the DOM to fully load using `frame.waitForSelector("body")`.
   - It evaluates the page content to confirm it is a checkout-related page by searching for keywords such as `"Pedido #"`, `"Detalles del pedido"`, or `"Métodos de pago"`.

4. **Browser Detection**:
   - The script extracts the `userAgent` from the browser and determines the browser type (e.g., Chromium, Google Chrome, Safari) using regular expressions.

5. **Program Completion**:
   - If a relevant page is detected, the browser instance is closed, and a log message indicates that the program has completed successfully.

### Error Handling

- The script uses a `try-catch` block to handle errors during page evaluation, ensuring the program doesn't crash unexpectedly.
- Timeout settings are applied when waiting for the DOM to load to prevent indefinite waiting.

### Sample Output

- Example console output when running the script:

  ```
  The user is navigating to: https://elgeniox.com/
  Waiting for user activity...
  The user is navigating to: https://elgeniox.com/58813808845/checkouts/a19c54d6b4fda5b9236c62265baea38a?key=c616f8d91e7e21e21e68a9c579e3785c
  Relevant URL detected! Checking page content...
  The user is in the purchasing process!
  Browser detected: Google Chrome
  Program completed.
  ```



