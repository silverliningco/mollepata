// location
export class Location {
    constructor(
        public state: string,
        public utilityProviders: ListUtilities
    ) {}
}

export class ListUtilities {
    constructor(
        public electricUtilityId: number | string,
        public fossilFuelUtilityId: number | string
    ) {}
}