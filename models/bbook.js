const mongoose = require("mongoose");

const busBookingSchema = new mongoose.Schema({
    company_name: String,
        bus_number: String,
        from_city: {
                type: String,
                required: false,
                default: "",
        },
        to_city: {
                type: String,
                required: false,
                default: "",
        },
        
        gdate: { type: String, default: Date.now },
        rdate: { type: Date, default: Date.now },
        active: {
            type: Boolean,
            default: false,
    },
        date: { type: Date, default: Date.now },
        price: {
                type: String,
                required: false,
                default: "",
        },
        departure_address: {
                type: String,
                required: false,
                default: "",
        },
        departure_time: {
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
        mongoose.model.busBookingSchema ||
        mongoose.model("bus_booking", busBookingSchema);

module.exports = Book;
