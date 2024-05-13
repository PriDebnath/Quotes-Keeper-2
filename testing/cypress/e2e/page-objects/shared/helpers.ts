const baseUrl = Cypress.config().baseUrl;

export const login = (data: { username: string; password: string }) => {
  cy.visit(baseUrl! + "/auth/login/", { failOnStatusCode: false });

  cy.intercept("POST", "/accounts/auth/login/").as("jwtTokenRequest");
  clearElement('[formControlName="username"]');
  clearElement('[formControlName="password"]');
  typeIntoElement('[formControlName="username"]', data.username);
  typeIntoElement('[formControlName="password"]', data.password);

  clickElement('[data-testId="login-btn"]');

  cy.wait("@jwtTokenRequest", { timeout: 60000 })
    .its("response.statusCode")
    .should("eq", 200);
};

export const register = (data: {
  username: string;
  email: string;
  password: string;
}) => {
  cy.visit(baseUrl! + "/auth/registration/", { failOnStatusCode: false });

  cy.intercept("POST", "/accounts/registration/").as("registration");

  clearElement('[formControlName="username"]');
  clearElement('[formControlName="email"]');
  clearElement('[formControlName="password"]');

  typeIntoElement('[formControlName="username"]', data.username);
  typeIntoElement('[formControlName="email"]', data.email);
  typeIntoElement('[formControlName="password"]', data.password);

  clickElement('[data-testId="registration-btn"]');

  cy.wait("@registration", { timeout: 60000 })
    .its("response.statusCode")
    .should("eq", 201);
};

export const selectorShouldExist = (selector: string) => {
  cy.get(selector, { timeout: 10000 })
    .should("exist")
    .eq(0)
    .scrollIntoView({ easing: "linear" });
};

export const selectorShouldNotExist = (selector: string) => {
  cy.get(selector, { timeout: 10000 }).should("not.exist");
};

export const selectorShouldContainText = (selector: string, text: string) => {
  cy.get(selector, { timeout: 10000 }).should("contain", text);
};

export const clickElement = (selector: string) => {
  cy.get(selector, { timeout: 20000 })
    .eq(0)
    .should("exist")
    .scrollIntoView()
    .click({ force: true });
};

export const clickMultipleElement = (selector: string) => {
  cy.get(selector, { timeout: 15000 })
    .should("exist")
    .click({ multiple: true, force: true }); // \('o')/;
};

export const clickText = (text: string) => {
  cy.contains(text, { matchCase: false, timeout: 30000 })
    .eq(0)
    .should("exist")
    .scrollIntoView()
    .click({ force: true });
};

export const textShouldExist = (text: string) => {
  cy.contains(text, { matchCase: false, timeout: 20000 })
    .eq(0)
    .should("exist")
    .scrollIntoView();
};

export const textShouldNotExist = (text: string) => {
  cy.contains(text, { matchCase: false, timeout: 10000 }).should("not.exist");
};

export const foundSelector = (selector: string): boolean | undefined => {
  let isSelectorFound;
  cy.get("body", { timeout: 10000 }).then(($body) => {
    if ($body.find(selector).length == 0) {
      isSelectorFound = false;
      cy.get("body").should("exist");
    } else {
      isSelectorFound = true;
      cy.get("body").should("exist");
    }
  });
  return isSelectorFound;
};

export const foundText = (text: string): boolean | undefined => {
  let isTextFound;
  cy.get("body", { timeout: 10000 }).then(($body) => {
    if ($body.text().includes(text)) {
      isTextFound = true;
      cy.get("body").should("exist");
    } else {
      isTextFound = false;
      cy.get("body").should("exist");
    }
  });
  return isTextFound;
};

export const elementShouldHaveLengthGreaterThan = (
  selector: string,
  expectedCount: number
) => {
  cy.get(selector).should("have.length.greaterThan", expectedCount);
};

export const typeIntoElement = (selector: string, text: string) => {
  cy.get(selector, { timeout: 10000 }).eq(0).scrollIntoView().should("exist");
  cy.get(selector, { timeout: 10000 }).eq(0).click({ force: true });
  cy.get(selector, { timeout: 10000 })
    .eq(0)
    .type(text, { force: true, delay: 0 });
};

export const clearElement = (selector: string) => {
  cy.get(selector, { timeout: 10000 })
    .eq(0)
    .scrollIntoView()
    .should("exist")
    .click({ force: true })
    .clear({ force: true });
};

export const inputFileIntoElement = (selector: string, filePath: string) => {
  cy.get(selector, { timeout: 10000 })
    .eq(0)
    .scrollIntoView()
    .selectFile(filePath, { action: "drag-drop", force: true });
};

export const elementShouldHaveClass = (selector: string, className: string) => {
  cy.get(selector, { timeout: 10000 }).eq(0).should("have.class", className);
};

export const elementShouldNotHaveClass = (
  selector: string,
  className: string
) => {
  cy.get(selector, { timeout: 10000 })
    .eq(0)
    .should("not.have.class", className);
};

export const scrollLastElementIntoView = (selector: string) => {
  // scroll the last element into view to trigger scrolling for pagination
  cy.get("body", { timeout: 10000 }).then((body) => {
    cy.wait(1000);
    if (body.find(selector).length) {
      cy.get(selector, { timeout: 10000 })
        .should("exist")
        .last()
        .scrollIntoView({ easing: "swing", duration: 100 });
    }
  });
};

//  @modal or @popup helpers starts

export const clickModalElement = (selector: string) => {
  cy.performTaskWithinElement({
    parentSelector: ".modal-content",
    selector,
    elementType: "button",
  });
};

export const clickModalText = (text: string) => {
  cy.wait(100);
  cy.get("body").then(($body) => {
    cy.get(".modal-content", { timeout: 20000 })
      .last()
      .within(($el) => {
        cy.contains(text, { matchCase: false, timeout: 20000 })
          .eq(0)
          .should("exist")
          .scrollIntoView()
          .click({ force: true });
      });
  });
};

export const selectorShouldExistInsideModal = (selector: string) => {
  cy.wait(100);
  cy.get("body").then(($body) => {
    cy.get(".modal-content", { timeout: 10000 })
      .last()
      .within(($el) => {
        cy.get(selector, { timeout: 10000 })
          .should("exist")
          .scrollIntoView({ easing: "linear" });
      });
  });
};

export const selectorShouldNotExistInsideModal = (selector: string) => {
  cy.wait(100);
  cy.get("body").then(($body) => {
    cy.get(".modal-content", { timeout: 10000 })
      .last()
      .within(($el) => {
        cy.get(selector, { timeout: 10000 }).should("not.exist");
      });
  });
};

export const typeIntoModalElement = (selector: string, text: string) => {
  cy.performTaskWithinElement({
    parentSelector: ".modal-content",
    selector,
    elementType: "input",
    content: text,
  });
};

export const textShouldExistInsideModal = (text: string) => {
  cy.wait(100);
  cy.get("body").then(($body) => {
    cy.get(".modal-content", { timeout: 10000 })
      .last()
      .within(($el) => {
        cy.contains(text, { matchCase: false, timeout: 10000 })
          .eq(0)
          .should("exist")
          .scrollIntoView();
      });
  });
};

//  @modal or @popup helpers ends
