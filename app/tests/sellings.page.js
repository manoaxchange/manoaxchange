import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class SellingsPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SELLINGS}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }
}

export const sellingsPage = new SellingsPage();
