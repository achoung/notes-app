context('Create Note', () => {
    it('Login', () => {
        cy.login();
    });

    it('Create Note', () => {
        cy.log('Clicking "Create Note" nav bar button');
        cy.get('[data-test-id="nav-bar-create-note-btn"]').click();

        cy.log('Verify page has been routed to "Create Note" page');
        cy.location('href').should('include', '/create');

        cy.log('Verify create note fields are visible and type in test values');
        const createNoteTitleField = cy.get(
            '[data-test-id="create-note-title-field"]'
        );
        createNoteTitleField.should('be.visible');
        createNoteTitleField.type('test title');
        createNoteTitleField.should('have.value', 'test title');

        const createNoteContentField = cy.get(
            '[data-test-id="create-note-content-field"]'
        );
        createNoteContentField.should('be.visible');
        createNoteContentField.type('test content');
        createNoteTitleField.should('have.value', 'test content');

        cy.log('Click submit button and verify note has been created');
        cy.get('[data-test-id="create-note-submit-btn"]').click();

        // TODO: This test fails because cypress is not allowing the required "Authorization" request header needed to validate
        // the request. Will circle back to this later to fix this if I have time
    });
});
