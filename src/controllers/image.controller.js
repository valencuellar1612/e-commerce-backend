const catchError = require('../utils/catchError');
const Image = require('../models/Image');
const {uploadToCloudinary, deleteFromCloudinary} = require('../utils/cloudinary')

const getAll = catchError(async(req, res) => {
    const images = await Image.findAll();
    return res.json(images);
});

const create = catchError(async(req, res)=> {
    const file = req.file;
    const {url} = await uploadToCloudinary(file);
    const { productId } = req.body;
    const image = await Image.create({
        url, 
        productId,
    });
    return res.status(201).json(image);
});

const remove = catchError(async(req, res)=> {
    const {id} = req.params;
    const image = await Image.findByPk(id);
    await deleteFromCloudinary(image.url);
    await image.destroy();
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove
}