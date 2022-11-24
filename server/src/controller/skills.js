const dataSource = require('../utils').dataSource;
const Skill = require('../entity/Skill');

const createSkill = async (req, res) => {
    const { name } = req.body;
    const existingSkill = await dataSource.getRepository(Skill).findOneBy({name});
    console.log(name)
    if (existingSkill) return res.status(409).send("a skill with this name already exists"); 
    try {
        const created = await dataSource.getRepository(Skill).save({ name });
        res.status(201).send(created);
    }
    catch(err) {
        res.status(500).send(err);
    }
};

const readSkill = async (req, res) => {
    try {
      const skills = await dataSource.getRepository(Skill).find();
      res.send(skills);
    } catch (err) {
      console.error(err);
      res.status(500).send("error while reading skills");
    }
  };
  const updateSkill = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        let skill = await dataSource.getRepository(Skill).findOneOrFail({where: {id: id}});
        skill.name = name
        const result = await dataSource.getRepository(Skill).save(skill);
        res.send(result)
    }
    catch(err) {
        res.status(500).send(err);
    }
  };

const deleteSkill = async (req, res) => {
    const { id } = req.params;
    try {
        const skill = await dataSource.getRepository(Skill).findOne({where: {id: id}});
        const result = dataSource.getRepository(Skill).delete(skill.id);
        res.send(result);
    } 
    catch(err) {
        res.status(500).send(err);
    }
};

module.exports = {
    createSkill,
    readSkill,
    updateSkill,
    deleteSkill
};