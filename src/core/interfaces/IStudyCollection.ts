import {IFlashcardSet} from "@/core/interfaces/IFlashcardSet.ts";

export interface IStudyCollection {
    id: string;
    name: string;
    flashcardSets: IFlashcardSet[];
}