import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Between, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getMetrics() {
    const total = await this.userRepository.count();
    const active = await this.userRepository.count({ where: { isApproved: true } });
    const inactive = await this.userRepository.count({ where: { isApproved: false } });
    return { total, active, inactive };
  }

  async findAll(startDate: string, endDate: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [result, total] = await this.userRepository.findAndCount({
      where: {
        createdAt: Between(new Date(startDate), new Date(endDate))
      },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return {
      data: result,
      total,
      page,
      limit,
    };
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return { message: 'User deleted successfully' };
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(dto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...dto,
      isApproved: false,
    });
    return await this.userRepository.save(newUser);
  }

  async approveUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    user.isApproved = true;
    return this.userRepository.save(user);
  }
}
