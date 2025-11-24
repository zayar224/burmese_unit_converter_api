const express = require("express");
const fs = require("fs"); // Built-in for reading JSON
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies (built-in since Express 4.16+)
app.use(express.json());

// Load units data from JSON
let unitsData;
try {
  const dataPath = path.join(__dirname, "data", "units.json");
  const rawData = fs.readFileSync(dataPath);
  unitsData = JSON.parse(rawData);
  console.log("Units data loaded successfully.");
} catch (err) {
  console.error("Error loading units data:", err);
  process.exit(1); // Exit if data fails to load
}

// Route 1: GET /categories - List all categories
app.get("/categories", (req, res) => {
  const categories = Object.keys(unitsData);
  res.json({ categories });
});

// Route 2: GET /:category/units - List units in a category
app.get("/:category/units", (req, res) => {
  const category = req.params.category.toLowerCase();
  if (!unitsData[category]) {
    return res.status(404).json({ error: "Category not found" });
  }
  const units = Object.keys(unitsData[category].units);
  res.json({ units, base: unitsData[category].base });
});

// Route 3: POST /convert - Perform conversion
// Body: { category: 'length', from: 'let_chaung', to: 'm', value: 10 }
app.post("/convert", (req, res) => {
  const { category, from, to, value } = req.body;

  if (!category || !from || !to || value === undefined) {
    return res
      .status(400)
      .json({ error: "Missing required fields: category, from, to, value" });
  }

  const cat = category.toLowerCase();
  if (!unitsData[cat]) {
    return res.status(404).json({ error: "Category not found" });
  }

  const fromFactor = unitsData[cat].units[from];
  const toFactor = unitsData[cat].units[to];

  if (!fromFactor || !toFactor) {
    return res.status(400).json({ error: "Invalid from or to unit" });
  }

  if (isNaN(value) || value < 0) {
    return res
      .status(400)
      .json({ error: "Value must be a non-negative number" });
  }

  // Convert: (value * fromFactor) / toFactor
  const result = (value * fromFactor) / toFactor;
  res.json({
    from: `${value} ${from}`,
    to: `${result} ${to}`,
    base: unitsData[cat].base,
  });
});

// Error handling middleware (optional but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
