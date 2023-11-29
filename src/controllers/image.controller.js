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



const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    if(!image) return res.status(404).json({message: "image not found"})
    await deleteFromCloudinary(image.url);
    await Image.destroy();
    return res.sendStatus(204);
});



module.exports = {
    getAll,
    create,
    remove
}