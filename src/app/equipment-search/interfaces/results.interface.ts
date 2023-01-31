export interface Sku {
    qty: number;
    sku: string;
  } 
  
  export interface ComponentObj {
    title: string;
    description: string;
    componentType: string;
  }
  
  export interface Result {
    skus: Sku[];
    components: ComponentObj[];
    configurationOptions: any[];
    AHRIRatings: any[];
    availableRebates: any[];
    availableRebateAmount: number;
  }

  export interface Card {
    result?: Result;
    cardComponents?: any[string];
    cardConfigurations?: any[string];
    userSelections?: any;
  }
  