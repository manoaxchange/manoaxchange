import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class SellersPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SELLERS}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  async gotoSellerProfilePage(testController) {
    await this.isDisplayed(testController);
    await testController.click('a.underline.text-dark.h3');
  }
}

export const sellersPage = new SellersPage();
