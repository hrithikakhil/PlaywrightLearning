const {test, expect} = require('@playwright/test');

test("Child window handles", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    


    //Explaination
    //documentLink.click(); //This opens a new page, how to handle this? In Playwright we have a method to handle this
    //await context.waitForEvent('page') //listen for any new page, and return promise [pending, rejected, fulfilled]
    //Should we use this method before we perform click or after we click?
    //We cannot use afte click because event will be completed [i.e newPage will be opened] and it will look for the next event 
    //We cannot also use before clicking why because event is not even started
    //Solution we need something that helps in performing both actions in parallel [1. Event to begin 2. Look for new Page] and this can be achieved using promise.all
    //We use Promise.all() to ensure the listener is active BEFORE triggering the action, preventing any race condition where the new page opens before we start listening."
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])

    const str = await newPage.locator("//p[@class='im-para red']").textContent();
    console.log(str);

    //Scenario 2 - Copy the emailId from the above string and paste it in the login pages parent page
    const arrayText = str.split('@');
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await userName.fill(domain);
    await page.pause();

    // ❌ WRONG - Looking INSIDE the input tag (nothing there!)
    const actualUsernameVal = await userName.textContent(); 
    console.log(actualUsernameVal); // Prints: "" (empty)

    // ✅ CORRECT - Reading the VALUE stored in the input
    const actualUsernameVal1 = await userName.inputValue();
    console.log(actualUsernameVal1); // Prints: "the value that is entered in username"
})

//Alternate to the promise.all
// Step 1: Create promise WITHOUT awaiting (non-blocking)
//const promise = context.waitForEvent('page'); 
// promise = Promise { <pending> }
// Listener is active in background

// Step 2: Trigger the event
//await documentLink.click();
// Click happens → New page opens → Event fires
// promise = Promise { <fulfilled>: Page }

// Step 3: NOW await to get the result
//const newPage = await promise;
// newPage = Page object