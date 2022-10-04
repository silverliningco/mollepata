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