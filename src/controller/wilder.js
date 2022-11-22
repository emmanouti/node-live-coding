const dataSource = require('../utils').dataSource;
const Wilder = require('../entity/Wilder');

const createWilder = async (req, res) => {
    try {
        const { name } = req.body;
        const wilder = await dataSource.getRepository(Wilder).save({name});
        res.send("User Created", wilder);
    }
    catch(err) {
        res.send(err);
    }
};

const getOneWilder = async (req, res) => {
    try {
        const { id } = req.params;
        const wilder = await dataSource.getRepository(Wilder).findOneOrFail({where: {id: id}});
        res.send(wilder);
    }
    catch(err) {
        res.send(err);
    }
};

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
        res.send(err)
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
        res.send(err)
    }
};

module.exports = {
    createWilder,
    deleteWilder,
    getOneWilder,
    updateWilder
};