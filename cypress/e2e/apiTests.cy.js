describe("API", () => {
  let userId;
  let data;

  beforeEach(() => {
    cy.fixture("API").then((datas) => {
      data = datas;
    });
  });

  it("Create user", () => {
    cy.request("POST", "api/users", {
      name: data.userData.name,
      job: data.userData.job,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(data.userData.name);
      expect(response.body.job).to.eq(data.userData.job);
    });
  });

  it("Get user information", () => {
    cy.request("GET", "api/users/7").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers).to.not.eq(0);
      expect(response.body.data.id).to.eq(7);
      expect(response.body.data.first_name).to.eq(data.userDataTwo.name);
      return (userId = response.body.data.id);
    });
  });

  it("Update job of the user", () => {
    cy.request("PATCH", "api/users/", {
      job: data.userData.job,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.job).to.eq(data.userData.job);
    });
  });

  it("Delete the user", () => {
    cy.request("DELETE", "api/users/" + userId).then((response) => {
      expect(response.body).to.eq("")
    });
  });

  it("Unsuccessful login", () => {
    cy.request({
      method: "POST",
      url: "api/login",
      failOnStatusCode: false,
      body: { email: Cypress.env("email") },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error", "Missing password");
    });
  });
});
