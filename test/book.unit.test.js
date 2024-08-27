const save = require("../services/save.service");



describe("Test file saver", () => {
    // it("Should fail when invalid data is passed in save function", () => {
    //     const books = [{"name":"call of the wild","author":"Louis Wilder","id":1},{"name":"Things fall apart","author":"Chinua Achebe","id":2},{"name":"Dream","author":"Jamie Phillips","id":3},{"name":"The rise of a pauper","author":"Temitayo Sosanya","id":0.22248361154861396},{"name":"The rise of a pauper","author":"Temitayo Sosanya","id":0.727581787466042}];

    //     const {status, errors} = save(books);
    //     console.log(errors)
    //     expect(status).toBe(false);
    //     expect(errors).toBe("ERR_INVALID_ARG_TYPE")
    // });

    it("Should sucess when valid is passed in save function", () => {
        const books = [{"name":"call of the wild","author":"Louis Wilder","id":1},{"name":"Things fall apart","author":"Chinua Achebe","id":2},{"name":"Dream","author":"Jamie Phillips","id":3},{"name":"The rise of a pauper","author":"Temitayo Sosanya","id":0.22248361154861396},{"name":"The rise of a pauper","author":"Temitayo Sosanya","id":0.727581787466042}];

        const {status, errors} = save(books);
        expect(status).toBe(true);
    })
})