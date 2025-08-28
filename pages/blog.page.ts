import {Page, Locator} from "@playwright/test";

class BlogPage{
    private page: Page;
    BlogLink: Locator;
    recentPosts: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.BlogLink = page.locator('#menu-item-490');
        this.recentPosts = page.locator('#recent-posts-3 ul');   
    }
   async navigate(){
       await this.page.goto('/'); //refer the BaseURL in playwright.config.ts
    }
}
export default BlogPage;