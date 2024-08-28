describe("Artwork Flow | Flow Karya unggah dan kurasi", () => {
    before(() => {
        //prepare user account
        cy.exec("npx prisma migrate reset --force");
        cy.fixture("users/kurator1.json").then((data) => {
            cy.accountApply(data, "kurator");
            cy.accountVerification(data.nama_lengkap, "kurator");
        });
        cy.fixture("users/kurator2.json").then((data) => {
            cy.accountApply(data, "kurator");
            cy.accountVerification(data.nama_lengkap, "kurator");
        });
        cy.fixture("users/kurator3.json").then((data) => {
            cy.accountApply(data, "kurator");
            cy.accountVerification(data.nama_lengkap, "kurator");
        });
        cy.fixture("users/kurator4.json").then((data) => {
            cy.accountApply(data, "kurator");
            cy.accountVerification(data.nama_lengkap, "kurator");
        });

        cy.fixture("users/pelukis1.json").then((data) => {
            cy.accountApply(data, "pelukis");
            cy.accountVerification(data.nama_lengkap, "pelukis");
        });
        cy.fixture("users/pelukis2.json").then((data) => {
            cy.accountApply(data, "pelukis");
            cy.accountVerification(data.nama_lengkap, "pelukis");
        });

        cy.fixture("users/pelukis3.json").then((data) => {
            cy.accountApply(data, "pelukis");
            cy.accountVerification(data.nama_lengkap, "pelukis");
        });
    });

    it("should be able to upload an artwork from pelukis account", () => {
        cy.fixture("users/pelukis1.json").then((data) => {
            cy.login(data.email, data.password);
        });
        cy.visit("/p/dashboard");
        cy.contains("a", "Karya").click();
        cy.get('[href="/p/karya"]').first().click();
        cy.get('[data-cy="btn-unggah"]').click();
        cy.location("pathname").should("equal", "/p/karya/unggah");
        cy.fixture("lukisan/lukisan1.jpg", null).as("lukisan1");
        cy.get('input[type="file"]').selectFile("@lukisan1", { force: true });
        cy.get('img[alt="preview"]').should("exist");
        cy.fixture("lukisan/lukisan1.json").then((data) => {
            cy.get('[data-cy="input-judul"]').type(data.judul);
            cy.get('[data-cy="input-deskripsi"]').type(data.deskripsi);
            cy.get('[data-cy="input-aliran"]').type(data.aliran);
            cy.get('[data-cy="input-media"]').type(data.media);
            cy.get('[data-cy="input-teknik"]').type(data.teknik);
            cy.get('[data-cy="input-panjang"]').type(data.panjang);
            cy.get('[data-cy="input-lebar"]').type(data.lebar);
            cy.get('[data-cy="btn-submit"]').click();
            cy.contains("Berhasil", { timeout: 10000 }).should("exist");
            cy.location("pathname").should("equal", "/p/karya");
            cy.contains('[data-cy="card-karya"]', data.judul).should("exist");
        });
    });

    it("should be able to curate art work with kurator account", () => {
        //add adwork first
        cy.addArtwork(
            "users/pelukis1.json",
            "lukisan/lukisan2.json",
            "cypress/fixtures/lukisan/lukisan1.jpg"
        );

        cy.fixture("users/kurator1.json").then((data) => {
            cy.login(data.email, data.password);
        });
        cy.visit("/k/kurasi-karya");
        cy.fixture("lukisan/lukisan2").then((data) => {
            cy.contains('[data-cy="card-karya"]', data.judul).as("card-target");
            cy.get("@card-target").should("exist");
            cy.get("@card-target").click();
        });
        cy.get('[data-cy="btn-kurasi"]').click();
        cy.get('[data-cy="form-kurasi"]').should("exist");
        cy.fixture("komentar/komentar1.json").then((data) => {
            cy.get('[data-cy="input-komentar"]').type(data.komentar);
            cy.get('[data-cy="input-harga_min"]').type(data.harga_min);
            cy.get('[data-cy="input-harga_maks"]').type(data.harga_maks);
            cy.get('[data-cy="btn-submit"]').click();
            cy.contains("Berhasil Kurasi!").should("exist");
        });
        cy.get("@card-target").should("not.exist");
        cy.get('[data-cy="tab-sudah_kurasi"]').click();
        cy.fixture("lukisan/lukisan2").then((data) => {
            cy.contains('[data-cy="card-karya"]', data.judul).click({
                force: true,
            });
        });
        cy.get('[data-cy="btn-kurasi"]').should("not.exist");
        cy.contains("button", "Review").click();
        cy.fixture("komentar/komentar1.json").then((data) => {
            cy.fixture("users/kurator1.json").then((user) => {
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
    });

    it("should be able to add maximum three reviews in a artwork", () => {
        cy.addArtwork(
            "users/pelukis2.json",
            "lukisan/lukisan3.json",
            "cypress/fixtures/lukisan/lukisan1.jpg"
        );

        cy.curateArt(
            "users/kurator1.json",
            "lukisan/lukisan3.json",
            "komentar/komentar1.json"
        );
        cy.curateArt(
            "users/kurator2.json",
            "lukisan/lukisan3.json",
            "komentar/komentar2.json"
        );
        cy.curateArt(
            "users/kurator3.json",
            "lukisan/lukisan3.json",
            "komentar/komentar3.json"
        );
        //add 4th kurator review
        cy.fixture("users/kurator4.json").then((data) => {
            cy.login(data.email, data.password);
        });
        cy.visit("/k/kurasi-karya");
        cy.wait(500);
        cy.fixture("lukisan/lukisan3.json").then((data) => {
            cy.contains('[data-cy="card-karya"]', data.judul).should(
                "not.exist"
            );

            cy.get('[data-cy="tab-sudah_kurasi"]').click();
            cy.get('[data-cy="card-karya"]').contains(data.judul).click({
                force: true,
            });
        });
        cy.get('[data-cy="btn-kurasi"]', { timeout: 10000 }).should(
            "not.exist"
        );

        //assert 3 comment should show up
        cy.fixture("users/pelukis2.json").then((data) => {
            cy.login(data.email, data.password);
        });
        cy.visit("/p/dashboard");
        cy.contains("a", "Karya").click();
        cy.get('[href="/p/karya"]').first().click();

        cy.fixture("lukisan/lukisan3").then((data) => {
            cy.contains('[data-cy="card-karya"]', data.judul).click({
                force: true,
            });
        });

        cy.contains("button", "Review").click();

        cy.fixture("komentar/komentar1.json").then((data) => {
            cy.fixture("users/kurator1.json").then((user) => {
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
        cy.fixture("komentar/komentar2.json").then((data) => {
            cy.fixture("users/kurator2.json").then((user) => {
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
        cy.fixture("komentar/komentar3.json").then((data) => {
            cy.fixture("users/kurator3.json").then((user) => {
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
    });
    it("should be able to determine price only with one curated review", () => {
        cy.addArtwork(
            "users/pelukis3.json",
            "lukisan/lukisan4.json",
            "cypress/fixtures/lukisan/lukisan1.jpg"
        );

        cy.curateArt(
            "users/kurator1.json",
            "lukisan/lukisan4.json",
            "komentar/komentar1.json"
        );
        cy.fixture("users/pelukis3.json").then((data) => {
            cy.login(data.email, data.password);
        });
        cy.visit("/p/dashboard");
        cy.contains("a", "Karya").click();
        cy.get('[href="/p/karya"]').first().click();

        cy.fixture("lukisan/lukisan4").then((data) => {
            cy.contains('[data-cy="card-karya"]', data.judul).click({
                force: true,
            });
        });

        cy.contains("button", "Review").click();

        cy.fixture("komentar/komentar1.json").then((data) => {
            cy.fixture("users/kurator1.json").then((user) => {
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

        cy.get('[data-cy="btn-tentukan_harga"]').click({ force: true });
        cy.get('[data-cy="form-tentukan_harga"]').should("exist");
        cy.get('[data-cy="input-harga"]').type("50000", { force: true });
        cy.get('[data-cy="btn-submit"]').click({ force: true });
        cy.contains("Berhasil", { timeout: 20000 }).should("exist");

        cy.fixture("lukisan/lukisan4").then((data) => {
            cy.contains('[data-cy="card-karya"]', data.judul)
                .get('[data-cy="text-status"]')
                .should("contain", "Selesai");
        });
    });
});
