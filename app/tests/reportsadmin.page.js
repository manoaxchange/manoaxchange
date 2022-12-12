import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class ReportsAdminPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.REPORTS_ADMIN}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(3000).expect(this.pageSelector.exists).ok();
  }

  /** Checks if the page is displayed, then checks if there is at least 1 row (representing an item) in the reports table. */
  async checkFlagItem(testController) {
    await this.isDisplayed(testController);
    const rowCount = Selector('div.col').count;
    await testController.expect(rowCount).gte(1);
  }
}

export const reportsAdminPage = new ReportsAdminPage();
