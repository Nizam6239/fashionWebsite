import mongoose, {Schema, Document} from "mongoose";

export interface Cart extends Document{
    userId: mongoose.Schema.Types.ObjectId;
    productId: number;
    quantity: number;
    createdAt: Date;
}

const cartSchema: Schema<Cart> = new Schema({
    productId: {
        type: Number,
        required: [true, "Product ID is required"],
        unique: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: false,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    }
  });
  
  // No unique constraint on userId
  cartSchema.index({ userId: 1 }); // Index userId for query efficiency, but no unique constraint
  

const CartModel = (mongoose.models.Cart as mongoose.Model<Cart>) || mongoose.model<Cart>("Cart", cartSchema);
export default CartModel
