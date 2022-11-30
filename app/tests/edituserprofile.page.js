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
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async updateProfile(testController, firstName) {
    const newFirstName = 'New First Name';
    await this.isDisplayed(testController);
    await testController.selectText(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME}`).pressKey('delete');
    await testController.typeText(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME}`, newFirstName);
    await testController.click(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_SUBMIT} input.btn.btn-primary`);
    await testController.click('button.swal-button--confirm');

    await testController.expect(Selector(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME}`).value).eql(newFirstName);

    await testController.selectText(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME}`).pressKey('delete');
    await testController.typeText(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME}`, firstName);
    await testController.click(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_SUBMIT} input.btn.btn-primary`);
    await testController.click('button.swal-button--confirm');
    await testController.expect(Selector(`#${COMPONENT_IDS.EDIT_PROFILE_FORM_FIRSTNAME}`).value).eql(firstName);
  }
}

export const editUserProfilePage = new EditUserProfilePage();
