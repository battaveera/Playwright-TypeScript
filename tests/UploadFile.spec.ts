import {test, expect} from "@playwright/test"
import CartPage from "../pages/cart.page";
import path from "path";


test.describe('Upload File Functionality validation', () => {
    let cartPage: CartPage;

    const fileName = ['Errors.png', 'Errors1.png'];

    for (const name of fileName){

        test(`Should upload a ${name} File`, async ({ page }) => {
        cartPage = new CartPage(page);
        //open url
        await page.goto("https://practice.sdetunicorns.com/cart/");

        //store  test file path
        const filePath = path.join(__dirname, `../data/${name}`);
        //upload test file
        cartPage.uploadComponent().uploadFile(filePath);

        //assertion
        await expect(cartPage.uploadComponent().successMsg).toContainText("uploaded successfully");
        //await page.waitForTimeout(5000);

    })

    }
   

    test.skip('Should upload a File (By DoM Manipulation upload) hidden input field', async ({ page }) => {
        //open url
        await page.goto("https://practice.sdetunicorns.com/cart/");

        //store  test file path
        const filePath = path.join(__dirname, '../data/Errors.png');
        // DoM manipulation
        await page.evaluate(() => {
            const selector = document.querySelector('input#upfile_1')
            if(selector){
                selector.className = ''
            }
            
        })
        //upload test file
        await page.setInputFiles('input#upfile_1', filePath); 
        //click submit button
        await page.locator('#upload_1').click();

        //assertion
        await expect(page.locator('#wfu_messageblock_header_1_label_1')).toContainText("uploaded successfully");
        //await page.waitForTimeout(5000);

    })
    
    
    
})
