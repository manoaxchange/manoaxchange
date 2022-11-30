import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class UserProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.USER_PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  /** Checks if the page is displayed, then selects the Edit Profile button. */
  async gotoUpdateProfile(testController) {
    await this.isDisplayed(testController);
    await testController.click('button.btn-danger');
  }
}

export const userProfilePage = new UserProfilePage();
