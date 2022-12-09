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

  async reportItem(testController) {
    await this.isDisplayed(testController);
    await testController.click('button.btn-danger');
    await testController.typeText(`#${COMPONENT_IDS.REPORT_FORM_DESCRIPTION}`, 'Inappropriate ItemDetails.');
    await testController.click(`#${COMPONENT_IDS.REPORT_FORM_SUBMIT}`);
    await testController.click('button.swal-button--confirm');
  }
}

export const itemPage = new ItemPage();
