const dataSource = require('../utils').dataSource;
const Wilder = require('../entity/Wilder');

const createWilder = async (req, res) => {
    try {
        const { name } = req.body;
        const wilder = await dataSource.getRepository(Wilder).save({name})
        res.send(wilder)
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = {
    createWilder
}