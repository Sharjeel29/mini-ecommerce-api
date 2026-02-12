import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CartItem } from '../cart/cart-item.entity';
import { Product } from '../products/product.entity';
import { User } from '../users/users.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,

    @InjectRepository(CartItem)
    private cartRepo: Repository<CartItem>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // place order
  async placeOrder(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const cartItems = await this.cartRepo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    for (const item of cartItems) {
      if (item.quantity > item.product.stock) {
        throw new BadRequestException(
          `Not enough stock for ${item.product.name}`,
        );
      }
    }

    
    let total = 0;
    for (const item of cartItems) {
      total += Number(item.product.price) * item.quantity;
    }

    const order = this.orderRepo.create({
      user,
      totalAmount: total,
    });

    const savedOrder = await this.orderRepo.save(order);

    for (const item of cartItems) {
      const orderItem = this.orderItemRepo.create({
        order: savedOrder,
        product: item.product,
        quantity: item.quantity,
        priceAtPurchase: item.product.price,
      });

      await this.orderItemRepo.save(orderItem);

      //   Reduce stock
      item.product.stock -= item.quantity;
      await this.productRepo.save(item.product);
    }

    await this.cartRepo.delete({ user: { id: userId } });

    return savedOrder;
  }


async cancelOrder(userId: string, orderId: string) {
  const order = await this.orderRepo.findOne({
    where: { id: orderId },
    relations: ['user'],
  });

  if (!order) throw new NotFoundException('Order not found');

  if (order.user.id !== userId) {
    throw new BadRequestException('You can only cancel your own order');
  }

  if (order.status !== OrderStatus.PENDING) {
    throw new BadRequestException(
      'Only pending orders can be cancelled',
    );
  }

  const user = await this.userRepo.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundException('User not found');

  if (user.cancelCount >= 3) {
    throw new BadRequestException(
      'Too many cancellations. You are blocked.',
    );
  }

  // Restore stock
  const orderItems = await this.orderItemRepo.find({
    where: { order: { id: orderId } },
    relations: ['product'],
  });

  for (const item of orderItems) {
    item.product.stock += item.quantity;
    await this.productRepo.save(item.product);
  }

  order.status = OrderStatus.CANCELLED;
  await this.orderRepo.save(order);

  user.cancelCount += 1;
  await this.userRepo.save(user);

  return { message: 'Order cancelled successfully' };
}



}
