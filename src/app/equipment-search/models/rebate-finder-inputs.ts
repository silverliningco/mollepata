// EquipmentSearch
export class EquipmentSearch {
    constructor(
    public location?: Location,
    public dwellingInfo?: DwellingInfo,
    public heatedCooled?: HeatedCooled,
    public systemSize?: SystemSize,
    public systemDesign?: SystemDesign
    ) {

    }
}

// location
export class Location {
    constructor(
        public state: string,
        public utilityProviders: UtilityProviders
    ) { }
}

export class UtilityProviders {
    constructor(
        public electricUtilityId: number,
        public fossilFuelUtilityId: number
    ) { }
}

// Dwelling info
export class DwellingInfo {
    constructor(
        public fuelSource: string,
        public constructionType: string
    ) { }
}

// heated and cooled
export class HeatedCooled {
    constructor(
        public heated: boolean,
        public cooled: boolean
    ) { }
}

// system size
export class SystemSize {
    constructor(
        public heatingBTUH: number,
        public coolingTons: number
    ) { }
}

// System design
export class SystemDesign {
    constructor(
        public outdoorSystemType: boolean,
        public indoorSystemType: boolean,
        public furnaceType: boolean,
        public furnaceConfiguration: boolean,
        public msMultiZoneType?: msMultiZoneType[]
    ) { }
}

export class msMultiZoneType {
    constructor(
        public qty: number = 0,
        public unitType: string = '',
        public size: number = 0
        ) { }
}

/*
// diferencias entre interfaces y clases
// interface solo se usa para verficacion de tipos

//clase inicializar propiedades organizar codigo, object

class Employee{
  //Attributes : variables

  //metods: acciones
  showInfo():void{
    console.log(this.name);
  }
  constructor(){}
}



cons emp =new Employee();

generics:
reactive forms modern !!
template driven forms ngModel
*/