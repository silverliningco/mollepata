export interface EquipmentSearch {
    state?: String;
    utilityProviders?: UtilityProviders;
    dwellingInfo?: DwellingInfo;
    heatedCooled?: HeatedCooled;
    systemSize?: SystemSize;
    systemDesign?: SystemDesign | null;
    commerceInfo?: CommerceInfo;
    eligibilityQuestions?: EligibilityQuestion[];
    eligibilityRequirements?: number[];
}

export interface UtilityProviders {
    electricUtilityId: number;
    fossilFuelUtilityId: number; 
}

export interface DwellingInfo {
    fuelSource: string;
    constructionType: string; 
}

export interface HeatedCooled {
    heated: boolean;
    cooled: boolean; 
}

export interface SystemSize {
    heatingBTUH: number;
    coolingTons: number; 
}

export interface SystemDesign {
    outdoorSystemType: boolean;
    indoorSystemType: boolean;
    furnaceType: boolean;
    furnaceConfiguration: boolean;
    msMultiZoneType?: msMultiZoneType[];
}

export interface msMultiZoneType {
    qty: number;
    unitType: string;
    size: number;   
}

export interface CommerceInfo {
    eCommerceGatewayId: string;
    storeId: number; 
    stockStatus: string;
}
export interface EligibilityQuestion{
    questionId: number;
    selectedValue: string;
}

