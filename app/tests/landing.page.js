import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class LandingPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.LANDING}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 100 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(100000).expect(this.pageSelector.exists).ok();
  }
}

export const landingPage = new LandingPage();
