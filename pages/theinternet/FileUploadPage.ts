import { type Page, type Locator } from '@playwright/test';
import { NavigatePages } from './NavigatePage';

export class FileUploadPage {
  private readonly page: Page;
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly uploadedFilesContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput = page.locator('id=file-upload');
    this.uploadButton = page.getByRole('button', { name: 'Upload' });
    this.uploadedFilesContainer = page.locator('id=uploaded-files');
  }

async navigate(): Promise<void> {
  const navigation = new NavigatePages(this.page);
  await navigation.navigate('File Upload');
}

  async uploadVirtualFile(name: string, type: string, content: string): Promise<void> {
    const dataTransferHandle = await this.page.evaluateHandle(([fileName, fileType, fileContent]) => {
      const dataTransfer = new DataTransfer();
      const file = new File([fileContent], fileName, { type: fileType });
      dataTransfer.items.add(file);
      return dataTransfer;
    }, [name, type, content] as const);

    await this.fileInput.evaluate((el: HTMLInputElement, dataTransfer: DataTransfer) => {
      el.files = dataTransfer.files;
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, dataTransferHandle);
  }

  async clickUpload(): Promise<void> {
    await this.uploadButton.click();
  }
}