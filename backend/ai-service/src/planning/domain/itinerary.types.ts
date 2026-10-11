
export type TravelBudget = 'LOW' | 'MEDIUM' | 'HIGH';

export type TravelPace = 'RELAXED' | 'BALANCED' | 'PACKED';

export interface TripPreferences {
  budget?: TravelBudget;
  interests?: string[];
  travelPace?: TravelPace;
}

export interface GenerateItineraryRequest {
  tripId: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  preferences?: TripPreferences;
}

export interface ItineraryActivity {
  time?: string;
  title: string;
  description: string;
  location?: string;
  estimatedCost?: number;
}

export interface ItineraryDay {
  date: string;
  activities: ItineraryActivity[];
}

export interface GeneratedItinerary {
  tripId: string;
  destination: string;
  summary: string;
  days: ItineraryDay[];
  estimatedTotalCost?: number;
}
