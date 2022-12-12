import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class ItemPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ITEM}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  async selectDropdown(testController, text) {
    const dropdownSelector = await Selector('div.dropdown-menu').withText(text).find('a.dropdown-item');
    await testController.click(dropdownSelector);
  }

  async editItem(testController, itemName) {
    await this.isDisplayed(testController);
    await testController.click('button.dropdown-toggle');
    await this.selectDropdown(testController, 'Edit');

    const newItemName = 'New ItemDetails Name';
    await testController.selectText(`#${COMPONENT_IDS.EDIT_ITEM_FORM_NAME}`).pressKey('delete');
    await testController.typeText(`#${COMPONENT_IDS.EDIT_ITEM_FORM_NAME}`, newItemName);
    await testController.click(`#${COMPONENT_IDS.EDIT_ITEM_FORM_SUBMIT}`);
    await testController.click('button.swal-button--confirm');

    await testController.click('button.dropdown-toggle');
    await this.selectDropdown(testController, 'Edit');
    await testController.expect(Selector(`#${COMPONENT_IDS.EDIT_ITEM_FORM_NAME}`).value).eql(`${newItemName}`);

    await testController.selectText(`#${COMPONENT_IDS.EDIT_ITEM_FORM_NAME}`).pressKey('delete');
    await testController.typeText(`#${COMPONENT_IDS.EDIT_ITEM_FORM_NAME}`, itemName);
    await testController.click(`#${COMPONENT_IDS.EDIT_ITEM_FORM_SUBMIT}`);
    await testController.click('button.swal-button--confirm');

    await testController.click('button.dropdown-toggle');
    await this.selectDropdown(testController, 'Edit');
    await testController.expect(Selector(`#${COMPONENT_IDS.EDIT_ITEM_FORM_NAME}`).value).eql(`${itemName}`);
  }

  async messageSeller(testController) {
    await this.isDisplayed(testController);
    await testController.click('button.btn-dark');
    await testController.click('button.btn-danger');
  }

  async reportItem(testController) {
    await this.isDisplayed(testController);
    await testController.click('u');
    await testController.typeText(`#${COMPONENT_IDS.REPORT_FORM_DESCRIPTION}`, 'Inappropriate ItemDetails.');
    await testController.click(`#${COMPONENT_IDS.REPORT_FORM_SUBMIT}`);
    await testController.click('button.swal-button--confirm');
  }
}

export const itemPage = new ItemPage();
