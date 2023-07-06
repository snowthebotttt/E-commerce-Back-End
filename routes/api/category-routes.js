const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    // Find all categories
    const categories = await Category.findAll({
      include: [Product], // Include associated Products
    });

    // Return the categories as a JSON response
    res.status(200).json(categories);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find a category by its `id` value
    const category = await Category.findByPk(req.params.id, {
      include: [Product], // Include associated Products
    });

    // If no category is found, return 404 status
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Return the category as a JSON response
    res.status(200).json(category);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // Create a new category
    const category = await Category.create(req.body);

    // Return the created category as a JSON response
    res.status(201).json(category);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Update a category by its `id` value
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    // If no category is found, return 404 status
    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Return a success message
    res.status(200).json({ message: "Category updated successfully" });
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Delete a category by its `id` value
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });

    // If no category is found, return 404 status
    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Return a success message
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

module.exports = router;
