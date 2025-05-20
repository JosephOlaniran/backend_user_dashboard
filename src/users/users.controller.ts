import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Get('metrics/users')
  getUserMetrics() {
    return this.usersService.getMetrics();
  }

  @Get('users')
  getUsers(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.usersService.findAll(startDate, endDate, Number(page), Number(limit));
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Get('users/:id')
  getUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }
  @Post('users')
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Patch('users/:id/approve')
  approveUser(@Param('id') id: number) {
    return this.usersService.approveUser(Number(id));
  }
}
