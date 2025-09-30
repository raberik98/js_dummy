import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productsIds: {
        type: [
            {
                type: String
            }
        ],
        required: true,
        default: []
    },
    balance: {
        type: Number,
        default: 0,
        required: true
    },
    submitted: {
        type: Boolean,
        default: false,
        required: true
    }
})

export default mongoose.model("Order", orderSchema, "orders")