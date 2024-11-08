require('../models/database');
const Category = require('../models/CategoryModel')



/**
 * Get /
 * Homepage
 */

exports.homepage = async (req, res) => {
    res.render('index', { title: 'Cooking Blog - Home' });
};


async function insertDummyCategoryData() {
    try {
        await Category.insertMany([
            {
                "name":"Thai",
                "image": "thai-food.jpg"
            },
            {
                "name":"American",
                "image": "american-food.jpg"
            },
            {
                "name":"Italian",
                "image": "italian-food.jpg"
            },
            {
                "name":"Mexican",
                "image": "mexican-food.jpg"
            },
            {
                "name":"Indian",
                "image": "thindianai-food.jpg"
            },
            {
                "name":"Chinese",
                "image": "chinese-food.jpg"
            },
            {
                "name":"Korean",
                "image": "korean-food.jpg"
            },
        ]);

    } catch (error) {
        console.log('err', + error);
    }
};

insertDummyCategoryData();

