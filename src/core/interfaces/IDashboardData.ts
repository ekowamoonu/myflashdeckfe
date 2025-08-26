import {IFlashcardSet} from "@/core/interfaces/IFlashcardSet.ts";

export interface IDashboardData {
    numberOfCollections: number;
    numberOfFlashcardSets: number;
    numberOfFlashcards: number;
    recentlyCreatedFlashcardSets: IFlashcardSet[];
    userName: string | null;
}
