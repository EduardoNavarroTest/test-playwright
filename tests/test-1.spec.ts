import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test.puertocartagena.com/test-sprconline_7/SPRCOnLine.nsf/acceso?OpenForm');
  await page.locator('input[name="Username"]').click();
  await page.locator('input[name="Username"]').fill('');
  await page.locator('input[name="Username"]').press('CapsLock');
  await page.locator('input[name="Username"]').fill('EDUARDOTRA');
  await page.locator('input[name="Username"]').press('Tab');
  await page.locator('input[name="Password"]').fill('123456');
  await page.locator('input[name="Password"]').press('Tab');
  await page.getByRole('link', { name: 'Olvido su contraseña?' }).press('Tab');
  await page.getByRole('button', { name: 'Enviar' }).click();
  await page.locator('frame[name="main"]').contentFrame().getByRole('radio', { name: 'TRANSPORTES LA ESTRELLA SAS (' }).check();
  await page.locator('frame[name="main"]').contentFrame().getByRole('button', { name: 'Submit' }).click();
  await page.locator('frame[name="nav"]').contentFrame().getByRole('link', { name: 'Importaciones' }).click();
  await page.locator('frame[name="nav"]').contentFrame().getByRole('link', { name: 'Transportadores' }).click();
  await page.locator('frame[name="main"]').contentFrame().getByRole('link', { name: 'TIA - Asignación de Conductor' }).click();
  await page.locator('frame[name="main"]').contentFrame().locator('#ext-gen56').click();
  await page.locator('frame[name="main"]').contentFrame().getByText('OTM').click();
  await page.locator('frame[name="main"]').contentFrame().locator('#ext-gen69').click();
  await page.locator('frame[name="main"]').contentFrame().getByText('SOC PORTUARIA REG CARTAGENA').click();
  await page.locator('frame[name="main"]').contentFrame().getByRole('textbox', { name: 'Autorizacion:' }).click();
  await page.locator('frame[name="main"]').contentFrame().getByRole('textbox', { name: 'Autorizacion:' }).fill('401000141');
  await page.locator('frame[name="main"]').contentFrame().getByRole('button', { name: 'Consultar' }).click();
  await page.locator('frame[name="main"]').contentFrame().getByText('La autorizacion esta usada').click();
  await expect(page.locator('frame[name="main"]').contentFrame().locator('#onlineMessageBox')).toContainText('La autorizacion esta usada');
  await page.locator('frame[name="nav"]').contentFrame().getByRole('link', { name: 'Salir' }).click();
  await page.locator('frame[name="main"]').contentFrame().getByRole('button', { name: 'Salir' }).click();

});