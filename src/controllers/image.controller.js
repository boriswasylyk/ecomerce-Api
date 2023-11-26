const catchError = require('../utils/catchError');
const Image = require('../models/Image');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary')

const getAll = catchError(async(req, res) => {
    const results = await Image.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    if(!req.file) return res.status(400).json({message: "debes enviar una imagen"})
    const { path, filename} = req.file;
    const {url} = await uploadToCloudinary( path, filename )
    const { productsId } = req.body;
    const image = await Image.create({ url, productsId })
    return res.json(image)
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Image.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    if(!image) return res.status(404).json({message: "image not found"})
    await deleteFromCloudinary(image.url);
    await Image.destroy();
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Image.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}