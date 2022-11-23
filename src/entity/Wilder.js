const { SCHEMA } = require("sqlite3");

const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Wilder",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "text",
        },
    },
});