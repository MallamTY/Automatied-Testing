const fs = require("fs");
const path = require("path");



function save(books) {
    try {
        fs.writeFileSync(path.join(__dirname, "..", "books.json"), JSON.stringify(books));
        return {
            status: true
        };
    } catch (error) {
        return {
            errors: error.code,
            status: false
        };
    }
}

module.exports = save;