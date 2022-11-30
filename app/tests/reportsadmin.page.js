import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class ReportsAdminPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.REPORTS_ADMIN}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  /** Blah blah blah. */
  async checkFlagItem(testController) {
    await this.isDisplayed(testController);
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(1);
  }
}

export const reportsAdminPage = new ReportsAdminPage();
