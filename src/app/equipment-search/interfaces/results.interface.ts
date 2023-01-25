export interface Sku {
    qty: number;
    sku: string;
  } 
  
  export interface Component {
    title: string;
    description: string;
    componentType: string;
  }
  
  export interface Result{
    skus: Sku[];
    components: Component[];
    configurationOptions: any[];
    AHRIRatings: any[];
    availableRebates: any[];
    availableRebateAmount: number;
  }

  export interface Card extends Result{
    outdoorUnit: Component;
    indoorUnits: Component[];
    furnaces: Component[];
    configurations: any[];
  }
  