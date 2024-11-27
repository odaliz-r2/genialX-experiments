const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  function detectBrowser(userAgent) {
    if (/Chromium/i.test(userAgent)) return "Chromium";
    if (/Chrome/i.test(userAgent) && !/Edg/i.test(userAgent))
      return "Google Chrome";
    if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent))
      return "Safari";
    if (/Firefox/i.test(userAgent)) return "Firefox";
    if (/Edg/i.test(userAgent)) return "Microsoft Edge";
    if (/Opera|OPR/i.test(userAgent)) return "Opera";
    return "Unknown browser";
  }

  page.on("framenavigated", async (frame) => {
    const currentUrl = frame.url();
    console.log("The user is navigating to:", currentUrl);

    const isUrlRelevant = /checkouts|thank_you/i.test(currentUrl);
    if (isUrlRelevant) {
      console.log("Relevant URL detected! Checking page content...");

      try {
        // Wait until the DOM is fully loaded.
        await frame.waitForSelector("body", { timeout: 5000 });

        const isCheckoutPage = await frame.evaluate(() => {
          if (!document.body) return false; 
          return (
            document.body.innerText.includes("Pedido #") ||
            document.body.innerText.includes("Detalles del pedido") ||
            document.body.innerText.includes("Métodos de pago")
          );
        });

        if (isCheckoutPage) {
          console.log("The user is in the purchasing process!");

          const userAgent = await page.evaluate(() => navigator.userAgent);
          const browserName = detectBrowser(userAgent);
          console.log("Browser detected:", browserName);

          await browser.close();
          console.log("Program completed.");
        }
      } catch (error) {
        console.error("Error during page evaluation:", error.message);
      }
    }
  });

  await page.goto("https://elgeniox.com/", { waitUntil: "networkidle2" });
  console.log("Waiting for user activity...");
})();
