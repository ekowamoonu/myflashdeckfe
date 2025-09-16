import {Button} from "@/components/ui/button";

import DashboardTitle from "@/core/shared-components/DashboardTitle";
import {ArrowLeft, ArrowRight, Loader2, Pen, Plus, Save, TrashIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {Link, useParams} from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast, ToastContainer} from "react-toastify";
import {processApiCallErrors} from "@/core/helpers/helpers";
import {useEffect, useState} from "react";
import {IFlashcardSet} from "@/core/interfaces/IFlashcardSet.ts";
import apiClient from "@/lib/axios.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {IFlashcard} from "@/core/interfaces/IFlashcard.ts";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";


const formSchema = z.object({
    term: z.string(),
    definition: z.string(),
});

const Index = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            term: "",
            definition: "",
        },
    });
    const updateCardForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            term: "",
            definition: "",
        },
    });

    const {id} = useParams();
    const [isLoading, setIsLoading] =
        useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [flashcardSetData, setFlashcardSetData] = useState<IFlashcardSet | null>(null);

    // Flipping and sliding cards
    const [cardFlipped, setCardFlipped] = useState<boolean>(false);
    // const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    // const [isAnimating, setIsAnimating] = useState(false);

    // Dialogs
    const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
    const [openUpdateCardDialog, setOpenUpdateCardDialog] = useState(false);
    const [openDeleteCardDialog, setOpenDeleteCardDialog] = useState(false);
    const [newCardAdded, setNewCardAdded] = useState<boolean>(false);
    const [currentlySelectedCard, setCurrentlySelectedCard] = useState<IFlashcard>({} as IFlashcard);


    async function getFlashcardSetData() {
        try {
            setIsLoading(true);
            const response = await apiClient.get<{ data: IFlashcardSet }>(
                `/flashcard-sets/${id}`
            );
            setFlashcardSetData(response.data.data);
        } catch (error) {
            processApiCallErrors(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleNext = () => {
        // if (isAnimating) return;
        // setSlideDirection("next");
        setCardFlipped(false);
        // setIsAnimating(true);

        setCurrentIndex(
            (prevIndex) =>
                (prevIndex + 1) % (flashcardSetData?.flashCards.length ?? 1)
        );


        // setTimeout(() => {
        //     setCurrentIndex(
        //         (prevIndex) =>
        //             (prevIndex + 1) % (flashcardSetData?.flashCards.length ?? 1)
        //     );
        //     setIsAnimating(false);
        // }, 500);
    }

    const handlePrevious = () => {
        setCardFlipped(false);
        setCurrentIndex(
            (prevIndex) => {
                const nextIndex = prevIndex - 1;
                return nextIndex < 0 ? (flashcardSetData?.flashCards.length ?? 1) - 1 : nextIndex
            }
        );
    }

    async function onAddNewCardFormSubmit(values: z.infer<typeof formSchema>) {
        setIsSaving(true);
        try {
            await apiClient.post(`/flashcards`, {...values, flashcardSetId: id});
            toast("New flashcard added successfully", {type: "success"});
            setOpenNewCardDialog(false);
            await getFlashcardSetData();
            setNewCardAdded(true);
            form.reset();
        } catch (error) {
            processApiCallErrors(error);
        } finally {
            setIsSaving(false);
        }
    }

    const handleOpenUpdateCardDialog = () => {
        updateCardForm.reset(currentlySelectedCard);
        setOpenUpdateCardDialog(true);
    }

    async function onUpdateCardFormSubmit(values: z.infer<typeof formSchema>) {
        setIsSaving(true);
        try {
            await apiClient.patch(`/flashcards/${currentlySelectedCard.id}`, {...values, flashcardSetId: id});
            toast("Flashcard updated successfully", {type: "success"});
            setOpenUpdateCardDialog(false);
            await getFlashcardSetData();
        } catch (error) {
            processApiCallErrors(error);
        } finally {
            setIsSaving(false);
        }
    }

    async function deleteCard() {
        setIsSaving(true);
        try {
            await apiClient.delete(`/flashcards/${currentlySelectedCard.id}`, {});
            toast("Flashcard deleted successfully", {type: "success"});
            setOpenDeleteCardDialog(false);
            await getFlashcardSetData();

            //reset currently selected card and current index
            setCurrentlySelectedCard({} as IFlashcard);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (flashcardSetData?.flashCards.length ?? 1));

        } catch (error) {
            processApiCallErrors(error);
        } finally {
            setIsSaving(false);
        }
    }

    useEffect(() => {
        getFlashcardSetData();
    }, []);

    useEffect(() => {
        if (newCardAdded && flashcardSetData?.flashCards.length) {
            setCurrentIndex(flashcardSetData.flashCards.length - 1);
            setNewCardAdded(false);
        }
    }, [newCardAdded, flashcardSetData?.flashCards.length]);

    useEffect(() => {
        setCurrentlySelectedCard(flashcardSetData?.flashCards[currentIndex] ?? {} as IFlashcard);
    }, [currentIndex]);


    return (
        <>
            <ToastContainer/>
            <DashboardTitle>Viewing Flashcard Set <span
                className={`text-blue-950`}> - {flashcardSetData?.name}</span
            ></DashboardTitle>

            {/*New card modal*/}
            <Dialog open={openNewCardDialog} onOpenChange={setOpenNewCardDialog}>
                <DialogContent className={`max-w-4xl`}>
                    <DialogHeader>
                        <DialogTitle className={`text-2xl`}>Add a new card to this study set</DialogTitle>
                        <DialogDescription>
                            This will add a new card at the end of your current set of cards
                        </DialogDescription>
                        {/*form*/}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onAddNewCardFormSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="term"
                                    render={({field}) => (
                                        <FormItem className="space-y-1 mb-2">
                                            <FormLabel>Term</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="mt-[100px]"
                                                    placeholder="Term"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="definition"
                                    render={({field}) => (
                                        <FormItem className="space-y-1 mb-3">
                                            <FormLabel>Definition</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Correct answer or definition for the term"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <div className={`w-full flex justify-end items-center`}>
                                    {isSaving ? (
                                        <Button disabled className="mt-6">
                                            <Loader2 className="animate-spin"/>
                                            Create card
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            // disabled={errorLoadingExpense}
                                            className="mt-6"
                                        >
                                            <Plus/> Add new card
                                        </Button>
                                    )}
                                </div>

                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {/*Edit card modal*/}
            <Dialog open={openUpdateCardDialog} onOpenChange={setOpenUpdateCardDialog}>
                <DialogContent className={`max-w-4xl`}>
                    <DialogHeader>
                        <DialogTitle className={`text-2xl`}>Add a new card to this study set</DialogTitle>
                        <DialogDescription>
                            This will add a new card at the end of your current set of cards
                        </DialogDescription>
                        {/*form*/}
                        <Form {...updateCardForm}>
                            <form onSubmit={updateCardForm.handleSubmit(onUpdateCardFormSubmit)}>
                                <FormField
                                    control={updateCardForm.control}
                                    name="term"
                                    render={({field}) => (
                                        <FormItem className="space-y-1 mb-2">
                                            <FormLabel>Term</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="mt-[100px]"
                                                    placeholder="Term"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={updateCardForm.control}
                                    name="definition"
                                    render={({field}) => (
                                        <FormItem className="space-y-1 mb-3">
                                            <FormLabel>Definition</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Correct answer or definition for the term"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <div className={`w-full flex justify-end items-center`}>
                                    {isSaving ? (
                                        <Button disabled className="mt-6">
                                            <Loader2 className="animate-spin"/>
                                            Save changes
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            // disabled={errorLoadingExpense}
                                            className="mt-6"
                                        >
                                            <Save/> Save changes
                                        </Button>
                                    )}
                                </div>

                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {/*Delete card dialog*/}
            <AlertDialog open={openDeleteCardDialog} onOpenChange={setOpenDeleteCardDialog}>
                <AlertDialogContent className={`max-w-2xl`}>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={`text-2xl`}>Are you absolutely
                            sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this card from your current study
                            set.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteCard}>
                            {isSaving ? <Loader2 className="animate-spin"/> : ""} Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <p>{flashcardSetData?.flashCards.length ?? 0} cards in this set</p>
            <div className="rounded-md">
                {/*<div className="bg-white mt-6 p-6 rounded-md">*/}

                <div className="mt-6">
                    {
                        isLoading
                            ? <div className="w-full">
                                <Skeleton className="h-[50px] w-full rounded-lg"/>
                                <Skeleton className="h-[30px] w-[80%] rounded-lg mt-2"/>
                                <Skeleton className="h-[20px] w-[70%] rounded-lg mt-2"/>
                            </div>
                            : ((flashcardSetData?.flashCards.length ?? 0) > 0
                                ?
                                <div className={`flex items-center justify-center w-full flex-col`}>

                                    <div
                                        className={`perspective w-[80%] h-[31.25rem] cursor-pointer flex items-center flex-col justify-center mt-[3rem]`}
                                        onClick={() => setCardFlipped(!cardFlipped)}
                                    >
                                        <Button onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenDeleteCardDialog(true);
                                        }} variant={`secondary`} className={`absolute top-0 right-0 z-10 size-12`}
                                                size={`icon`}>
                                            <TrashIcon/>
                                        </Button>
                                        {/*${slideDirection === "next" && isAnimating ? "scale-[0.1]" : ""}*/}
                                        {/*${slideDirection === "prev" && isAnimating ? "scale-1" : ""}*/}
                                        <div key={flashcardSetData?.flashCards[currentIndex].id}
                                             className={`relative transition-all ease-in-out duration-500 
                                                    ${cardFlipped ? "rotate-x-180" : ""}
                                                    bg-white w-full cursor-pointer transform-style-preserve-3d h-full 
                                                    text-3xl  
                                                    shadow-[0_0_2rem_0_#282E3E1A] 
                                                    gap-3 rounded-3xl mb-2`}>

                                            {/*Front side*/}
                                            <div
                                                className={`backface-hidden absolute w-full h-full text-center flex flex-col items-center justify-center p-[3rem]`}>
                                                <p className={`font-bold`}>{flashcardSetData?.flashCards[currentIndex].term}</p>
                                            </div>

                                            {/*Back side*/}
                                            <div
                                                className={`backface-hidden absolute w-full text-center h-full flex flex-col items-center justify-center rotate-x-180 p-[3rem]`}>
                                                <p>{flashcardSetData?.flashCards[currentIndex].definition}</p>
                                            </div>

                                        </div>
                                        <div className={`mb-4 mt-6 w-full flex gap-4 justify-between items-center`}>
                                            <div>
                                                <Button variant={`success`} onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenNewCardDialog(true)
                                                }}>
                                                    <Plus/> Add new card
                                                </Button>
                                            </div>
                                            <div className={`w-full flex gap-4 justify-end items-center`}>
                                                <Button variant={`warning`} onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenUpdateCardDialog();
                                                }}>
                                                    <Pen fill={`#000`}/> Edit card
                                                </Button>
                                                <Button onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePrevious();
                                                }}>
                                                    <ArrowLeft/>
                                                </Button>
                                                <p className={`font-bold text-[#586380]`}>
                                                    {currentIndex + 1}/{flashcardSetData?.flashCards.length}
                                                </p>
                                                <Button onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleNext();
                                                }}>
                                                    <ArrowRight/>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                : <div className={"flex flex-col items-center justify-center"}>
                                    <p className={'text-[#586380] text-muted opacity-50 mb-4'}>You have not added any
                                        flashcards for this study set yet.</p>
                                    <Button asChild>
                                        <Link to="/flashcard-sets/create" className={"pt-6 pl-2"}>
                                            <Plus/> Create flashcard
                                        </Link>
                                    </Button>
                                </div>)
                    }
                </div>
            </div>
        </>
    );
};

export default Index;
