export interface IFlashcard {
    id: number;
    flashcardSetId: number;
    term: string;
    definition: string;
    order: number;
    createdAtRaw: string;
    createdAtFormatted: string;
    updatedAtRaw: string;
    updatedAtFormatted: string;
}