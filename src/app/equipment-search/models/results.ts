export class Result {
    constructor(
        public EER: number | null,
        public AFUE: number | null,
        public HSPF: number | null,
        public SEER: number | null,
        public Hcap17: number | null,
        public Hcap47: number | null,
        public fuelTypes: string[] | null,
        public components: Components[] | null,
        public equipmentTags: number | null,
        public AHRIReferences: number[] | null,
        public availableRebates: number | null,
        public furnaceInputBTUH: number | null,
        public furnaceOutputBTUH: number | null,
        public configurationOptions: object[] | null,
        public coolingCapacityRated: number | null,
        public furnaceConfigurations: object[] | null,
        public totalAvailableRebates: number | null
        
    ) {}
}

export class Components {
    constructor(
        public id: string | null,
        public SKU: string | null,
        public name: string | null,
        public type: string | null
        
    ) {}
}

export class Card {
    constructor(
        public outdoorUnit: string | null,
        public optionsUnit: any[] | null,
        public EER: number | null,
        public AFUE: number | null,
        public HSPF: number | null,
        public SEER: number | null,
        public Hcap17: number | null,
        public Hcap47: number | null,
        public fuelTypes: string[] | null,
        public equipmentTags: number | null,
        public AHRIReferences: number[] | null,
        public availableRebates: number | null,
        public furnaceInputBTUH: number | null,
        public furnaceOutputBTUH: number | null,
        public configurationOptions: object[] | null,
        public coolingCapacityRated: number | null,
        public furnaceConfigurations: object[] | null,
        public totalAvailableRebates: number | null
        
    ) {}
}

