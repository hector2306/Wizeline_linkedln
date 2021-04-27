import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'
import ShoppingCartPage from '../pages/ShoppingCartPage'
import {CREDENTIALS,URL} from '../data/Constants'


fixture('Shopping Cart feature testing')
    .page(URL)
    .beforeEach(async t => {
        await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME,CREDENTIALS.VALID_USER.PASSWORD)
     })


test('4.-Sort products by Price (low to high)', async t => {
    await ProductsPage.sortPrice()



})
test('5.-Add multiple items to the shopping cart', async t => {
    let products = await ProductsPage.getProducts();
   
    for (var i = 0; i < products.length; i++)
    {
        await ProductsPage.addProductTocart(i)
       
    }

    await ProductsPage.clickShoppingCart();
    let itemsAdded = await ShoppingCartPage.verifyAddedProducts(products)
    await t.expect(itemsAdded).ok()

})

test('6.-Add the specific product ‘Sauce Labs Onesie’ to the shopping cart', async t =>{
    
    await ProductsPage.addProductTocart(4)
    await ProductsPage.clickShoppingCart()
    await t.expect(ProductsPage.nameOfThePorduct.innerText).eql('Sauce Labs Onesie')

})


