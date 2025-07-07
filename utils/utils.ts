import { Locator, Page, TestInfo } from '@playwright/test';
import fs from 'fs';

export async function snap(page: Page, testInfo: TestInfo, label: string) {
  const testName = testInfo.title.replace(/\s+/g, '_');
  const dir = `screenshots/${testName}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = `${dir}/${Date.now()}_${label}.png`;

  await page.screenshot({ path: filePath, fullPage: true });

  await testInfo.attach(label, {
    path: filePath,
    contentType: 'image/png',
  });
}

export async function highlightAndSnapBeforeClick(locator: Locator, testInfo: TestInfo, label: string) {
    const page = locator.page();
    const testName = testInfo.title.replace(/\s+/g, '_');
    const dir = `screenshots/${testName}`;
  
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  
    const path = `${dir}/${Date.now()}_${label}.png`;
  
    // Inyecta estilo para resaltar el elemento
    await locator.evaluate((el) => {
      el.style.outline = '3px solid red';
      el.style.transition = 'outline 0.2s';
      el.scrollIntoView({ behavior: 'auto', block: 'center' });
    });
  
    // Espera un poco para que el borde se vea
    await page.waitForTimeout(200);
  
    await page.screenshot({ path, fullPage: true });
  
    await testInfo.attach(label, {
      path,
      contentType: 'image/png',
    });
  
    // Remueve el borde visual
    await locator.evaluate((el) => {
      el.style.outline = '';
    });
  
    // Finalmente hace click
    await locator.click();
  }
