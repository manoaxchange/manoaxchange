import { Selector } from 'testcafe';
import { navBar } from './navbar.component';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class SigninPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SIGNIN}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignUpPage(testController) {
    await this.isDisplayed(testController);
    await testController.click('#goto-signup');
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async signin(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText(`#${COMPONENT_IDS.SIGNIN_FORM_EMAIL}`, username);
    await testController.typeText(`#${COMPONENT_IDS.SIGNIN_FORM_PASSWORD}`, password);
    await testController.click(`#${COMPONENT_IDS.SIGNIN_FORM_SUBMIT}`);
    await navBar.isLoggedIn(testController, username);
  }
}

export const signinPage = new SigninPage();
