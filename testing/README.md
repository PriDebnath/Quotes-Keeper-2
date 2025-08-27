# Cypress Crash Course

### 🔹 Part 1: What is Cypress?

❓ Q: What is Cypress?

> ✅ A: Cypress is a modern end-to-end testing framework built for the web. It lets you write tests in JavaScript to simulate how a user would interact with your web app — such as typing, clicking, and asserting what's visible.

Key Features:

> - Real browser testing (Chrome, Edge, Electron)
> - Automatic waits (no sleep)
> - Live GUI with time-travel debugging
> - Supports unit, integration, and API testing
> - Great DX: test runner, screenshots, video support

---
---
### 🔹 Part 2: How to set it up ?

❓ Q: How to install Cypress?
```bash
npm install cypress --save-dev
npx cypress open
```
---
❓ Q: What is the Cypress folder structure?
```bash
cypress/
├── e2e/         ← test specs go here
├── fixtures/    ← JSON/mock data
├── support/     ← reusable commands & setup

```
---
---
### 🔹 Part 3: Core Cypress Commands

❓ Q: How do you visit a page/URL?
```js
cy.visit('/login');
```
---
❓ Q: How do you check URL?
```js
cy.url().should('include', '/dashboard');
```
---

❓ Q: How do you type into an element?
```js
cy.get('#email').type('test@example.com');
```
---
❓ Q: How do you check values?
```js
cy.get('#email').should('have.value', 'test@example.com');
```
---

❓ Q: How do you click a element?
```js
cy.contains('Submit').click();
```
---
❓ Q: How do you click a button element?
```js
cy.contains('button', 'Submit').click();
```
---
❓ Q: How do you check text?
```js
cy.get('.button').should('contain', 'Submit');
```
---

❓ Q: What selector should we prefer?
> ✅ Use `data-testid` or `data-cy` to make tests more stable. Avoid using brittle CSS like `.card > div:nth-child(2)`.
```js
❌ cy.get('.card > div:nth-child(2)').should('contain', 'test@example.com');
✅ cy.get('[data-testid="user-email"]').should('contain', 'test@example.com');
```
---
---
### 🔹 Part 4: Assertions & Conditions

❓ Q: How do you check if an element is visible?
```js
cy.get('.alert').should('be.visible');
```
or
```js
cy.get('.alert').should('exists');
```
---
❓ Q: How do you check the number(3) of elements in a list?
```js
cy.get('ul > li').should('have.length', 3);
```
---
❓ Q: How do you check element's values?
```js
cy.get('#email').should('have.value', 'test@example.com');
```
---
❓ Q: How do you check element's content?
```js
cy.get('.status').should('contain', 'Active');
```
or 
```js
cy.get('.status').then(($el) => {
expect($el.text()).to.equal('Active');
});
```
---
---
### 🔹 Part 5: Fixtures & Data-Driven Testing

❓ Q: What is a fixture in Cypress?
> ✅ A fixture is a static data file (like JSON) used to provide input or mock data for tests.

> Step 1: Create `cypress/fixtures/user.json`
```js
{
  "username": "pritam",
  "password": "SuperSecretPassword!"
}
```
> Step 2: Load and use fixture
```js
beforeEach(function () {
  cy.fixture('user').then((user) => {
    this.user = user;
  });
});

it('logs in using fixture', function () {
  cy.visit('/login');
  cy.get('#username').type(this.user.username);
  cy.get('#password').type(this.user.password);
  cy.get('button[type="submit"]').click();
});

```
---
---
### 🔹 Part 6: Intercept & Network Requests
❓ Q: How to intercept a network request?
```js
cy.intercept('POST', '/api/login').as('login');

cy.get('button[type="submit"]').click();
cy.wait('@login').its('response.statusCode').should('eq', 200);

```
---
❓ Q: How to intercept a network request and mock it?
```js
cy.intercept('POST', '/api/login', {
  statusCode: 200,
  body: { token: 'fake-jwt-token' },
}).as('login');

cy.get('button[type="submit"]').click();
cy.wait('@login').its('response.statusCode').should('eq', 200);
```
---
❓ Q: How to simulate a failed login response?
```js
cy.intercept('POST', '/api/login', {
  statusCode: 401,
  body: { message: 'Unauthorized' }
}).as('failLogin');

cy.get('#submit').click();
cy.get('.error').should('contain', 'Unauthorized');
```
---
---

### 🔹 Part 7: Custom Commands & Reuse

❓ Q: Why use custom commands?
> ✅ A: To avoid repeating login/signup steps in every test
---
❓ Q: How to define and use a custom command?
> In `cypress/support/commands.js`:
```js
Cypress.Commands.add('login', (username, password) => {
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
});

```
> Use in test
```js
cy.visit('/login');
cy.login('pritam', 'SuperSecretPassword!');

```
---
---

### 🔹 Part 8: Debugging Tools
❓ Q: How to debug a failing test?

✅ Use:
```js
cy.get('input').debug();
cy.pause();
cy.log('Step reached!');
```
- Use the Cypress Test Runner UI
- Time-travel through commands
- Screenshots/videos saved on failure in `cypress/screenshots` and `cypress/videos`

---
---
### 🔹 Part 9: Running in CI
❓ Q: How to run tests headlessly in CLI?
```js
npx cypress run
```
---
❓ Q: Sample GitHub Action for Cypress
```yaml
name: Run Cypress Tests
