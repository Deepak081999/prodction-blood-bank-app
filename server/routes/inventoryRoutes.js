const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrgnaisationController, getOrgnaisationForHospitalController, getInventoryHospitalController, getRecentInventoryController }
    = require("../controllers/inventoryController");

const router = express.Router();
//Created a new inventory 
router.post("/create-inventory", authMiddelware, createInventoryController);

//get a inventory 
router.get("/get-inventory", authMiddelware, getInventoryController);

//GET HOSPITAL BLOOD RECORDS
router.post(
    "/get-inventory-hospital",
    authMiddelware,
    getInventoryHospitalController
);
//GET RECENT BLOOD RECORDS
router.get(
    "/get-recent-inventory",
    authMiddelware,
    getRecentInventoryController
);
//Created a new inventory 
router.get("/get-donars", authMiddelware, getDonarsController);

//GET HOSPITAL RECORDS
router.get("/get-hospitals", authMiddelware, getHospitalController);

//GET orgnaisation RECORDS
router.get("/get-orgnaisation", authMiddelware, getOrgnaisationController);
//GET orgnaisation RECORDS
router.get(
    "/get-orgnaisation-for-hospital",
    authMiddelware,
    getOrgnaisationForHospitalController
);


module.exports = router;