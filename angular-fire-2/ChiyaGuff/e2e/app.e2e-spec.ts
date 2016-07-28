import { ChiyaGuffPage } from './app.po';

describe('chiya-guff App', function() {
  let page: ChiyaGuffPage;

  beforeEach(() => {
    page = new ChiyaGuffPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
