import { NextRequest, NextResponse } from 'next/server';
import CartModel from '../../models/Cart.models';
import dbConnect from '@/app/lib/dbConnect';
import { p } from 'framer-motion/client';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { userId, productId, quantity } = await req.json();

  try {
    let cart = await CartModel.findOne({ userId, productId });
    if (cart) {
      cart.quantity = quantity;
      await cart.save();
      return NextResponse.json(cart, { status: 200 });
    } else {
      const newCart = new CartModel({
        userId,
        productId,
        quantity,
      });
      await newCart.save();
      return NextResponse.json(newCart, { status: 201 });
    }
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    const { productId } = await req.json();
  
    try {
      if (productId) {
        const deletedItem = await CartModel.findOneAndDelete({ productId: productId });
  
        if (!deletedItem) {
          return NextResponse.json({ message: "Cart item not found" }, { status: 404 });
        }
  
        return NextResponse.json({ message: "Item removed from cart" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "Cart item ID is missing" }, { status: 400 });
      }
    } catch (error) {
      console.error("Error handling DELETE request:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  }
  