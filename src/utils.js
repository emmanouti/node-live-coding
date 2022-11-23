const typeorm = require("typeorm");
const Skill = require("./entity/Skill.js");
const Wilder = require("./entity/Wilder.js");

const dataSource = new typeorm.DataSource({
    type: "sqlite",
    database: "./wildersdb.sqlite",
    synchronize: true,
    entities: [Wilder, Skill]
  });
  
  module.exports = {
    dataSource
  }