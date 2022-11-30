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
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  /** Blah Blah Blah */
  async updateItem(testController, itemName) {
    await this.isDisplayed(testController);
    const cardSelector = await Selector('div.w-100').withText(itemName).find('button.btn-primary');
    await testController.click(cardSelector);

    const newItemName = 'New Item Name';
    await testController.selectText(`#${COMPONENT_IDS.EDIT_ITEM_FORM_NAME}`).pressKey('delete');
    await testController.typeText(`#${COMPONENT_IDS.EDIT_ITEM_FORM_NAME}`, newItemName);
    await testController.click(`#${COMPONENT_IDS.EDIT_ITEM_FORM_SUBMIT} input.btn.btn-primary`);
    await testController.click('button.swal-button--confirm');

    const newCardSelector = await (Selector('div.w-100').withText(newItemName).find('button.btn-primary'));
    await testController.click(newCardSelector);
    await testController.selectText(`#${COMPONENT_IDS.EDIT_ITEM_FORM_NAME}`).pressKey('delete');
    await testController.typeText(`#${COMPONENT_IDS.EDIT_ITEM_FORM_NAME}`, itemName);
    await testController.click(`#${COMPONENT_IDS.EDIT_ITEM_FORM_SUBMIT} input.btn.btn-primary`);
    await testController.click('button.swal-button--confirm');
  }
}

export const myItemsPage = new MyItemsPage();
