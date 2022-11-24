const dataSource = require('../utils').dataSource;
const Wilder = require('../entity/Wilder');
const Skill = require('../entity/Skill');
const { Like } = require("typeorm");

const createWilder = async (req, res) => {
    const { name } = req.body;
    if (!name || name.length > 100) return res.status(422);
    try {
        const wilder = await dataSource.getRepository(Wilder).save({name});
        res.status(201).send(wilder);
    }
    catch(err) {
        res.status(500).send(err);    
    }
};

const getAllWilder = async (req, res) => {
    try {
        const wilders = await dataSource.getRepository(Wilder).find()
        res.send(wilders)
    }
    catch(err) {
        res.status(500).send(err);
    }
}

const getOneWilder = async (req, res) => {
    try {
        const { id } = req.params;
        const wilder = await dataSource.getRepository(Wilder).findOneOrFail({where: {id: id}});
        res.send(wilder);
    }
    catch(err) {
        res.status(500).send(err);
    }
};

const readWilder = async (req, res) => {
    const { nameContains } = req.query;
    try {
      const wilders = await dataSource.getRepository(Wilder).find({
        where: { name: nameContains ? Like(`%${nameContains}%`) : undefined },
      });
      res.send(wilders);
    } catch (err) {
    res.status(500).send(err);    
    }
  }

const updateWilder = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        let wilder = await dataSource.getRepository(Wilder).findOneOrFail({where: {id: id}});
        wilder.name = name
        const result = await dataSource.getRepository(Wilder).save(wilder);
        res.send(result)
    }
    catch(err) {
        res.status(500).send(err);
    }
}

const deleteWilder = async (req, res) => {
    const { id } = req.params;
    try {
        const wilder = await dataSource.getRepository(Wilder).findOne({where: {id: id}});
        const result = dataSource.getRepository(Wilder).delete(wilder.id);
        res.send(result);
    } 
    catch(err) {
        res.status(500).send(err);
    }
};

const addSkill = async (req, res) => {
    const { wilderID } = req.params;
    const { skillID } = req.body;
    try {
        const wilderToUpdate = await dataSource.getRepository(Wilder).findOneBy({id: wilderID});
        if (wilderToUpdate === null) return res.status(404).send("wilder not found");
        const skillToAdd = await dataSource.getRepository(Skill).findOneBy({ id: skillID });
        if (skillToAdd === null) return res.status(404).send("skill not found");
        wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
        await dataSource.getRepository(Wilder).save(wilderToUpdate);
        res.send("skill added to wilder");
    } catch(err) {
        console.error(err);
        res.status(500).send("error adding skill to wilder");
    }
};

const deleteSkill = async (req, res) => {
    const { wilderID } = req.params;
    const { skillID } = req.body;
    try {
        const skillToRemove = await dataSource.getRepository(Skill).findOneBy({ id: skillID });
        if (skillToRemove === null) return res.status(404).send("skill not found");
        const wilderToUpdate = await dataSource.getRepository(Wilder).findOneBy({id: wilderID});
        if (wilderToUpdate === null) return res.status(404).send("wilder not found");
        wilderToUpdate.skills = wilderToUpdate.skills.filter(
            (skill) => skill.id.toString() !== skillToRemove.id.toString()
          );
          await dataSource.getRepository(Wilder).save(wilderToUpdate);
          res.status(200).send("skill removed from wilder");
    } catch(err) {
        console.error(err);
        res.status(500).send("error while removing skill");    }
}

module.exports = {
    createWilder,
    getAllWilder,
    getOneWilder,
    readWilder,
    deleteWilder,
    updateWilder,
    addSkill,
    deleteSkill
};