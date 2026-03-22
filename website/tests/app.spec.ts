import { test, expect } from '@playwright/test';

test.describe('Paper Explorer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="controls"]', { timeout: 10000 });
  });

  test('page loads with title', async ({ page }) => {
    await expect(page).toHaveTitle(/Paper Explorer/);
  });

  test('controls bar is visible', async ({ page }) => {
    await expect(page.locator('[data-testid="controls"]')).toBeVisible();
  });

  test('shows Paper Explorer label', async ({ page }) => {
    await expect(page.getByText('Paper Explorer')).toBeVisible();
  });

  test('shows view mode buttons', async ({ page }) => {
    await expect(page.locator('[data-testid="view-cluster"]')).toBeVisible();
    await expect(page.locator('[data-testid="view-tree"]')).toBeVisible();
    await expect(page.locator('[data-testid="view-timeline"]')).toBeVisible();
  });

  test('shows search input', async ({ page }) => {
    await expect(page.locator('[data-testid="search-input"]')).toBeVisible();
  });

  test('shows year slider', async ({ page }) => {
    await expect(page.locator('[data-testid="year-slider"]')).toBeVisible();
  });

  test('topic dropdown opens and shows filters', async ({ page }) => {
    await page.locator('[data-testid="topic-dropdown"]').click();
    const topicFilters = page.locator('[data-testid="topic-filters"]');
    await expect(topicFilters).toBeVisible();
    // Should have 9 topic filter buttons
    const buttons = topicFilters.locator('[data-testid^="topic-filter-"]');
    await expect(buttons).toHaveCount(9);
  });

  test('graph container is visible', async ({ page }) => {
    await expect(page.locator('[data-testid="graph-container"]')).toBeVisible();
  });

  test('renders nodes in the graph', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 });
    const count = await page.locator('.react-flow__node').count();
    expect(count).toBeGreaterThan(10);
  });

  test('switching to tree view works', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 });
    await page.locator('[data-testid="view-tree"]').click();
    await page.waitForTimeout(500);
    const count = await page.locator('.react-flow__node').count();
    expect(count).toBeGreaterThan(10);
  });

  test('switching to timeline view works', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 });
    await page.locator('[data-testid="view-timeline"]').click();
    await page.waitForTimeout(500);
    const count = await page.locator('.react-flow__node').count();
    expect(count).toBeGreaterThan(10);
  });

  test('search filters nodes', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 });
    const initialCount = await page.locator('.react-flow__node').count();
    await page.locator('[data-testid="search-input"]').fill('LAPA');
    await page.waitForTimeout(500);
    const filteredCount = await page.locator('.react-flow__node').count();
    expect(filteredCount).toBeLessThan(initialCount);
  });

  test('clicking a node opens sidebar', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 });
    await page.locator('.react-flow__node').first().click();
    await page.waitForTimeout(300);
    await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();
  });

  test('sidebar can be closed', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 });
    await page.locator('.react-flow__node').first().click();
    await page.waitForTimeout(300);
    await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();
    await page.locator('[data-testid="sidebar-close"]').click();
    await page.waitForTimeout(300);
    await expect(page.locator('[data-testid="sidebar"]')).not.toBeVisible();
  });

  test('topic filter toggles nodes', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 });
    const initialCount = await page.locator('.react-flow__node').count();
    // Open topic dropdown and toggle first topic
    await page.locator('[data-testid="topic-dropdown"]').click();
    await page.locator('[data-testid^="topic-filter-"]').first().click();
    await page.waitForTimeout(500);
    const filteredCount = await page.locator('.react-flow__node').count();
    expect(filteredCount).toBeLessThan(initialCount);
  });

  test('influence toggle shows influence edges', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 });
    const edgesBefore = await page.locator('.react-flow__edge').count();
    await page.locator('[data-testid="influence-toggle"]').click();
    await page.waitForTimeout(500);
    const edgesAfter = await page.locator('.react-flow__edge').count();
    expect(edgesAfter).toBeGreaterThan(edgesBefore);
  });

  test('double-click topic node collapses its papers', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 });
    const initialCount = await page.locator('.react-flow__node').count();
    const topicNode = page.locator('.react-flow__node-topicNode').first();
    await topicNode.dispatchEvent('dblclick');
    await page.waitForTimeout(500);
    const collapsedCount = await page.locator('.react-flow__node').count();
    expect(collapsedCount).toBeLessThan(initialCount);
  });

  test('double-click collapsed topic expands it back', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 });
    const initialCount = await page.locator('.react-flow__node').count();
    const topicNode = page.locator('.react-flow__node-topicNode').first();
    await topicNode.dispatchEvent('dblclick');
    await page.waitForTimeout(500);
    await topicNode.dispatchEvent('dblclick');
    await page.waitForTimeout(500);
    const expandedCount = await page.locator('.react-flow__node').count();
    expect(expandedCount).toBe(initialCount);
  });

  test('re-layout button exists', async ({ page }) => {
    await expect(page.locator('[data-testid="reset-layout"]')).toBeVisible();
  });

  test('nodes are draggable (have draggable class)', async ({ page }) => {
    await page.waitForSelector('.react-flow__node', { timeout: 10000 });
    const draggableNode = page.locator('.react-flow__node.draggable').first();
    await expect(draggableNode).toBeVisible();
  });
});
