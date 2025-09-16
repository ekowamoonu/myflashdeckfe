import {IFlashcard} from "@/core/interfaces/IFlashcard.ts";

export interface IFlashcardSet {
    id: number;
    studyCollectionId: number;
    name: string;
    flashCards: IFlashcard[];
    createdAtRaw: string;
    createdAtFormatted: string;
    updatedAtRaw: string;
    updatedAtFormatted: string;
}