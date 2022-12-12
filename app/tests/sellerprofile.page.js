import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class SellerProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SELLERS_PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  async rateProfile(testController) {
    await this.isDisplayed(testController);
    await testController.click(`#${COMPONENT_IDS.RATE_PROFILE_BUTTON}`);
    await testController.click('input.form-check-input');
    await testController.click(`#${COMPONENT_IDS.RATING_FORM_SUBMIT}`);
    await testController.click('button.swal-button--confirm');

  }
}

export const sellerProfilePage = new SellerProfilePage();
