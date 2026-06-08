import { test, expect } from '@playwright/test';
import { FileUploadPage } from '../../pages/theinternet/FileUploadPage';

test.describe('File Upload Functionality', () => {
  let fileUploadPage: FileUploadPage;

  test.beforeEach(async ({ page }) => {
    fileUploadPage = new FileUploadPage(page);
    await fileUploadPage.navigate();
  });

  test('uploaded file name is displayed after form submission', async () => {
    await fileUploadPage.uploadVirtualFile('Track_C.rtf', 'application/rtf', '{\\rtf1\\ansi Mock Content}');
    await fileUploadPage.clickUpload();

    await expect(fileUploadPage.uploadedFilesContainer, { message: 'Uploaded file name missing' }).toHaveText('Track_C.rtf');
  });
});