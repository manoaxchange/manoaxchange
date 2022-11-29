import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class SellPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SELL}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async sellItem(testController, credentials) {
    await this.isDisplayed(testController);
    await testController.typeText(`#${COMPONENT_IDS.SELL_FORM_NAME}`, credentials.name);
    await testController.typeText(`#${COMPONENT_IDS.SELL_FORM_PRICE}`, credentials.price);
    await testController.typeText(`#${COMPONENT_IDS.SELL_FORM_DESCRIPTION}`, credentials.description);
    await testController.typeText(`#${COMPONENT_IDS.SELL_FORM_IMAGE}`, credentials.image);
    const categorySelector = Selector(`#${COMPONENT_IDS.SELL_FORM_CATEGORY} div.form-select`);
    await testController.click(categorySelector.nth(1));
    await testController.click(`#${COMPONENT_IDS.SELL_FORM_SUBMIT} input.btn.btn-primary`)
  }
}

export const sellPage = new SellPage();
