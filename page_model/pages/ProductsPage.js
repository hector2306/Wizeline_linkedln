import {Selector,t} from 'testcafe'
import {Product} from '../data/Models'
const {BasePage} = require('./BasePage')

class ProductsPage extends BasePage
{
    constructor()
    {
        super()
        this.productTitle = Selector('.title')
        this.shoppingCartButton = Selector('#shopping_cart_container')
        this.unsortedList = Selector('.inventory_item_price')
        this.filter = Selector('.product_sort_container')
        this.priceLowToHigh = Selector('option[value="lohi"]')
        this.nameOfThePorduct = Selector('.inventory_item_name')
    }

    async clickShoppingCart()
    {
        await t.click(this.shoppingCartButton)
    }

    async sortPrice()
    {
        let sortedProductsList = await this.getProducts()
        sortedProductsList.sort((a, b) => {
            if(a.price < b.price)
                return -1
                else if(a.price > b.price){
                    return 1
                } 
                return 0
        }) 
         await t.click(this.filter)
         await t.click(this.priceLowToHigh)
        
        let pagePricesList = await this.getProducts()
        await t.expect(sortedProductsList).eql(pagePricesList)     
    }

    async getProducts(){
        let pricesList = []
        const productItems = await Selector('.inventory_item')
        const productsCount = await productItems.count
        for(let i = 0; i < await productsCount; i++){
        pricesList.push(new Product(
            null, 
            await productItems.nth(i).find('.inventory_item_price').innerText))
            
        }
        return pricesList
    }

    async getProducts()
    {
        let productList = []
        const productItems = await Selector('.inventory_item')
        const productsCount = await productItems.count
        for(let i = 0; i < await productsCount; i++){
            productList.push(new Product(await productItems.nth(i).find('.inventory_item_name').innerText,
            await productItems.nth(i).find('.inventory_item_price').innerText))
        }
        
        return productList
        
    }

    async addProductTocart(index)
    {   
        const productAddToCartButtons = await Selector('.pricebar > button') 
        await t.click(productAddToCartButtons.nth(index))
    }



}

export default new ProductsPage()