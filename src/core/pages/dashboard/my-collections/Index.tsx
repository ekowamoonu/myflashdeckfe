import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {processApiCallErrors} from "@/core/helpers/helpers";
import DashboardTitle from "@/core/shared-components/DashboardTitle";
import Loader from "@/core/shared-components/Loader";
import {Book, CirclePlus, TrashIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {IStudyCollection} from "@/core/interfaces/IStudyCollection.ts";
import apiClient from "@/lib/axios.ts";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";

const Index = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [myCollections, setMyCollections] = useState<IStudyCollection[]>([]);

    useEffect(() => {
        const getMyCollections = async () => {
            setIsLoading(true);
            try {
                const response = await apiClient.get<{ data: IStudyCollection[] }>(
                    "/study-collections"
                );
                setMyCollections(response.data.data);
            } catch (error) {
                processApiCallErrors(error);
            } finally {
                setIsLoading(false);
            }
        };

        getMyCollections();
    }, []);

    return (
        <>
            <ToastContainer/>
            <DashboardTitle>My Collections</DashboardTitle>
            <p className={`text-[#586380]`}>Select your material below to start studying</p>
            <div className="bg-white mt-6 p-6 rounded-md">
                <div className="flex justify-end">
                    <Button>
                        <CirclePlus/> Add New
                    </Button>
                </div>

                {isLoading ? (
                    <p className="mt-6 flex items-center justify-center">
                        <Loader/>
                    </p>
                ) : (
                    <div className="mt-5">
                        {myCollections.length > 0 ?
                            <Accordion
                                type="multiple"
                                className="w-full"
                            >
                                {myCollections.map((myCollection) => {
                                    return (
                                        <AccordionItem key={myCollection.id} value={myCollection.id}
                                                       className={`bg-[#eee] p-4 rounded-lg`}>
                                            <AccordionTrigger
                                                className={`text-xl`}>{myCollection.name}</AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                                {myCollection.flashcardSets.map((flashcardSet) => {
                                                    return <Card
                                                        key={flashcardSet.id}
                                                        className="hover:border-slate-700  rounded-tl-xl rounded-tr-xl overflow-hidden">
                                                        <CardContent
                                                            className="p-4 flex justify-between items-center">
                                                            <div>
                                                                <p className="font-bold mb-2 text-slate-800">
                                                                    {flashcardSet.name}
                                                                </p>
                                                                <p>{flashcardSet.flashCards.length} cards</p>
                                                            </div>
                                                            <div className={`flex items-center justify-center gap-4`}>
                                                                <Button asChild variant={`warning`}>
                                                                    <Link
                                                                        to={"/flashcard-sets/details/" + flashcardSet.id}>
                                                                        <Book/> Study
                                                                    </Link>
                                                                </Button>
                                                                <Button onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    // setOpenDeleteCardDialog(true);
                                                                }} variant={`secondary`}
                                                                        className={`size-10`}
                                                                        size={`icon`}>
                                                                    <TrashIcon/>
                                                                </Button>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                })}

                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}

                            </Accordion>
                            : (
                                <p className="mt-6 text-center">No collections found</p>
                            )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Index;
