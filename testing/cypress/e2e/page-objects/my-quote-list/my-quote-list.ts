import { clickElement } from "../shared/helpers";

export class MyQuoteList {
  clickDeleteQuote(quote: string) {
    cy.contains(quote, { matchCase: false })
      .eq(0)
      .parents('[data-testid="quote-card"]')
      .within(() => {
        clickElement('[data-testid="delete-quote-btn"]');
      });
  }
}
