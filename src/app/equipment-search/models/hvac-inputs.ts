
export class UtilityInfo {
    constructor(
        public description: string,
        public electricity: boolean,
        public fossilFuel: boolean,
        public title: string,
        public state: string[],
        public utilityProviderId: number  
    ) {}
}

export class EligybilityRequirement {
    constructor(
        public options: string[],
        public requirementId: number,
        public requirementText?: string,
    ) {}
}

export class EligibilityQuestions {
    constructor(
        public options: string[],
        public questionId: number,
        public questionText?: string,
        public defaultValue?: string,
    ) {}
}