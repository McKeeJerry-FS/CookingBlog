require('../models/database');
const Category = require('../models/CategoryModel')
const Recipe = require('../models/RecipeModel')




/**
 * Get /
 * Homepage
 */

exports.homepage = async (req, res) => {
    try {
        
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latestRecipes = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const thai = await Recipe.find({ category: 'Thai' });
        const korean = await Recipe.find({ category: 'Korean' });
        const american = await Recipe.find({ category: 'American' });
        const chinese = await Recipe.find({ category: 'Chinese' });
        const indian = await Recipe.find({ category: 'Indian' });
        const mexican = await Recipe.find({ category: 'Mexican' });
        const italian = await Recipe.find({ category: 'Italian' });

        const food = { latestRecipes, thai, korean, chinese, american, indian, mexican, italian }

        res.render('index', { title: 'Cooking Blog - Home', categories, food });
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

/**
 * Get /categories/:id
 * Explore CategoriesById
 */

exports.exploreCategoriesById = async (req, res) => {
    try {
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = await Recipe.find({ 'category': categoryId}).limit(limitNumber);
        res.render('categories', { title: 'Cooking Blog - Explore Categories', categoryById });
    } catch (error) {
        console.log('err', error);
        res.status(500).send({msg: error.message || 'Error Occurred'})
    }
};

/**
 * Get /recipe/:id
 * Explore Recipe
 */

exports.exploreRecipe = async (req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        res.render('recipe', { title: 'Cooking Blog - Recipe', recipe });
    } catch (error) {
        console.log('err', error);
        res.status(500).send({msg: error.message || 'Error Occurred'})
    }
};


/**
 * Post /search
 * Search Recipe
 */

exports.searchRecipe = async(req, res) => {
    // searchTerm
    try {
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true }});
        //res.json(recipe)

        res.render('search', { title: 'Cooking Blog - Search', recipe });
    } catch (error) {
        res.statu(500).send({ msg: error.message || "Error Occurred" })
    }
}

/**
 * Get /explore-latest
 * Explore Latest
 */
exports.exploreLatest = async(req, res) => {
    try {
        const limitNumber = 20;
        const recipe = await Recipe.find({  }).sort({ _id: -1 }).limit(limitNumber);
        res.render('explore-latest', { title: 'Cooking Blog - Explore Latest', recipe})
    } catch (error) {
        res.statu(500).send({ msg: error.message || "Error Occurred" })

    }
}

/**
 * Get /submit-recipe
 * Submit Recipe
 */
exports.submitRecipe = async(req, res) => {
    try {
        const infoErrorObj = req.flash('infoErrors')
        const infoSubmitObj = req.flash('infoSubmit')
        res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorObj, infoSubmitObj});
    } catch (error) {
        res.status(500).send({ msg: error.message || "Error Occurred" })

    }
}

/**
 * Post /submit-recipe
 * SubmitRecipeOnPost
 */
exports.submitRecipeOnPost = async(req, res) => {
    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0){
            console.log('No files were uploaded');
        } else {
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
            imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err);
            });
        }

        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
        });

        await newRecipe.save();

        req.flash('infoSubmit', 'Recipe submitted Successfully!');
        res.redirect('submit-recipe');
    } catch (error) {
        req.flash('infoSubmit', error);
        res.status(500).send({ msg: error.message || "Error Occurred" })
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



// async function insertDummyRecipeData() {
//         try {
//             await Recipe.insertMany([
//                 {
//                     "name":"BulGoGi (Korean BBQ Beef)",
//                     "description": "Bulgogi, sometimes known as Korean BBQ beef, is a dish of thinly sliced grilled steak that has been marinated in a sweet soy, sesame, and garlic sauce. If you want to spice it up, serve the beef in lettuce cups with rice and hot pepper paste (gochujang).",
//                     "email": "jerry@gmail.com",
//                     "ingredients": [
//                         "Steak", "Soy Sauce", "Sugar", "Green Onions", "Garlic", "Sesame Seeds", "Sesame Oil", "Pepper"
//                     ],
//                     "category": "Korean",
//                     "image": "korean-food.jpg"
//                 },
//                 {
//                     "name":"Shrimp Alfredo Pasta",
//                     "description": "A wonderful shrimp pasta dish! I came up with this on my own one night. You can change the amount of ingredients to your taste.",
//                     "email": "jerry@gmail.com",
//                     "ingredients": [
//                         "1 (16 ounce) jar Alfredo-style pasta sauce", "1 (16 ounce) package angel hair pasta", "2 pounds fresh shrimp, peeled and deveined", "1 cup butter, melted", "½ small green bell pepper, diced", "½ small red onion, finely chopped", "1 teaspoon garlic powder", "½ teaspoon ground cumin"
//                     ],
//                     "category": "Italian",
//                     "image": "italian-food.jpg"
//                 },
                
                
//             ]);
    
//         } catch (error) {
//             console.log('err', + error);
//         }
//     };

//     insertDummyRecipeData();