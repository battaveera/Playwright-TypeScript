import {test, expect} from "@playwright/test"
import HomePage from "../pages/home.page";
import ContactPage from "../pages/contact.page";
import { faker } from '@faker-js/faker';

test.describe("FirstTest", () => {
    let contactPage: ContactPage;
    //homePage = new HomePage(page);
       
   test('Fill Contacts  Form', async ({ page }) => {
        contactPage = new ContactPage(page);
        //open url
        //await page.goto("https://practice.sdetunicorns.com/");
        await contactPage.navigate();
        //find Contacts link
        //await page.locator('#menu-item-493').click();
        contactPage.contactLink.click();
        //await page.pause();
        //Fill the form and  submit
        await contactPage.submitForm(faker.person.fullName(), faker.internet.email(), faker.phone.number(), faker.lorem.sentence(2));
        //verify success message
        const successAlert = page.locator("div[role='alert']");
        await expect(successAlert).toHaveText("Thanks for contacting us! We will be in touch with you shortly");  
        
    })

        
})
