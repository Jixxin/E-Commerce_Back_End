const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include:[Product]
})
.then(dbCategory =>{
  res.json(dbCategory)
})
.catch(err => {
  console.log(err)
  res.status(500).json({ msg: "an error occured", err });
})
});

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id,{
    include:[Product]
})
.then(dbCategory =>{
  res.json(dbCategory)
})
.catch(err => {
  console.log(err)
  res.status(500).json({ msg: "an error occured", err });
})
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then(newCategory => {
    res.json(newCategory)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedCategory => {
    res.json(updatedCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(delCategory => {
    res.json(delCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

module.exports = router;
