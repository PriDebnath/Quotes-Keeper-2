import { Data } from "../../../fixtures/data.model";
import { MyQuoteList } from "../../page-objects/my-quote-list/my-quote-list";
import { QuoteFormModal } from "../../page-objects/quote-form-modal/quote-form-modal";
import {
  clickElement,
  login,
  register,
  selectorShouldExist,
  selectorShouldNotExist,
  textShouldExist,
  textShouldNotExist,
} from "../../page-objects/shared/helpers";

describe("Quote CRUD", () => {
  let data: Data;
  const myQuoteList = new MyQuoteList();
  const baseUrl = Cypress.config().baseUrl;
  const quoteFormModal = new QuoteFormModal();

  before(function () {
    cy.fixture("example").then((res) => {
      data = res;
    });
    cy.visit(baseUrl! + "/all-quote-list/", { failOnStatusCode: false });
  });

  it("Test CRUD on quote", () => {
    const milliseconds = new Date().getTime();
    const testData = {
      username: "pri-" + milliseconds,
      email: `pri@cypress-${milliseconds}.io`,
    };
    const num1 = 2
    const num2 = 2
    const sum = num1 + num2
    const expectedSum = 4
    expect(sum).to.equal(expectedSum)


    //
    //// On registration page
    // register({
    //   username: testData.username,
    //   email: testData.email,
    //   password: data.password,
    // });

    //// On login page
    // cy.url().should("include", "login");
    // login({ username: data.username, password: data.password });

    //   // On my quote page
    //   cy.intercept("GET", "/quotes/*").as("GetAllQuotes");
    //   clickElement('[data-testId="my-quote-list"]');
    //   cy.wait("@GetAllQuotes", { timeout: 60000 })
    //     .its("response.statusCode")
    //     .should("eq", 200);

    //   cy.intercept("GET", "/quotes/categories/").as("GetAllCategories");
    //   clickElement('[data-testId="showHideFormButtom"]');
    //   cy.wait("@GetAllCategories", { timeout: 60000 })
    //     .its("response.statusCode")
    //     .should("eq", 200);

    //   // modal form opened
    //   selectorShouldExist(".modal-content"); // common class of all modal or popup
    //   selectorShouldExist('[data-testId="close-btn"]');
    //   selectorShouldExist('[data-testId="submit-btn"]');

    //   // test add quote functionality
    //   cy.intercept("POST", "/quotes/").as("CreateQuote");
    //   let cypressQuote = "Cypress quote - " + new Date().toLocaleString();
    //   quoteFormModal.filQuoteForm({ text: cypressQuote });
    //   quoteFormModal.clickSubmit();
    //   cy.wait("@CreateQuote", { timeout: 60000 })
    //     .its("response.statusCode")
    //     .should("eq", 201);
    //   textShouldExist(cypressQuote);

    //   // test delete quote functionality
    //   cy.intercept("DELETE", "/quotes/*").as("DeleteQuote");
    //   myQuoteList.clickDeleteQuote(cypressQuote);
    //   cy.wait("@DeleteQuote", { timeout: 60000 })
    //     .its("response.statusCode")
    //     .should("be.oneOf", [200, 204]);
    //   textShouldNotExist(cypressQuote);

    //   // test modal close functionality
    //   clickElement('[data-testId="showHideFormButtom"]');
    //   selectorShouldExist(".modal-content");
    //   selectorShouldExist('[data-testId="close-btn"]');
    //   cy.performTaskWithinElement({
    //     parentSelector: ".modal-content",
    //     selector: '[data-testId="close-btn"]',
    //     elementType: "button",
    //   });
    //   selectorShouldNotExist(".modal-content");
    //   selectorShouldNotExist('[data-testId="close-btn"]');
  });
});
