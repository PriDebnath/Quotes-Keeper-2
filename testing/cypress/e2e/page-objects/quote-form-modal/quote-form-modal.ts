export class QuoteFormModal {
  filQuoteForm(data: { text: string }) {
    cy.performTaskWithinElement({
      parentSelector: ".modal-content",
      selector: '[formControlName="text"]',
      elementType: "input",
      content: data.text,
    });
  }

  clickSubmit() {
    cy.performTaskWithinElement({
      parentSelector: ".modal-content",
      selector: '[data-testid="submit-btn"]',
      elementType: "button",
    });
  }
}
