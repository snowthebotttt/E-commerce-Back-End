const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: { model: Product, through: ProductTag },
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single tag by ID
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: { model: Product, through: ProductTag },
    });
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new tag
router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a tag's name by ID
router.put("/:id", async (req, res) => {
  try {
    const [rowsUpdated] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (rowsUpdated === 0) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    const updatedTag = await Tag.findByPk(req.params.id);
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a tag by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!deletedTag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
