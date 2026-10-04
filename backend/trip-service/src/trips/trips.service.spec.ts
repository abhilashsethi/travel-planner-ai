import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TripsService } from './trips.service';
import { KafkaService } from '../kafka/kafka.service';

describe('TripsService', () => {
  let service: TripsService;

  const prismaMock = {
    trip: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const kafkaServiceMock = {
    publish: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: KafkaService,
          useValue: kafkaServiceMock,
        },
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  describe('create', () => {
    it('should create a trip', async () => {
      const dto = {
        userId: '17455996-04f5-4d82-9a2a-0d28e134a07e',
        title: 'Bali Trip',
        destination: 'Bali, Indonesia',
        startDate: '2026-12-10',
        endDate: '2026-12-15',
      };

      const createdTrip = {
        id: 'trip-1',
        userId: dto.userId,
        title: dto.title,
        destination: dto.destination,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        status: 'PLANNING',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.trip.create.mockResolvedValue(createdTrip);

      const result = await service.create(dto);

      expect(result).toEqual(createdTrip);
      expect(prismaMock.trip.create).toHaveBeenCalledTimes(1);

      const createCall = prismaMock.trip.create.mock.calls[0][0];

      expect(createCall.data.userId).toBe(dto.userId);
      expect(createCall.data.title).toBe(dto.title);
      expect(createCall.data.destination).toBe(dto.destination);
      expect(createCall.data.startDate).toEqual(new Date(dto.startDate));
      expect(createCall.data.endDate).toEqual(new Date(dto.endDate));
      expect(kafkaServiceMock.publish).toHaveBeenCalledWith(
        'trip-created',
        expect.objectContaining({
          event: 'trip.created',
          tripId: createdTrip.id,
          userId: createdTrip.userId,
        }),
      );
    });
  });

  describe('findAll', () => {
    it('should return all trips', async () => {
      const trips = [
        {
          id: 'trip-1',
          userId: 'user-1',
          title: 'Bali Trip',
          destination: 'Bali',
          startDate: new Date('2026-12-10'),
          endDate: new Date('2026-12-15'),
          status: 'PLANNING',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prismaMock.trip.findMany.mockResolvedValue(trips);

      const result = await service.findAll();

      expect(result).toEqual(trips);
      expect(prismaMock.trip.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a trip by id', async () => {
      const trip = {
        id: 'trip-1',
        userId: 'user-1',
        title: 'Bali Trip',
        destination: 'Bali',
        startDate: new Date('2026-12-10'),
        endDate: new Date('2026-12-15'),
        status: 'PLANNING',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.trip.findUnique.mockResolvedValue(trip);

      const result = await service.findOne('trip-1');

      expect(result).toEqual(trip);
      expect(prismaMock.trip.findUnique).toHaveBeenCalledWith({
        where: { id: 'trip-1' },
      });
    });
  });

  describe('update', () => {
    it('should update a trip', async () => {
      const dto = {
        title: 'Updated Bali Trip',
        destination: 'Ubud, Bali',
      };

      const updatedTrip = {
        id: 'trip-1',
        userId: 'user-1',
        title: dto.title,
        destination: dto.destination,
        startDate: new Date('2026-12-10'),
        endDate: new Date('2026-12-15'),
        status: 'PLANNING',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prismaMock.trip.update.mockResolvedValue(updatedTrip);

      const result = await service.update('trip-1', dto);

      expect(result).toEqual(updatedTrip);
      expect(prismaMock.trip.update).toHaveBeenCalledWith({
        where: { id: 'trip-1' },
        data: {
          title: dto.title,
          destination: dto.destination,
        },
      });
    });
  });

  describe('remove', () => {
    it('should delete a trip', async () => {
      const deletedTrip = {
        id: 'trip-1',
      };

      prismaMock.trip.delete.mockResolvedValue(deletedTrip);

      const result = await service.remove('trip-1');

      expect(result).toEqual(deletedTrip);
      expect(prismaMock.trip.delete).toHaveBeenCalledWith({
        where: { id: 'trip-1' },
      });
    });
  });
});