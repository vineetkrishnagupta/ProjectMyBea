const mongoose = require("mongoose");

const flightBookingSchema = new mongoose.Schema({
        flight_ariline: String,
        flight_number: String,
        from_airport: {
                type: String,
                required: false,
                default: "",
        },
        to_airport: {
                type: String,
                required: false,
                default: "",
        },
        active: {
                type: Boolean,
                default: false,
        },
        gdate: { type: Date, default: Date.now },
        rdate: { type: Date, default: Date.now },
        date: { type: Date, default: Date.now },
        price: {
                type: String,
                required: false,
                default: "",
        },
        departure: {
                type: String,
                required: false,
                default: "",
        },
        duration: {
                type: String,
                required: false,
                default: "",
        },
        payment: {
                type: String,
                required: false,
                default: "Doon",
        },
        user_id: {
                type: String,
                required: false,
                default: "",
        },
        user_email: {
                type: String,
                required: false,
                default: "",
        },
});

var Book =
        mongoose.model.flightBookingSchema ||
        mongoose.model("flight_booking", flightBookingSchema);

module.exports = Book;
