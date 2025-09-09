// controllers/csvimport.controller.js
import fs from "fs";
import csv from "csv-parser";
import Product from "../models/product.model.js";

// Upload + parse CSV + insert into MongoDB Product collection
export const handleCsvUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded. Field name must be 'file'." });
  }

  const filePath = req.file.path; // e.g., uploading/abc123
  const rows = [];

  // Helper to always try to delete the temp file
  const done = (code, body) => {
    fs.unlink(filePath, () => {});
    return res.status(code).json(body);
  };

  try {
    // Parse CSV
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (r) => {
          // Minimal mapping to Product schema; adjust keys to your CSV headers
          const doc = {
            name: r.name?.trim(),
            
            price: r.price != null ? Number(r.price) : undefined,
            quantity: r.quantity != null ? Number(r.quantity) : undefined,
          };
          // Skip empty rows
          if (!doc.name && !doc.sku) return;
          rows.push(doc);
        })
        .on("end", resolve)
        .on("error", reject);
    });

    if (rows.length === 0) {
      return done(400, { message: "CSV has no valid rows." });
    }

    // Insert all rows (simple path; adjust options if you have unique indexes)
    const inserted = await Product.insertMany(rows, { ordered: false });
    return done(200, {
      message: "CSV processed and products inserted.",
      insertedCount: inserted.length,
      totalParsed: rows.length,
    });
  } catch (err) {
    console.error("CSV import error:", err);
    return done(500, { message: "Error processing CSV", error: err.message });
  }
};
