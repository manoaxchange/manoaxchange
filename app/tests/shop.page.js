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
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  /** Checks if the page is displayed, finds the name of the first item in the Shop page, then selects it. */
  async gotoItemPage(testController) {
    await this.isDisplayed(testController);
    const firstItemSelector = Selector('div.w-100').find('b');
    await testController.click(firstItemSelector);
  }

  /** Checks if the page is displayed, then finds the card of the correct item using the passed itemName, then selects the flag (aka report) button. */
  async flagItem(testController, itemName) {
    await this.isDisplayed(testController);
    const cardSelector = await Selector('div.w-100').withText(itemName).find('button.btn-primary');
    await testController.click(cardSelector);
    await testController.typeText(`#${COMPONENT_IDS.REPORT_FORM_DESCRIPTION}`, 'Inappropriate ItemDetails.');
    await testController.click(`#${COMPONENT_IDS.REPORT_FORM_SUBMIT}`);
    await testController.click('button.swal-button--confirm');
  }
}

export const shopPage = new ShopPage();
