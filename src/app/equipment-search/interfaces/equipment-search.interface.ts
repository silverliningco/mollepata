export interface EquipmentSearch {
    location?: Location;
    utilityProviders?: UtilityProviders;
    dwellingInfo?: DwellingInfo;    
    systemDesign?: Array<any>;
    systemSize?: SystemSize;    
    commerceInfo?: CommerceInfo;
}

export interface Location {
    state?: String;
    country?: String;
}

export interface UtilityProviders {
    electricUtilityId: number;
    fossilFuelUtilityId: number; 
}

export interface DwellingInfo {
    fuelSource: string;
    constructionType: string; 
}

export interface SystemSize {
    heatingBTUH: number;
    coolingTons: number; 
}

export interface CommerceInfo {
    eCommerceGatewayId: number;
    stockStatus: string;
}


