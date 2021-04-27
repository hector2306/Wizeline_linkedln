import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'
import {CREDENTIALS,URL} from '../data/Constants'


fixture('Login feature testing')
    .page(URL)


test('1.-Login with a valid user', async t => {
        await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME,CREDENTIALS.VALID_USER.PASSWORD)
        await t.expect(ProductsPage.productTitle.exists).ok()

})

test('2.-Login with an invalid user', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.INVALID_USER.USERNAME,CREDENTIALS.INVALID_USER.PASSWORD)
        
    await t.expect(LoginPage.errorMessage.exists).ok()
    await t.expect(LoginPage.errorMessage.innerText).eql('Epic sadface: Username and password do not match any user in this service')

})

test('3.-Logout from the home page', async t => {
   
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME,CREDENTIALS.VALID_USER.PASSWORD)
    await ProductsPage.logout()
    await t.expect(LoginPage.usernameField.exists).ok()
    await t.expect(LoginPage.passwordField.exists).ok()
    
})