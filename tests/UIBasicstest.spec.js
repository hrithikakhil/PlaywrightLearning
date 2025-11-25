const {test, expect} = require ('@playwright/test');


//Details
//1. if we dont import the above test from playwright, we wont be able to use the below test annotation
//2. test accepts two things, one is title and other one is function()
//3. If the function has no name the just use ()=> [brackets with arrow symbol], this is nothing but anonymous function
//4. JS is asynchronous, so we have to use await at every step, in order use await use async keyword near function

//the below code is the skeleton to write any test using JS & PW

// test('First Playwright Test', async() =>
// {
//     //Step1 - [use await] launch the browser
//     //Step2 - [use await] Open the URL
//     //Step3 - [use await] Enter US and PW
// });

//The below test is to launch browser with cache or cookie sessions
test('Global fixture (browser) in Playwright Test', async({browser}) => //Here browser is the global fixture, here the browser should be wrapped in curly braces
{
    //We should create a new context - this helps launch a new browser 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

//Now say suppose we dont want to lauch browser with any cookies or cache, we can just use page fixture, this will automatically create context and page for us
test.only('Page fixture in Playwright ', async({page}) => 
{
    await page.goto("https://google.com");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

//Playwright Test Execution Explaination
/* 
1. Command used - "npx playwright test" by default playwright runs the test in the headless mode.
   To run it with headed mode, use the below command
   "npx playwright test --headed" 
   Here npx refers to the location of playwright module inside the node modules package folder from the project directory
   test command here finds out config file and triggers it
   Note - Insted of writing headed everytime in the command we can the key called headless set to true/false from config file
2. Now we have 2 test files, here these 2 files gets executed parallelly
3. But tests inside single file gets executed sequentially 
4. To execute only single test then just add .only to the required test
*/