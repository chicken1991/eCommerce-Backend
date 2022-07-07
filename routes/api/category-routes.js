const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// DONE
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll(
      { include: [{ model: Product }] }
    );
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DONE
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catId = await Category.findByPk(req.params.id, 
      { include: [{ model: Product }] }
    );
    if (!catId) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(catId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//DONE - sorta
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
  const catUp = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  if(!catUp){
    res.status(404).json({ message: 'No category found wiht this id!' });
  }

  res.status(200).json(catUp);
} catch (err) {
  res.status(500).json(err);
}
});

//DONE
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!catData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json("Category has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
