import { Result, Components} from './results';

export class Card{
    constructor(
        public outdoorUnit: number | null,
        public properties: Result,
        public options: Components[],
        public bestOption: Components
    ){}
}
