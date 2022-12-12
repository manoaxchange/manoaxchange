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
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  /** Checks if the page is displayed, then fills in the form using the passed credentials, then checks the My ItemDetails page if there is at least 3 cards (default is 2). */
  async sellItem(testController, credentials) {
    await this.isDisplayed(testController);
    await testController.typeText(`#${COMPONENT_IDS.SELL_FORM_NAME}`, credentials.name);
    await testController.typeText(`#${COMPONENT_IDS.SELL_FORM_PRICE}`, credentials.price);
    await testController.typeText(`#${COMPONENT_IDS.SELL_FORM_DESCRIPTION}`, credentials.description);
    const categorySelector = Selector(`#${COMPONENT_IDS.SELL_FORM_CATEGORY}`);
    await testController.click(categorySelector);
    const categoryOption = categorySelector.find('option');
    await testController.click(categoryOption.withText('Miscellaneous'));
    await testController.expect(categorySelector.value).eql('Miscellaneous');
    await testController.click(`#${COMPONENT_IDS.SELL_FORM_SUBMIT}`);
    await testController.click('button.swal-button--confirm');
  }
}

export const sellPage = new SellPage();
