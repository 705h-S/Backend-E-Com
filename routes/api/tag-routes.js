const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    // find all library cards and perform a JOIN to include all associated Readers
    const tagData = await Tag.findAll({
      include: [{ model: Product, ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, ProductTag }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tags found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  Tag.create({
    
    tag_name: req.body.tag_name,
  })
  // .then((product) => {
  //   // if there's product tags, we need to create pairings to bulk create in the ProductTag model
  //   if (req.body.tagIds.length) {
  //     const productTagIdArr = req.body.tagIds.map((tag_id) => {
  //       return {
  //         product_id: product.id,
  //         tag_id,
  //       };
  //     });
  //     return ProductTag.bulkCreate(productTagIdArr);
  //   }
  //   // if no product tags, just respond
  //   res.status(200).json(product);
  // })
  .then((tagData) => res.status(200).json(tagData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tags with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tags found with that id!' });
      return;
    };

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
