require('../models/database');
const Category = require('../models/CategoryModel')



/**
 * Get /
 * Homepage
 */

exports.homepage = async (req, res) => {
    try {
        
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('index', { title: 'Cooking Blog - Home', categories });
    } catch (error) {
        console.log('err', error);
        res.status(500).send({msg: error.message || 'Error Occurred'})
    }
};


/**
 * Get /categories
 * Explore Categories
 */

exports.exploreCategories = async (req, res) => {
    try {
        
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', { title: 'Cooking Blog - Explore Categories', categories });
    } catch (error) {
        console.log('err', error);
        res.status(500).send({msg: error.message || 'Error Occurred'})
    }
};




// async function insertDummyCategoryData() {
//     try {
//         await Category.insertMany([
//             {
//                 "name":"Thai",
//                 "image": "thai-food.jpg"
//             },
//             {
//                 "name":"American",
//                 "image": "american-food.jpg"
//             },
//             {
//                 "name":"Italian",
//                 "image": "italian-food.jpg"
//             },
//             {
//                 "name":"Mexican",
//                 "image": "mexican-food.jpg"
//             },
//             {
//                 "name":"Indian",
//                 "image": "thindianai-food.jpg"
//             },
//             {
//                 "name":"Chinese",
//                 "image": "chinese-food.jpg"
//             },
//             {
//                 "name":"Korean",
//                 "image": "korean-food.jpg"
//             },
//         ]);

//     } catch (error) {
//         console.log('err', + error);
//     }
// };

// insertDummyCategoryData();

