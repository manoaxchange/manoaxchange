import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class EditUserProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.EDIT_USER_PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  /** Checks if the page is displayed, then changes firstName field, checks for the updated field, then restores original value. */
  async updateProfile(testController, firstName) {
    const newFirstName = 'New First Name';
    await this.isDisplayed(testController);
    await testController.selectText(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME}`).pressKey('delete');
    await testController.typeText(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME}`, newFirstName);
    await testController.click(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_SUBMIT} input.btn.btn-primary`);
    await testController.click('button.swal-button--confirm');
    // Check that the field is updated.
    await testController.expect(Selector(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME}`).value).eql(newFirstName);
    // Restore original value.
    await testController.selectText(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME}`).pressKey('delete');
    await testController.typeText(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME}`, firstName);
    await testController.click(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_SUBMIT} input.btn.btn-primary`);
    await testController.click('button.swal-button--confirm');
    await testController.expect(Selector(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME}`).value).eql(firstName);
  }
}

export const editUserProfilePage = new EditUserProfilePage();
