import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class SignupPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SIGNUP}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks if the page is displayed, then signs up a new user using the passed credentials, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, credentials) {
    await this.isDisplayed(testController);
    await testController.typeText(`#${COMPONENT_IDS.SIGNUP_FORM_FIRSTNAME}`, credentials.firstName);
    await testController.typeText(`#${COMPONENT_IDS.SIGNUP_FORM_LASTNAME}`, credentials.lastName);
    await testController.typeText(`#${COMPONENT_IDS.SIGNUP_FORM_EMAIL}`, credentials.username);
    await testController.typeText(`#${COMPONENT_IDS.SIGNUP_FORM_PASSWORD}`, credentials.password);
    await testController.typeText(`#${COMPONENT_IDS.SIGNUP_FORM_BIO}`, credentials.biography);
    await testController.click(`#${COMPONENT_IDS.SIGNUP_FORM_SUBMIT}`);
  }
}

export const signupPage = new SignupPage();
