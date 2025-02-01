import mongoose, { Schema, Document } from "mongoose";

export interface Cart extends Document {
    userId: string; // Change to String
    productId: number;
    quantity: number;
    createdAt: Date;
}

const cartSchema: Schema<Cart> = new Schema({
    productId: {
        type: Number,
        required: [true, "Product ID is required"],
    },
    userId: {
        type: String, // Change to String
        required: [true, "User ID is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

// Compound unique index to prevent duplicate product entries for the same user
cartSchema.index({ userId: 1, productId: 1 }, { unique: true });

const CartModel = (mongoose.models.Cart as mongoose.Model<Cart>) || mongoose.model<Cart>("Cart", cartSchema);
export default CartModel;
