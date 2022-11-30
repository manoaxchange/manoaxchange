import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { shopPage } from './shop.page';
import { itemPage } from './item.page';
import { userProfilePage } from './userprofile.page';
import { editUserProfilePage } from './edituserprofile.page';
import { myItemsPage } from './myitems.page';
import { reportsAdminPage } from './reportsadmin.page';
import { signupPage } from './signup.page';
import { sellPage } from './sell.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'kawn@hawaii.edu', password: 'changeme' };

/** Credentials for a new user creating an account. */
const newUserCredentials = { firstName: 'Peter', lastName: 'Griffin',
  username: 'pgrif@hawaii.edu', password: 'changeme', image: 'https://www.clipartmax.com/png/middle/282-2827413_peter-griffin-family-guy-peter-face.png', biography: 'A Character From Family Guy' };

/** Credentials for a new item creating a new item to sell. */
const newItemCredentials = { name: 'Rotten Potato', price: '1', description: 'rotten potato from minecraft',
  image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/c/c0/Poisonous_Potato_JE3_BE2.png/revision/latest/scale-to-width-down/160?cb=20200521233152' };

fixture('meteor-react-bootstrap-template localhost test with default db')
  .page('http://localhost:3000');

test.only('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

/** The following test functions tests whether not a page renders. */
test('Test that the Shop page displays', async (testController) => {
  await navBar.gotoShopPage(testController);
  await shopPage.isDisplayed(testController);
});

test('Test that the Item page displays', async (testController) => {
  await navBar.gotoShopPage(testController);
  await shopPage.isDisplayed(testController);
  await shopPage.gotoItemPage(testController);
  await itemPage.isDisplayed(testController);
});

test('Test that the Sign Up page displays', async (testController) => {
  await navBar.gotoSignUpPage(testController);
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

test('Test that the Reports Admin page displays', async (testController) => {
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

test('Test that the Edit User Profile page displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserProfilePage(testController);
  await userProfilePage.isDisplayed(testController);
  await userProfilePage.gotoUpdateProfile(testController);
  await editUserProfilePage.isDisplayed(testController);
});

/** The following test functions tests whether or not a form operates correctly with legal inputs. */
test('Test that the form on the Signup page works', async (testController) => {
  await navBar.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, newUserCredentials);
});

test('Test that the form on the Edit Profile page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserProfilePage(testController);
  await userProfilePage.gotoUpdateProfile(testController);
  await editUserProfilePage.updateProfile(testController, 'Nicholas');
});

test('Test that the form on the Sell page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSellPage(testController);
  await sellPage.sellItem(testController, newItemCredentials);
});

test('Test that the Edit Item form on the My Items page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMyItemsPage(testController);
  await myItemsPage.updateItem(testController, newItemCredentials.name);
});

test('Test that the Report form on the Shop page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoShopPage(testController);
  await shopPage.flagItem(testController, newItemCredentials.name);
  await navBar.gotoReportsAdminPage(testController);
  await reportsAdminPage.checkFlagItem(testController);
});
