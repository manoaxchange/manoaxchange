import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class ShopPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SHOP}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  /** Blah Blah Blah */
  async flagItem(testController, itemName) {
    await this.isDisplayed(testController);
    const cardSelector = await Selector('div.w-100').withText(itemName).find('button.btn-primary');
    await testController.click(cardSelector);
    await testController.typeText(`#${COMPONENT_IDS.REPORT_FORM_DESCRIPTION}`, 'Inappropriate Item.');
    await testController.click(`#${COMPONENT_IDS.REPORT_FORM_SUBMIT}`);
    await testController.click('button.swal-button--confirm');
  }
}

export const shopPage = new ShopPage();
