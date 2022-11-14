export class States {
    constructor(
        public abbreviation: string | null,
        public name: boolean | null  
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
