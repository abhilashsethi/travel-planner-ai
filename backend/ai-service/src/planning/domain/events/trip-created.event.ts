
export interface TripCreatedEvent {
  eventId: string;
  event: 'trip.created';
  schemaVersion: 1;
  tripId: string;
  userId: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
}
