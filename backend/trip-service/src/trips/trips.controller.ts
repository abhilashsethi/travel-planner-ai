import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) { }

  @Post()
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  async findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tripsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripsService.update(id, updateTripDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tripsService.remove(id);
  }
}