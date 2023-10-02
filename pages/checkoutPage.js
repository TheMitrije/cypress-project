class checkoutPage {
  elements = {
    cartQuantity: () => cy.get(".cart_quantity"),
    summaryQuantity: () => cy.get(".summary_quantity"),
    checkoutSubheader: () => cy.get(".subheader"),
    checkoutFirstName: () => cy.get('[data-test="firstName"]'),
    checkoutLastName: () => cy.get('[data-test="lastName"]'),
    checkoutZipCode: () => cy.get('[data-test="postalCode"]'),
    checkoutCompleteHeader: () => cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER'),
    checkoutImage: () => cy.get('.pony_express').should('have.attr', 'src', 'img/pony-express.png')
  };

  // M E T H O D S

  checkoutOrder() {
    cy.get(".btn_action").click();
  }

  continueOrder() {
    cy.get(".btn_primary").should("have.value", "CONTINUE").click();
  }

  finishOrder() {
    cy.get('.btn_action').should("have.text", "FINISH").click()
  }

  subTotalPriceSum() {
    cy.get(".inventory_item_price")
      .then(($price) => {
        const text = Cypress._.map($price, (p) => p.innerText);
        const justDigits = (str) => str.replace(/[^0-9.]/g, "");
        const almostNumbers = text.map(justDigits);
        const numbers = almostNumbers.map(parseFloat);
        let sum = 0;
        for (let i = 0; i < numbers.length; i++) {
          sum += numbers[i];
        }
        return sum;
      })
      .then((compare) => {
        cy.get(".summary_subtotal_label").then(($price) => {
          const text = Cypress._.map($price, (p) => p.innerText);
          const thirdWord = (text) => text.split(" ")[2];
          const words = text.map(thirdWord);
          const justDigits = (str) => str.replace(/[^0-9.]/g, "");
          const almostNumbers = words.map(justDigits);
          const numbers = almostNumbers.map(parseFloat);
          expect(compare).to.deep.equal(numbers[0]);
        });
      });
  }
}

export default new checkoutPage();
