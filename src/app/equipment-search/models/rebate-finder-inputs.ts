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
export class DwellingInfo {
    constructor(
        public fuelSource: string | null,
        public ConstructionType: string | null,
        public desableButton: boolean | null
    ) {}
}

// heated and cooled
export class HeatedCooled {
    constructor(
        public heated: boolean | null,
        public cooled: boolean | null,
        public desableButton: boolean | null
    ) {}
}

// nominal size
export class Nominalsize {
    constructor(
        public heatingBTUH: number | null,
        public coolingTons: number | null,
        public desableButton: boolean | null
    ) {}
}


