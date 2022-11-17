export class States {
    constructor(
        public abbreviation: string | null,
        public name: string | null  
    ) {}
}

export class UtilityInfo {
    constructor(
        public description: string | null,
        public electricity: boolean | null,
        public fossilFuel: boolean | null,
        public title: string | null,
        public state: string[] | null,
        public utilityProviderId: number | null  
    ) {}
}

export class MsUnits {
    constructor(
        public qty: number | null,
        public unitType: string | null,
        public size: number | null,
    ) {}
}
