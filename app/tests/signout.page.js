import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class SignoutPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SIGNOUT}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const signoutPage = new SignoutPage();
