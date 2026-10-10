import { test, expect } from '@playwright/test';

test.describe('Google Search Tests', () => {
  test('should display Google title', async ({ page }) => {
    // Navegar a Google
    await page.goto('https://www.google.es');
    
    // Manejar popup de cookies si aparece
    try {
      const cookiePopup = page.locator('div[role="dialog"]');
      if (await cookiePopup.count() > 0) {
        await cookiePopup.evaluate(el => el.scrollTop = 100);
        await page.getByButton('Aceptar todo').click({ timeout: 3000 });
      }
    } catch (error) {
      // Continuar si no hay popup
    }
    
    // Verificar que el título de la página contiene "Google"
    await expect(page).toHaveTitle(/Google/);
  });

  test('should have search input', async ({ page }) => {
    await page.goto('https://www.google.es');
    
    // Manejar popup de cookies si aparece
    try {
      const cookiePopup = page.locator('div[role="dialog"]');
      if (await cookiePopup.count() > 0) {
        await cookiePopup.evaluate(el => el.scrollTop = 100);
        await page.getByButton('Aceptar todo').click({ timeout: 3000 });
      }
    } catch (error) {
      // Continuar si no hay popup
    }
    
    // Verificar que existe el input de búsqueda
    const searchInput = page.getByRole('combobox', { name: 'Buscar' });
    await expect(searchInput).toBeVisible();
  });

  test('should search for Playwright', async ({ page }) => {
    await page.goto('https://www.google.es');
    
    // Manejar el popup de cookies si aparece
    try {
      const cookiePopup = page.locator('div[role="dialog"]');
      if (await cookiePopup.count() > 0) {
        // Hacer scroll hacia abajo para ver los botones
        await cookiePopup.evaluate(el => el.scrollTop = 100);
        await page.getByButton('Aceptar todo').click({ timeout: 3000 });
      }
    } catch (error) {
      // Si no aparece el popup o no se puede aceptar, continuamos
      console.log('No cookie popup found or could not accept');
    }
    
    // Escribir en el input de búsqueda
    const searchInput = page.getByRole('combobox', { name: 'Buscar' });
    await searchInput.fill('Playwright');
    
    // Pulsar Enter para buscar (más fiable que el botón)
    await searchInput.press('Enter');
    
    // Esperar a que aparezcan resultados y verificar que contiene "Playwright"
    await expect(page).toHaveTitle(/Playwright/);
    await expect(page.getByRole('heading')).toContainText('Playwright');
  });
});
