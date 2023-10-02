import loginPage from "../pages/loginPage";
import pageLinks from "../pages/pageLinks";
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add("login", () => {
  pageLinks.loginpage();
  loginPage.enterUsername(Cypress.env("username"));
  loginPage.enterPassword(Cypress.env("password"));
  loginPage.clickLogin();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
