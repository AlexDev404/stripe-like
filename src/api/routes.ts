import { Router } from "express"; // Our routing machine
import settings from "../config/settings.json";
import { LogRoutes } from "../util/Logger";
import {
 Payment
} from "./models"; // Import our API models into memory

const router = Router(); // Initialize!

// Our routes
// Class API
// Payment
router.post("/charges", Payment.main);

// Print the routes for reference
router.stack.forEach(LogRoutes.bind(null, [])); // Pass in our routes

// Export our router
export default router;
