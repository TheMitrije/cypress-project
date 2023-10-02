class loginPage {
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginBtn: () => cy.get("#login-button"),
  };

  // M E T H O D S

  enterUsername(username) {
    this.elements.usernameInput().click().type(username);
  }

  enterPassword(password) {
    this.elements.passwordInput().click().type(password);
  }

  clickLogin() {
    this.elements.loginBtn().click();
  }
}

export default new loginPage();
