import { Page } from 'puppeteer';
import { MyBrowser, MyBrowserDTO } from './browser';

jest.mock('puppeteer', () => ({
  launch: jest.fn().mockResolvedValue({
    newPage: jest.fn().mockResolvedValue({
      goto: jest.fn().mockResolvedValue(undefined),
      setViewport: jest.fn().mockResolvedValue(undefined),
      content: jest.fn().mockResolvedValue(''),
    }),
  }),
}));

describe('MyBrowser', () => {
  let browser = {} as MyBrowserDTO;

  beforeEach(() => {
    browser = new MyBrowser();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('launch', () => {
    it('should call puppeteer.launch with headless option set to "new"', async () => {
      await browser.launch();
      expect(require('puppeteer').launch).toHaveBeenCalledWith({ headless: 'new' });
    });
  });

  describe('navigateTo', () => {
    it('should call puppeteer.launch and navigate to the given URL with the given options and viewport config', async () => {
      const url = 'https://example.com';
      const options = {};
      const viewportConfig = { width: 1920, height: 1080 };
      await browser.navigateTo({ url, options, viewportConfig });
      expect(require('puppeteer').launch).toHaveBeenCalled();
      expect(require('puppeteer').newPage).toHaveBeenCalled();
      expect(browser.page.goto).toHaveBeenCalledWith(url, options);
      expect(browser.page.setViewport).toHaveBeenCalledWith(viewportConfig);
    });

    it('should throw an error if an error occurs during navigation', async () => {
      const url = 'https://example.com';
      const options = {};
      const viewportConfig = { width: 1920, height: 1080 };
      require('puppeteer').launch.mockRejectedValueOnce(new Error('Failed to launch browser'));
      await expect(browser.navigateTo({ url, options, viewportConfig })).rejects.toThrow('Error on navigate to page:');
    });
  });

  describe('readPage', () => {
    it('should return the content of the current page', async () => {
      const content = await browser.readPage();
      expect(browser.page.content).toHaveBeenCalled();
      expect(content).toEqual('');
    });

    it('should throw an error if an error occurs while reading the page', async () => {
      require('puppeteer').launch.mockResolvedValueOnce({
        newPage: jest.fn().mockRejectedValueOnce(new Error('Failed to create new page')),
      });
      await expect(browser.readPage()).rejects.toThrow('Error on read this page:');
    });
  });

  describe('setPage', () => {
    it('should set the current page to the given page', () => {
      const page = {} as Page;
      browser.setPage(page);
      expect(browser.page).toBe(page);
    });
  });
});