describe("Verification Admin Apply | Verifikasi Akun Kontributor", () => {
    before(() => {
        cy.exec("npx prisma migrate reset --force");

        cy.fixture("users/kurator1.json").then((data) => {
            cy.accountApply(data, "pelukis");
        });
        cy.fixture("users/kurator2.json").then((data) => {
            cy.accountApply(data, "kurator");
        });
    });

    beforeEach(() => {
        cy.login("admin@admin.com", "passwordadmin");
        cy.get('[data-cy="btn-profile"]').first().click();
        cy.get('[data-cy="link-to-dadmin"]').click();
        cy.wait(500);
    });

    it("should be able to verify the pelukis account", () => {
        cy.location("pathname").should("equal", "/a/dashboard");
        cy.wait(500);
        cy.contains("a", "Verfikasi Akun").click();
        cy.get('[href="/a/dashboard/verifikasi-pelukis"]').click();
        cy.location("pathname").should(
            "equal",
            "/a/dashboard/verifikasi-pelukis"
        );

        cy.fixture("users/kurator1.json").then((data) => {
            cy.contains("tr", data.nama_lengkap).within(($row) => {
                cy.get('[data-cy="btn-verifikasi"]').click();
            });
            cy.get('[data-cy="btn-confirm-verifikasi"]').click();
            cy.contains("tr", data.nama_lengkap).within(($row) => {
                cy.get('[data-cy="status-verifikasi"]').should(
                    "contain",
                    "Terverifikasi"
                );
            });
        });
    });
    it("should be able to verify the kurator account", () => {
        cy.location("pathname").should("equal", "/a/dashboard");
        cy.wait(500);
        cy.contains("a", "Verfikasi Akun").click();
        cy.get('[href="/a/dashboard/verifikasi-kurator"]').click();
        cy.location("pathname").should(
            "equal",
            "/a/dashboard/verifikasi-kurator"
        );

        cy.fixture("users/kurator2.json").then((data) => {
            cy.contains("tr", data.nama_lengkap).within(($row) => {
                cy.get('[data-cy="btn-verifikasi"]').click();
            });
            cy.get('[data-cy="btn-confirm-verifikasi"]').click();
            cy.contains("tr", data.nama_lengkap).within(($row) => {
                cy.get('[data-cy="status-verifikasi"]').should(
                    "contain",
                    "Terverifikasi"
                );
            });
        });
    });
});
