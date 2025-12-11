const {test, expect} = require('@playwright/test');

test("Calendar date picker test", async({page})=>{

    const monthNumber = 2;
    const date = 18;
    const year = 2028;
    const expectedDateList = [monthNumber, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();


    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(monthNumber-1).click(); 
    await page.locator("//abbr[text()='"+date+"']").click();

    const inputs =  page.locator(".react-date-picker__inputGroup__input")
    for(let i=0; i<await inputs.count(); i++){
        const val = await inputs.nth(i).inputValue();
        console.log(val);
        expect(val).toEqual(expectedDateList[i].toString());
    }

    // function getMonthName(monthNumber){
    //     const date = new Date();
    //     date.setMonth(monthNumber);
    //     return date.toLocaleString('default', { month: 'long' });
    // }
    // const monthName = getMonthName(monthNumber);

    // async function selectMonthAndYear(){
    //     while(true){
    //         const displayedMonth = await page.locator(".react-date-picker__month-view__months__month.react-date-picker__month-view__months__month--selected").textContent();
    //         const displayedYear = await page.locator(".react-date-picker__year-view__years__year.react-date-picker__year-view__years__year--selected").textContent();
    //         if(displayedMonth === monthName && displayedYear == year.toString()){
    //             break;
    //         }
    //         await page.locator(".react-date-picker__navigation.react-date-picker__navigation--next").click();
    //     }
    // }
});