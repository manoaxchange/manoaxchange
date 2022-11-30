import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class UserProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.USER_PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page is currently displayed. */
  async gotoUpdateProfile(testController) {
    await this.isDisplayed(testController);
    await testController.click('button.btn-danger');
  }
}

export const userProfilePage = new UserProfilePage();
