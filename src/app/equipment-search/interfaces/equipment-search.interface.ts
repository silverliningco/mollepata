export interface EquipmentSearch {
    state?: String;
    utilityProviders?: UtilityProviders;
    dwellingInfo?: DwellingInfo;    
    systemDesign?: SystemDesign | null;
    systemSize?: SystemSize;    
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

export interface SystemSize {
    heatingBTUH: number;
    coolingTons: number; 
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

