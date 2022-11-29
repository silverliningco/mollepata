import { Result} from './results';

export class Card {
    constructor(
        public outdoorUnit: string, 
        public properties: Result,
        public allOptions: Result,
        public bestOption: Result 
    ) {}
}