import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class MyItemsPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.MY_ITEMS}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  /** Checks if the page is displayed, then selects the edit button using the passed itemName, then changes the name field, then selects the edit button using the updated name field, then restores original value. */
  async gotoItemPage(testController, itemName) {
    await this.isDisplayed(testController);
    const cardSelector = await Selector('div.my-3').withText(itemName.toUpperCase()).find('img');
    await testController.click(cardSelector);
  }
}

export const myItemsPage = new MyItemsPage();
