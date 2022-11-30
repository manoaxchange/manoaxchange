import { Selector } from 'testcafe';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSignInPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN}`);
    await testController.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGNIN}`);
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    const loggedInUser = Selector(`#${COMPONENT_IDS.NAVBAR_USER_DROPDOWN}`).innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.expect(Selector(`#${COMPONENT_IDS.NAVBAR_USER_DROPDOWN}`).exists).ok();
    await testController.click(`#${COMPONENT_IDS.NAVBAR_USER_DROPDOWN}`);
    await testController.click(`#${COMPONENT_IDS.NAVBAR_USER_DROPDOWN_SIGNOUT}`);
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignUpPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN}`);
    await testController.click(`#${COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGNUP}`);
  }

  async gotoShopPage(testController) {
    await testController.click(`#${COMPONENT_IDS.NAVBAR_SHOP}`);
  }

  async gotoMyItemsPage(testController) {
    await testController.click(`#${COMPONENT_IDS.NAVBAR_MY_ITEMS}`);
  }

  async gotoReportsAdminPage(testController) {
    await testController.click(`#${COMPONENT_IDS.NAVBAR_ADMIN}`);
  }

  /** Pull down login menu, go to User Profile page. */
  async gotoUserProfilePage(testController) {
    await testController.click(`#${COMPONENT_IDS.NAVBAR_USER_DROPDOWN}`);
    await testController.click(`#${COMPONENT_IDS.NAVBAR_USER_DROPDOWN_MY_PROFILE}`);
  }

  async gotoSellPage(testController) {
    await testController.click(`#${COMPONENT_IDS.NAVBAR_SELL}`);
  }
}

export const navBar = new NavBar();
