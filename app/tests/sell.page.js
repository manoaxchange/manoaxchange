import { Selector } from 'testcafe';
import { navBar } from './navbar.component';
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
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  async sellItem(testController, credentials) {
    await this.isDisplayed(testController);
    await testController.typeText(`#${COMPONENT_IDS.SELL_FORM_NAME}`, credentials.name);
    await testController.typeText(`#${COMPONENT_IDS.SELL_FORM_PRICE}`, credentials.price);
    await testController.typeText(`#${COMPONENT_IDS.SELL_FORM_DESCRIPTION}`, credentials.description);
    await testController.typeText(`#${COMPONENT_IDS.SELL_FORM_IMAGE}`, credentials.image);
    const categorySelector = Selector(`#${COMPONENT_IDS.SELL_FORM_CATEGORY}`);
    await testController.click(categorySelector);
    const categoryOption = categorySelector.find('option');
    await testController.click(categoryOption.withText('Miscellaneous'));
    await testController.expect(categorySelector.value).eql('Miscellaneous');
    await testController.click(`#${COMPONENT_IDS.SELL_FORM_SUBMIT} input.btn.btn-primary`);
    await testController.click('button.swal-button--confirm');
    await navBar.gotoMyItemsPage(testController);
    const cardCount = Selector('.card').count;
    await testController.expect(cardCount).gte(2);
  }
}

export const sellPage = new SellPage();
