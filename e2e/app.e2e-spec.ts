import { QuintiqBoothSchedulerPage } from './app.po';

describe('quintiq-booth-scheduler App', function() {
  let page: QuintiqBoothSchedulerPage;

  beforeEach(() => {
    page = new QuintiqBoothSchedulerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
