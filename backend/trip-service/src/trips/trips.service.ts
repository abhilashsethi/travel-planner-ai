import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTripDto: CreateTripDto) {
    const { userId, title, destination, startDate, endDate } = createTripDto;

    return this.prisma.trip.create({
      data: {
        userId,
        title,
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
  }


  async findAll() {
    return this.prisma.trip.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.trip.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const { startDate, endDate, ...data } = updateTripDto;

    return this.prisma.trip.update({
      where: { id },
      data: {
        ...data,
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.trip.delete({
      where: { id },
    });
  }
}