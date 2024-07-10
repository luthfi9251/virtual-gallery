// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, pass) => {
    cy.visit("/login");
    cy.wait(500);
    cy.get('input[data-cy="input-email"]').type(email);
    cy.get('input[data-cy="input-password"]').type(pass);
    cy.get('button[data-cy="btn-login"]').click();
    cy.location("pathname").should("equal", "/");
});

Cypress.Commands.add("register", (data) => {
    cy.visit("/login?action=register");
    cy.wait(500);
    cy.url().should("contain", "/login?action=register");
    cy.get('[data-cy="input-nama-lengkap"]').type(data.nama_lengkap);
    cy.get('[data-cy="input-email"]').type(data.email);
    cy.get('[data-cy="input-username"]').type(data.username);
    cy.get('[data-cy="input-tempat-lhr"]').type(data.tempat_lhr);
    cy.get('[data-cy="input-tgl-lhr"]').type(data.tgl_lhr);
    cy.get('[data-cy="input-password"]').type(data.password);
    cy.get('[data-cy="input-confirm-password"]').type(data.password);
    cy.get('[data-cy="btn-register"]').click();
    cy.location("pathname").should("equal", "/");
});

Cypress.Commands.add("accountApply", (data, type = "kontributor") => {
    cy.visit(`/jadi-kontributor?type=${type}`);
    cy.wait(500);
    cy.get('input[data-cy="input-email"]').type(data.email);
    cy.get('[data-cy="btn-next"]').should("be.enabled");
    cy.get('[data-cy="info-message"]').should("not.exist");
    cy.get('[data-cy="btn-next"]').click();
    cy.get(".text-2xl").should("contain.text", "Daftar");
    cy.wait(500);
    cy.get('input[data-cy="input-nama-lengkap"]').type(data.nama_lengkap);
    cy.get('input[data-cy="input-username"]').type(data.username);
    cy.get('input[data-cy="input-tempat-lhr"]').type(data.tempat_lhr);
    cy.get('input[data-cy="input-tgl-lhr"]').type(data.tgl_lhr);
    cy.get('[data-cy="input-password"]').type(data.password);
    cy.get('[data-cy="input-confirm-password"]').type(data.password);
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="error-msg"]').should("not.exist");
    cy.wait(500);
    cy.get('[data-cy="input-deskripsi"]').should("be.visible");
    cy.get('[data-cy="input-deskripsi"]').type(data.deskripsi);
    cy.get('[data-cy="btn-submit"]').click();
    cy.contains("Pengajuan Berhasil!").should("exist");
});
