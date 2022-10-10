// location
export class Location {
    constructor(
        public state: string | null,
        public utilityProviders: ListUtilities | null,
        public desableButton: boolean | null
    ) {}
}

export class ListUtilities {
    constructor(
        public electricUtilityId: number | null,
        public fossilFuelUtilityId: number | null
    ) {}
}

// Dwelling info
export class DwellingInfo{
    constructor(
        public fuelSource: string | null,
        public ConstructionType: string | null,
        public desableButton: boolean | null
    ) {}
}


