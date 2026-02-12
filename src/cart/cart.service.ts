import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { User } from '../users/users.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepo: Repository<CartItem>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async addToCart(userId: string, productId: string, quantity: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    const existingItem = await this.cartRepo.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
      relations: ['user', 'product'],
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      return this.cartRepo.save(existingItem);
    }

    const newItem = this.cartRepo.create({
      user,
      product,
      quantity,
    });

    return this.cartRepo.save(newItem);
  }

  getCart(userId: string) {
    return this.cartRepo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async removeItem(itemId: string) {
    const item = await this.cartRepo.findOne({ where: { id: itemId } });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    await this.cartRepo.delete(itemId);
    return { removed: true };
  }
}
