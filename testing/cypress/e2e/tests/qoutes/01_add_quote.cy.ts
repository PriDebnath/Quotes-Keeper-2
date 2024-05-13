import { Data } from "../../../fixtures/data.model";
import {
  clickElement,
  login,
  register,
} from "../../page-objects/shared/helpers";

describe("Add Quote", () => {
  let data: Data; 
  const baseUrl = Cypress.config().baseUrl;

  before(function () {
    cy.fixture("example").then((res) => {
      data = res;
    });
  });

  it("passes", () => {
    const milliseconds = new Date().getTime();
    const testData = {
      username: "pri-" + milliseconds,
      email: `pri@cypress-${milliseconds}.io`,
    };
    register({
      username: testData.username,
      email: testData.email,
      password: data.password,
    });

    cy.url().should("include", "login");
    login({ username: testData.username, password: data.password });

    // On my quote page
    cy.intercept("GET", "/quotes/*").as("GetAllQuotes");
    clickElement('[data-testId="my-quote-list"]');
    cy.wait("@GetAllQuotes", { timeout: 60000 })
      .its("response.statusCode")
      .should("eq", 200);
  });
});
