class productDetailsPage {
  // M E T H O D S

  itemName(name) {
    cy.get(".inventory_details_name").should("have.text", name);
  }

  itemDesc(desc) {
    cy.get(".inventory_details_desc").should("contain.text", desc);
  }

  removeButton() {
    cy.get(".btn_secondary").contains("REMOVE").click();
  }
}

export default new productDetailsPage();
