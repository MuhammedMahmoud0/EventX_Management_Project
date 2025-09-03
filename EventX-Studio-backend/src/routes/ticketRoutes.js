const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const {
    bookTicket,
    getMyTickets,
    getEventTickets,
    updateTicket,
} = require("../controllers/ticketController");

const router = express.Router();

router.post("/book", protect, bookTicket);
router.get("/my", protect, getMyTickets);
router.get("/event/:eventId", protect, admin, getEventTickets);
router.put("/:id", protect, admin, updateTicket);

module.exports = router;
