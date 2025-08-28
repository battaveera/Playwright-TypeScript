import {test, expect} from "@playwright/test"
import HomePage from "../pages/home.page";
import { beforeEach } from "node:test";
import ContactPage from "../pages/contact.page";
import BlogPage from "../pages/blog.page";

test.describe("FirstTest", () => {
    let homePage: HomePage;
    
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate();
    })    

    test("Launch Home page and validate the title", async ({ page }) => {
        
        await expect (page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns");

    })
    test('Click Get Started Button using CSS selector', async ({ page }) => {
        
        await homePage.getStartedBtn.click();
        //verify url
        await expect (page).toHaveURL("https://practice.sdetunicorns.com/#get-started");
    })
    test('Validating text using Text selector', async ({ page }) => {
        
        //verify 
        const textname = await homePage.headingText;
        await expect (textname).toBeVisible();
        
    })
    test('Verify home link is enabled using text and css selector', async ({ page }) => {
        
        //find Home text 
        //const homeText = await page.locator('#zak-primary-menu >> text=Home');//or you can give below
        //const homeText = await page.locator('#zak-primary-menu:has-text("Home")')
        const homeText = await homePage.homeText;
        //verify if the home link is enabled
        await expect (homeText).toBeEnabled();
        
    })

    test('Verify search icon is visible', async ({ page }) => {
        
        //find search icon 
        
        const searchIcon = await homePage.searchIcon;
        //verify if the search icon is visible
        await expect (searchIcon).toBeVisible();
        
    })

    test('Verify text for all nav links', async ({ page }) => {
        
        const expectedLinks = ["Home", "About", "Shop", "Blog", "Contact", "My account"];
        
        //find navlinks
        
        const navLinks = homePage.navLinks;
        //verify if the search icon is visible
        expect (await homePage.getNavLinksText()).toEqual(expectedLinks);

        //to validate only a specific link
        //const specLink = page.locator('#zak-primary-menu li[id*=menu]').nth(3);
        const  specLink = homePage.specLink;
        //verify if the specific link at nth(3) which is blog is present
        expect (await specLink.textContent()).toEqual(expectedLinks[3]);

        
    })

    test('Print all the links', async ({ page }) => {
        
        const expectedLinks = ["Home", "About", "Shop", "Blog", "Contact", "My account"];
        
        //find navlinks
        
        const navLinks = homePage.navLinks;
        //print all  the links by looping through individual link using for-of
        for (const el of await navLinks.elementHandles()) {
            console.log(await el.textContent())
        }

    })

    
   test('Fill Contacts  Form', async ({ page }) => {
        let contactPage = new ContactPage(page);
        
        //find Contacts link
        
        contactPage.contactLink.click();
        
        //Fill the form
        
        await contactPage.contactName.fill("Matt Henry");
        
        await contactPage.contactEmail.fill("matt.henry@gmail.com");
        
        await contactPage.contactPhone.fill("1234567890");
        
        await contactPage.contactMsg.fill("This is after POM implementation");
        //click submit
       
        await contactPage.contactSubmit.click();
        //verify success message
        const successAlert = page.locator("div[role='alert']");
        await expect(successAlert).toHaveText("Thanks for contacting us! We will be in touch with you shortly");  
        
    })

    test('Blog validation', async ({ page }) => {
        let blogPage = new BlogPage(page);
        
        await blogPage.BlogLink.click();
        
        await expect(page.locator('#recent-posts-3 ul')).toBeVisible({timeout: 10000}); // this is assertion timeout
        
        const recentPostList = blogPage.recentPosts;
        //loop through the list and assert the char length >10
        for (const ele of await recentPostList.elementHandles()) {
            console.log("This is the lenght  of item in the list: "+(await ele.textContent())?.length);
            expect((await ele.textContent())?.length).toBeGreaterThan(10);
        }
        
        //assert total length which is 5 items
        console.log("this  is  the total lengh of list: " +await recentPostList.count());
        expect (await recentPostList.count()).toEqual(5);       
        
        
    })
        
})
