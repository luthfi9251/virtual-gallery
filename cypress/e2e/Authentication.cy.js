describe("Authentication", () => {
    beforeEach(() => {
        cy.visit("/login");
        cy.wait(500);
    });

    before(() => {
        cy.exec("npx prisma migrate reset --skip-generate --force");
    });

    it("should success login with right credentials", () => {
        cy.get('input[data-cy="input-email"]').type("admin@admin.com");
        cy.get('input[data-cy="input-password"]').type("passwordadmin");
        cy.get('button[data-cy="btn-login"]').click();
        cy.location("pathname").should("equal", "/");
    });

    it("should failed login with wrong credentials and show error element", () => {
        cy.get('input[data-cy="input-email"]').type("admin@admin.com");
        cy.get('input[data-cy="input-password"]').type("passwordadmin123");
        cy.get('button[data-cy="btn-login"]').click();
        cy.get('[data-cy="error-message"]').should("be.visible");
    });

    it("should success register user with right credentials", () => {
        cy.get('[data-cy="link-to-register"]').click();
        cy.url().should("contain", "/login?action=register");
        cy.fixture("/users/person.json").then((data) => {
            cy.get('[data-cy="input-nama-lengkap"]').type(data.nama_lengkap);
            cy.get('[data-cy="input-email"]').type(data.email);
            cy.get('[data-cy="input-username"]').type(data.username);
            cy.get('[data-cy="input-tempat-lhr"]').type(data.tempat_lhr);
            cy.get('[data-cy="input-tgl-lhr"]').type(data.tgl_lhr);
            cy.get('[data-cy="input-password"]').type(data.password);
            cy.get('[data-cy="input-confirm-password"]').type(data.password);
        });
        cy.get('[data-cy="btn-register"]').click();
        cy.location("pathname").should("equal", "/");
    });

    it("should failed register user with existing username and email", () => {
        cy.get('[data-cy="link-to-register"]').click();
        cy.url().should("contain", "/login?action=register");
        cy.fixture("/users/person.json").then((data) => {
            cy.get('[data-cy="input-nama-lengkap"]').type(data.nama_lengkap);
            cy.get('[data-cy="input-email"]').type(data.email);
            cy.get('[data-cy="input-username"]').type(data.username);
            cy.get('[data-cy="input-tempat-lhr"]').type(data.tempat_lhr);
            cy.get('[data-cy="input-tgl-lhr"]').type(data.tgl_lhr);
            cy.get('[data-cy="input-password"]').type(data.password);
            cy.get('[data-cy="input-confirm-password"]').type(data.password);
        });
        cy.get('[data-cy="btn-register"]').click();
        cy.get('[data-cy="error-message"]').should("be.visible");
        cy.location("pathname").should("not.equal", "/");
    });
});
