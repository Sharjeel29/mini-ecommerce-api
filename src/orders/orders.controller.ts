import { Controller, Post, UseGuards, Req, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorators';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CUSTOMER')
  @Post(':id/cancel')
  cancelOrder(@Req() req, @Param('id') id: string) {
    return this.ordersService.cancelOrder(req.user.userId, id);
  }
}
