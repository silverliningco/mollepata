// EquipmentSearch
export class EquipmentSearch {
    constructor(
        public location: Location,
        public dwellingInfo: DwellingInfo,
        public heatedCooled: HeatedCooled,
        public nominalsize: Nominalsize,
        public systemDesign: SystemDesign
    ) {}
}

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
export class DwellingInfo {
    constructor(
        public fuelSource: string | null,
        public constructionType: string | null
    ) {}
}

// heated and cooled
export class HeatedCooled {
    constructor(
        public heated: boolean | null,
        public cooled: boolean | null
    ) {}
}

// nominal size
export class Nominalsize {
    constructor(
        public heatingBTUH: number | null,
        public coolingTons: number | null
    ) {}
}

// System design
export class SystemDesign {
    constructor(
        public outdoorSystemType: boolean | null,
        public indoorSystemType: boolean | null,
        public furnaceType: boolean | null,
        public furnaceConfiguration: boolean | null,
        public msMultiZoneType?: msMultiZoneType[] | null
    ) {}
}

export class msMultiZoneType {
    constructor(
        public qty: number | null,
        public unitType: string | null,
        public size: number | null,
    ) {}
}


