import { test, expect } from '@playwright/test';

/**
 * API tests against https://reqres.in — a free public API made for testing practice.
 * These tests don't open a browser at all; Playwright's `request` fixture
 * sends raw HTTP calls, which is much faster than UI tests.
 */
const API_BASE = 'https://reqres.in/api';

// reqres.in now requires an API key on every request; without it, all calls
// return 401. The free public key is documented on reqres.in itself.
test.use({
  extraHTTPHeaders: {
    'x-api-key': 'reqres-free-v1',
  },
});

test.describe('Users API', () => {
  test('GET /users/2 returns a single user', async ({ request }) => {
    const response = await request.get(`${API_BASE}/users/2`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data).toHaveProperty('email');
  });

  test('GET /users?page=2 returns a paginated list', async ({ request }) => {
    const response = await request.get(`${API_BASE}/users?page=2`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.page).toBe(2);
    expect(Array.isArray(body.data)).toBeTruthy();
  });

  test('POST /users creates a new user', async ({ request }) => {
    const response = await request.post(`${API_BASE}/users`, {
      data: { name: 'Jane Smith', job: 'QA Engineer' },
    });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe('Jane Smith');
    expect(body).toHaveProperty('id');
  });

  test('PUT /users/2 updates an existing user', async ({ request }) => {
    const response = await request.put(`${API_BASE}/users/2`, {
      data: { name: 'Jane Updated', job: 'Senior QA Engineer' },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.job).toBe('Senior QA Engineer');
  });

  test('DELETE /users/2 removes a user', async ({ request }) => {
    const response = await request.delete(`${API_BASE}/users/2`);
    expect(response.status()).toBe(204);
  });

  test('GET /users/23 for a non-existent user returns 404', async ({ request }) => {
    const response = await request.get(`${API_BASE}/users/23`);
    expect(response.status()).toBe(404);
  });
});