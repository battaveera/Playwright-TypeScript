import {test, expect, APIRequestContext, APIResponse} from "@playwright/test"
import HomePage from "../pages/home.page";
import ContactPage from "../pages/contact.page";
import apiController from '../controller/api.controller';

test.describe("FirstTest", () => {
    let contactPage: ContactPage;
    let randomPerson: APIResponse;
    
    test.beforeAll(async () => {
        
        await apiController.init();
        randomPerson = await apiController.getUsers();
        const newUserTodo = await apiController.createUserTodo();
        console.log(newUserTodo);

    })
    
       
   test('Fill Contacts  Form', async ({ page }) => {
        contactPage = new ContactPage(page);
        //open url
        await contactPage.navigate();
        //find Contacts link
        contactPage.contactLink.click();
        //await page.pause();
        //Fill the form and  submit
        await contactPage.submitForm(randomPerson['name'], randomPerson['email'], randomPerson['phone'], randomPerson['website']);
        //verify success message
        const successAlert = page.locator("div[role='alert']");
        await expect(successAlert).toHaveText("Thanks for contacting us! We will be in touch with you shortly");  
        
    })

        
})
