import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, Kafka } from 'kafkajs';

interface TripCreatedEvent {
  event: 'trip.created';
  tripId: string;
  userId: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
}

@Injectable()
export class KafkaConsumerService
  implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaConsumerService.name);
  private readonly consumer: Consumer;
  private isConnected = false;

  constructor(private readonly configService: ConfigService) {
    const brokers = this.configService
      .get<string>('KAFKA_BROKERS', 'localhost:9092')
      .split(',')
      .map((broker) => broker.trim())
      .filter(Boolean);

    const kafka = new Kafka({
      clientId: 'ai-service',
      brokers,
    });

    this.consumer = kafka.consumer({
      groupId: 'ai-service-trip-created',
    });
  }

  async onModuleInit(): Promise<void> {
    await this.consumer.connect();
    this.isConnected = true;

    await this.consumer.subscribe({
      topic: 'trip-created',
      fromBeginning: false,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (!message.value) {
          this.logger.warn(
            `Received an empty message from ${topic}, partition ${partition}`,
          );
          return;
        }

        try {
          const payload: unknown = JSON.parse(
            message.value.toString(),
          );

          if (!this.isTripCreatedEvent(payload)) {
            this.logger.warn(
              `Ignoring an invalid trip-created event from ${topic}`,
            );
            return;
          }

          this.logger.log(
            `Received trip.created: tripId=${payload.tripId}, destination=${payload.destination}`,
          );
        } catch (error) {
          this.logger.error(
            `Failed to process message from ${topic}, partition ${partition}: ${error instanceof Error ? error.message : String(error)
            }`,
          );
        }
      },
    });

    this.logger.log('Subscribed to Kafka topic: trip-created');
  }

  private isTripCreatedEvent(
    payload: unknown,
  ): payload is TripCreatedEvent {
    if (typeof payload !== 'object' || payload === null) {
      return false;
    }

    const event = payload as Record<string, unknown>;

    return (
      event.event === 'trip.created' &&
      typeof event.tripId === 'string' &&
      typeof event.userId === 'string' &&
      typeof event.destination === 'string'
    );
  }

  async onModuleDestroy(): Promise<void> {
    if (this.isConnected) {
      await this.consumer.disconnect();
      this.isConnected = false;
      this.logger.log('Disconnected from Kafka');
    }
  }
}