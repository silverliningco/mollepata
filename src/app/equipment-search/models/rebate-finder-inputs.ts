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
        public fuelSource: string | null,
        public ConstructionType: ConstructionType | null
    ) {}
}

export class ConstructionType{
    constructor(
        public year: number | null,
        public gradeStories: number | null,
        public nrBedrooms: number | null,
        public dwellingType: string | null,
        public conditionedBasement: string | null,
        public conditionedSpace: string | null,
        public skylights: string | null,
    ) {}
}

