describe("Account Application | Pengajuan Akun", () => {
    before(() => {
        cy.exec("npx prisma migrate reset --force");
    });

    beforeEach(() => {
        cy.visit("/jadi-kontributor");
        cy.wait(500);
    });

    it("should be able to submit an account with an unregistered account", () => {
        cy.fixture("/users/kurator1.json").then((data) => {
            cy.get('input[data-cy="input-email"]').type(data.email);
        });
        cy.get('[data-cy="btn-next"]').should("be.enabled");
        cy.get('[data-cy="info-message"]').should("not.exist");
        cy.get('[data-cy="btn-next"]').click();
        cy.get(".text-2xl").should("contain.text", "Daftar");

        cy.fixture("/users/kurator1.json").then((data) => {
            cy.get('input[data-cy="input-nama-lengkap"]').type(
                data.nama_lengkap
            );
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
    });
    it("should be able to submit an account with an registered user account", () => {
        cy.fixture("/users/kurator2.json").then((data) => {
            cy.register(data);
            cy.visit("/jadi-kontributor");
            cy.get('input[data-cy="input-email"]').type(data.email);

            cy.get('[data-cy="btn-next"]').should("be.enabled");
            cy.get('[data-cy="info-message"]').should("exist");
            cy.get('[data-cy="btn-next"]').click();
            cy.get('[data-cy="input-deskripsi"]').should("be.visible");
            cy.get('[data-cy="input-deskripsi"]').type(data.deskripsi);
            cy.get('[data-cy="btn-submit"]').click();
            cy.contains("Pengajuan Berhasil!").should("exist");
        });
    });
    it("shouls not be able to apply for an account with an account that has already been applied for", () => {
        cy.fixture("/users/kurator2.json").then((data) => {
            cy.visit("/jadi-kontributor");
            cy.get('input[data-cy="input-email"]').type(data.email);

            cy.get('[data-cy="error-message"]').should("exist");
        });
    });
});
