const mongoose = require("mongoose");

const trainBookingSchema = new mongoose.Schema({
        train_name: String,
        train_number: String,
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
        active: {
                type: Boolean,
                default: false,
        },
        gdate: { type: String, default: Date.now },
        rdate: { type: String, default: "" },
        depart_time: {
                type: String,
                required: false,
                default: "",
        },
        distance: {
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
        date: { type: Date, default: Date.now },
});

var Book =
        mongoose.model.trainBookingSchema ||
        mongoose.model("train_booking", trainBookingSchema);

module.exports = Book;
