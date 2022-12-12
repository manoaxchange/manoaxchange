import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { shopPage } from './shop.page';
import { itemPage } from './item.page';
import { userProfilePage } from './userprofile.page';
import { myItemsPage } from './myitems.page';
import { reportsAdminPage } from './reportsadmin.page';
import { signupPage } from './signup.page';
import { sellPage } from './sell.page';
import { sellerProfilePage } from './sellerprofile.page';
import { sellersPage } from './sellers.page';
import { Selector } from 'testcafe';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'kawn@hawaii.edu', password: 'changeme' };

/** Credentials for a new user creating an account. */
const newUserCredentials = { firstName: 'Peter', lastName: 'Griffin',
  username: `user-${new Date().getTime()}@hawaii.edu`, password: 'changeme', biography: 'A Character From Family Guy' };

/** Credentials for a new item creating a new item to sell. */
const newItemCredentials = { name: 'Rotten Potato', price: '1', description: 'rotten potato from minecraft' };

fixture('meteor-react-bootstrap-template localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await landingPage.isDisplayedAfterSignOut(testController);
});

/** The following test functions tests whether not a page renders. */
test('Test that the Shop page displays', async (testController) => {
  await navBar.gotoShopPage(testController);
  await shopPage.isDisplayed(testController);
});

test('Test that the ItemDetails page displays', async (testController) => {
  await navBar.gotoShopPage(testController);
  await shopPage.isDisplayed(testController);
  await shopPage.gotoItemPage(testController);
  await itemPage.isDisplayed(testController);
});

test('Test that the Sign Up page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.gotoSignUpPage(testController);
  await signupPage.isDisplayed(testController);
});

test('Test that the Sell page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSellPage(testController);
  await sellPage.isDisplayed(testController);
});

test('Test that the My Items page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMyItemsPage(testController);
  await myItemsPage.isDisplayed(testController);
});

test('Test that the Sellers page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSellersPage(testController);
  await sellersPage.isDisplayed(testController);
});

test('Test that the Seller Profile page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSellersPage(testController);
  await sellersPage.gotoSellerProfilePage(testController);
  await sellerProfilePage.isDisplayed(testController);
});

test('Test that the ReportsTable Admin page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoReportsAdminPage(testController);
  await reportsAdminPage.isDisplayed(testController);
});

test('Test that the User Profile page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserProfilePage(testController);
  await userProfilePage.isDisplayed(testController);
});

/** The following test functions tests whether or not a form operates correctly with legal inputs. */
test('Test that the form on the Signup page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, newUserCredentials);
  await navBar.isLoggedIn(testController, newUserCredentials.username);
});

test('Test that the form on the Edit Profile page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserProfilePage(testController);
  await userProfilePage.editUserProfile(testController);
});

test('Test that the form on the Sell page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSellPage(testController);
  await sellPage.sellItem(testController, newItemCredentials);
  await navBar.gotoMyItemsPage(testController);
  const cardCount = Selector('div.my-3').count;
  await testController.expect(cardCount).gte(3);
});

test('Test that the Edit ItemDetails form on the My Items page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMyItemsPage(testController);
  await myItemsPage.gotoItemPage(testController, newItemCredentials.name);
  await itemPage.editItem(testController, newItemCredentials.name);
});

test('Test that the Report form on the Shop page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoShopPage(testController);
  await shopPage.gotoItemPage(testController);
  await itemPage.reportItem(testController);
  await navBar.gotoReportsAdminPage(testController);
  await reportsAdminPage.checkFlagItem(testController);
});
