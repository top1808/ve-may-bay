interface Departure {
	iataCode?: string;
	terminal?: string;
	at?: string; // Should ideally be a Date type
}

interface Arrival {
	iataCode?: string;
	terminal?: string;
	at?: string; // Should ideally be a Date type
}

interface Aircraft {
	code?: string;
}

interface Segment {
	departure?: Departure;
	arrival?: Arrival;
	carrierCode?: string;
	number?: string;
	aircraft?: Aircraft;
	operating?: {
		carrierCode?: string;
	};
	duration?: string; // Should ideally be a Duration type
	id?: string;
	numberOfStops?: number;
	blacklistedInEU?: boolean;
}

interface Itinerary {
	duration?: string; // Should ideally be a Duration type
	segments?: Segment[];
}

interface Fee {
	amount?: string;
	type?: string;
}

interface Price {
	currency?: string;
	total?: string;
	base?: string;
	fees?: Fee[];
	grandTotal?: string;
}

interface TravelerPricing {
	travelerId?: string;
	fareOption?: string;
	travelerType?: string;
	price?: Price;
	fareDetailsBySegment?: {
		segmentId?: string;
		cabin?: string;
		fareBasis?: string;
		class?: string;
		includedCheckedBags?: {
			weight?: number;
			weightUnit?: string;
		};
	}[];
}

interface ItemFlight {
	type?: string;
	id?: string;
	source?: string;
	instantTicketingRequired?: boolean;
	nonHomogeneous?: boolean;
	oneWay?: boolean;
	lastTicketingDate?: string; // Should ideally be a Date type
	lastTicketingDateTime?: string; // Should ideally be a Date type
	numberOfBookableSeats?: number;
	itineraries: Itinerary[];
	price?: Price;
	pricingOptions?: {
		fareType?: string[];
		includedCheckedBagsOnly?: boolean;
	};
	validatingAirlineCodes?: string[];
	travelerPricings?: TravelerPricing[];
}
