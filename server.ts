import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Set JSON file paths
const DATA_DIR = path.join(process.cwd(), "stored_data");
const CONFIG_FILE = path.join(DATA_DIR, "config.json");
const PACKAGES_FILE = path.join(DATA_DIR, "packages.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase body size limits for Base64 image uploads (e.g. Logo & QRIS)
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Helper function to read json file or return null
  const readJsonFile = (filePath: string) => {
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
      }
    } catch (e) {
      console.error(`Error reading file ${filePath}:`, e);
    }
    return null;
  };

  // Helper function to write json file safely
  const writeJsonFile = (filePath: string, data: any) => {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
      return true;
    } catch (e) {
      console.error(`Error writing file ${filePath}:`, e);
      return false;
    }
  };

  // API Route: Config
  app.get("/api/config", (req, res) => {
    const data = readJsonFile(CONFIG_FILE);
    if (data) {
      res.json(data);
    } else {
      res.json({ _use_default: true });
    }
  });

  app.post("/api/config", (req, res) => {
    const success = writeJsonFile(CONFIG_FILE, req.body);
    if (success) {
      res.json({ status: "success", message: "Config saved to server" });
    } else {
      res.status(500).json({ error: "Failed to save configuration" });
    }
  });

  // API Route: Packages
  app.get("/api/packages", (req, res) => {
    const data = readJsonFile(PACKAGES_FILE);
    if (data) {
      res.json(data);
    } else {
      res.json({ _use_default: true });
    }
  });

  app.post("/api/packages", (req, res) => {
    const success = writeJsonFile(PACKAGES_FILE, req.body);
    if (success) {
      res.json({ status: "success", message: "Packages saved to server" });
    } else {
      res.status(500).json({ error: "Failed to save packages" });
    }
  });

  // API Route: Orders
  app.get("/api/orders", (req, res) => {
    const data = readJsonFile(ORDERS_FILE);
    if (data) {
      res.json(data);
    } else {
      res.json({ _use_default: true });
    }
  });

  app.post("/api/orders", (req, res) => {
    const success = writeJsonFile(ORDERS_FILE, req.body);
    if (success) {
      res.json({ status: "success", message: "Orders saved to server" });
    } else {
      res.status(500).json({ error: "Failed to save orders" });
    }
  });

  // Vite middleware for development or Static Assets for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Gaven Backend] Server running on http://localhost:${PORT}`);
  });
}

startServer();
