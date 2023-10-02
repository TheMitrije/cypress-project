class pageLinks {
  elements = {
    checkoutPageUrl: () =>
      cy.url().should("include", "/checkout-step-one.html"),
    checkoutPageUrlTwo: () =>
      cy.url().should("include", "/checkout-step-two.html"),
    checkoutCompletePage: () =>
      cy.url().should("include", "/checkout-complete.html"),
    inventoryPageUrl: () => cy.url().should('include', '/v1/inventory.html'),
  };

  // M E T H O D S

  loginpage() {
    return cy.visit("https://www.saucedemo.com/v1/index.html");
  }

  inventoryPage() {
    return cy.visit("https://www.saucedemo.com/v1/inventory.html");
  }
}

export default new pageLinks();
