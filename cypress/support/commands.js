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
    cy.wait(1000);
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

Cypress.Commands.add(
    "accountVerification",
    (nama_lengkap, type = "kurator") => {
        cy.login("admin@admin.com", "passwordadmin");
        cy.visit(
            type === "pelukis"
                ? "/a/dashboard/verifikasi-pelukis"
                : "/a/dashboard/verifikasi-kurator"
        );
        cy.wait(1000);
        cy.contains("tr", nama_lengkap).within(($row) => {
            cy.get('[data-cy="btn-verifikasi"]').click();
        });
        cy.get('[data-cy="btn-confirm-verifikasi"]').click();
        cy.contains("tr", nama_lengkap).within(($row) => {
            cy.get('[data-cy="status-verifikasi"]').should(
                "contain",
                "Terverifikasi"
            );
        });
    }
);

Cypress.Commands.add("addArtwork", (pelukisAccount, artworkData, picture) => {
    cy.fixture(pelukisAccount).then((data) => {
        cy.login(data.email, data.password);
        cy.visit("/p/karya/unggah");
        cy.wait(500);
    });
    cy.get('div[role="presentation"]').selectFile(picture, {
        force: true,
        action: "drag-drop",
    });

    cy.get('img[alt="preview"]', { timeout: 10000 }).should("exist");
    cy.fixture(artworkData).then((data) => {
        cy.get('[data-cy="input-judul"]').type(data.judul);
        cy.get('[data-cy="input-deskripsi"]').type(data.deskripsi);
        cy.get('[data-cy="input-aliran"]').type(data.aliran);
        cy.get('[data-cy="input-media"]').type(data.media);
        cy.get('[data-cy="input-teknik"]').type(data.teknik);
        cy.get('[data-cy="input-panjang"]').type(data.panjang);
        cy.get('[data-cy="input-lebar"]').type(data.lebar);
        cy.get('[data-cy="btn-submit"]').click();
        cy.contains("Berhasil", { timeout: 20000 }).should("exist");
        cy.location("pathname").should("equal", "/p/karya");
        cy.contains('[data-cy="card-karya"]', data.judul).should("exist");
    });
});

Cypress.Commands.add(
    "curateArt",
    (kuratorAccount, lukisanData, komentarData) => {
        cy.fixture(kuratorAccount).then((data) => {
            cy.login(data.email, data.password);
        });
        cy.visit("/k/kurasi-karya");
        cy.wait(500);
        cy.fixture(lukisanData).then((data) => {
            cy.get('[data-cy="card-karya"]')
                .contains(data.judul)
                .as("card-target");
            cy.get("@card-target").should("exist");
            cy.get("@card-target").click({ force: true });
        });
        cy.get('[data-cy="btn-kurasi"]', { timeout: 10000 }).should("exist");
        cy.get('[data-cy="btn-kurasi"]').click();
        cy.get('[data-cy="form-kurasi"]').should("exist");
        cy.fixture(komentarData).then((data) => {
            cy.get('[data-cy="input-komentar"]').type(data.komentar);
            cy.get('[data-cy="input-harga_min"]').type(data.harga_min);
            cy.get('[data-cy="input-harga_maks"]').type(data.harga_maks);
            cy.get('[data-cy="btn-submit"]').click();
            cy.contains("Berhasil Kurasi!").should("exist");
        });
        cy.fixture(lukisanData).then((data) => {
            cy.contains('[data-cy="card-karya"]', data.judul).should(
                "not.exist"
            );
        });
        cy.get('[data-cy="tab-sudah_kurasi"]').click();
        cy.fixture(lukisanData).then((data) => {
            cy.contains('[data-cy="card-karya"]', data.judul).click({
                force: true,
            });
        });
        cy.get('[data-cy="btn-kurasi"]').should("not.exist");
        cy.contains("button", "Review").click();
        cy.fixture(komentarData).then((data) => {
            cy.fixture(kuratorAccount).then((user) => {
                cy.get('[data-cy="text-nama_lengkap"]').should(
                    "contain.text",
                    user.nama_lengkap
                );
                cy.get('[data-cy="text-komentar"]').should(
                    "contain.text",
                    data.komentar
                );
            });
        });
    }
);
