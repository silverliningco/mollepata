export class Result {
    constructor(
        public EER: number,
        public AFUE: number,
        public HSPF: number,
        public SEER: number,
        public Hcap17: number,
        public Hcap47: number,
        public fuelTypes: string[],
        public components: Components[],
        public equipmentTags: number,
        public AHRIReferences: number[],
        public availableRebates: number,
        public furnaceInputBTUH: number,
        public furnaceOutputBTUH: number,
        public configurationOptions: object[],
        public coolingCapacityRated: number,
        public furnaceConfigurations: object[],
        public totalAvailableRebates: number
        
    ) {}
}

export class Components {
    constructor(
        public id: string,
        public SKU: string,
        public name: string,
        public type: string
        
    ) {}
}

