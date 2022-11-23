const dataSource = require('../utils').dataSource;
const Wilder = require('../entity/Wilder');
const { Like } = require("typeorm");

const createWilder = async (req, res) => {
    if (!name || name.length > 100) return res.status(422) 
    const { name } = req.body;
    try {
        const wilder = await dataSource.getRepository(Wilder).save({name});
        res.status(201).send(wilder);
    }
    catch(err) {
        res.status(500).send(err);    }
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
    try {
        const { id } = req.params;
        const { name } = req.body;
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
    try {
        const { id } = req.params;
        const wilder = await dataSource.getRepository(Wilder).findOne({where: {id: id}});
        const result = dataSource.getRepository(Wilder).delete(wilder.id);
        res.send(result);
    } 
    catch(err) {
        res.status(500).send(err);
    }
};

module.exports = {
    createWilder,
    getAllWilder,
    getOneWilder,
    readWilder,
    deleteWilder,
    updateWilder
};