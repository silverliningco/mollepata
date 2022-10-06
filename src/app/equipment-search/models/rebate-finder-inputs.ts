// location
export class Location {
    constructor(
        public state: string | null,
        public utilityProviders: ListUtilities | null
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
        public year: number | null,
        public gradeStories: number | null,
        public nrBedrooms: number | null,
        public dwellingType: string | null,
        public conditionedBasement: string | null,
        public conditionedSpace: string | null,
        public skylights: string | null,
        public fuelSource: string | null,
    ) {}
}