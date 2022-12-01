export class States {
    constructor(
        public abbreviation: string | null,
        public name: string | null  
    ) {}
}

export class UtilityInfo {
    constructor(
        public description: string | null,
        public electricity: boolean | null,
        public fossilFuel: boolean | null,
        public title: string | null,
        public state: string[] | null,
        public utilityProviderId: number | null  
    ) {}
}

export class EligybilityRequirement {
    constructor(
        public options: string[] | null,
        public requirementId: number | null,
        public requirementText?: string | null,
    ) {}
}

export class EligibilityQuestions {
    constructor(
        public options: string[] | null,
        public questionId: number | null,
        public questionText?: string | null,
    ) {}
}