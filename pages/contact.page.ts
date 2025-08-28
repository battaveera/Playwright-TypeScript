import {Page, Locator} from "@playwright/test";

class ContactPage{
    private page: Page;
    contactLink: Locator;
    contactName: Locator;
    contactEmail: Locator;
    contactPhone: Locator;
    contactMsg: Locator;
    contactSubmit: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.contactLink = page.locator('#menu-item-493');
        this.contactName = page.locator(".contact-name input");
        this.contactEmail = page.locator(".contact-email input");
        this.contactPhone = page.locator(".contact-phone input");
        this.contactMsg = page.locator(".contact-message textarea");
        this.contactSubmit = page.locator("button[type = 'Submit']"); 
    }
   async navigate(){
       await this.page.goto('/'); //refer the BaseURL in playwright.config.ts
    }
   async submitForm(name, email, phone, message){
    //await page.locator(".contact-name input").fill("Matt Henry");
        await this.contactName.fill(name);
        //await page.locator(".contact-email input").fill("matt.henry@gmail.com");
        await this.contactEmail.fill(email);
        //await page.locator(".contact-phone input").fill("1234567890");
        await this.contactPhone.fill(phone);
        //await page.locator(".contact-message textarea").fill("This is sample contact information. Happy learning");
        await this.contactMsg.fill(message);
        //click submit
        //await page.locator("button[type = 'Submit']").click();

        await this.contactSubmit.click();
   }
}
export default ContactPage;