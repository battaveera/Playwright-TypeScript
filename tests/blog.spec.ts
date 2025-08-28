import {test, expect} from "@playwright/test"
import HomePage from "../pages/home.page";
import BlogPage from "../pages/blog.page";

test.describe("FirstTest", () => {
    let blogPage: BlogPage;
    //homePage = new HomePage(page);
       test('Blog validation', async ({ page }) => {
        blogPage = new BlogPage(page);
        //open url
        //await page.goto("https://practice.sdetunicorns.com/");
        await blogPage.navigate();
        //navigate to Blog  page
        //await page.locator('#menu-item-490').click();
        await blogPage.BlogLink.click();
        //await page.pause();
        //get recent post list elements
        //await page.waitForTimeout(5000); //hardcoded wait --> this should be avoided.
        //await page.locator('#recent-posts-3 ul').waitFor({state: 'visible', timeout:10000}); //this is conditional wait
        await expect(page.locator('#recent-posts-3 ul')).toBeVisible({timeout: 10000}); // this is assertion timeout
        //const recentPostList = page.locator('#recent-posts-3 ul li');
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
