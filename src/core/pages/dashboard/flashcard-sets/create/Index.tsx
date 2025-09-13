import {Button} from "@/components/ui/button";
// import {format} from "date-fns";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
// import {
//     Popover,
//     PopoverTrigger,
//     PopoverContent,
// } from "@/components/ui/popover";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import {Textarea} from "@/components/ui/textarea";
//import { Card, CardHeader, CardContent } from "@/components/ui/card";
import DashboardTitle from "@/core/shared-components/DashboardTitle";
import {CheckCircle, Loader2} from "lucide-react";
import {useForm} from "react-hook-form";

// import {cn} from "@/lib/utils";
// import {Calendar} from "@/components/ui/calendar";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {toast, ToastContainer} from "react-toastify";
import {processApiCallErrors} from "@/core/helpers/helpers";
import {useState} from "react";
import apiClient from "@/lib/axios.ts";

const formSchema = z.object({
    nameOfFlashCardSet: z.string(),
    fileToUpload: z.any()
});

const Index = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nameOfFlashCardSet: "",
        },
    });
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsCreating(true);
        const formData = new FormData();
        formData.append("name", values.nameOfFlashCardSet);
        if (selectedFile) {
            formData.append("uploadedFile", selectedFile);
        }

        try {
            await apiClient.post("/flashcard-sets", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast("New study set created successfully", {type: "success"});
            form.reset();
            setSelectedFile(null);
        } catch (error) {
            processApiCallErrors(error);
        } finally {
            setIsCreating(false);
        }
    }

    return (
        <>
            <ToastContainer/>
            <DashboardTitle>Create new study set</DashboardTitle>
            <div className="bg-white mt-6 p-6 rounded-md">

                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1  gap-5">

                                <FormField
                                    control={form.control}
                                    name="nameOfFlashCardSet"
                                    render={({field}) => (
                                        <FormItem className="space-y-1 mb-2">
                                            <FormLabel>Flashcard set name: </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Biology"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="fileToUpload"
                                    render={({field}) => (
                                        <FormItem className="space-y-1 mb-2">
                                            <FormLabel>Data file to upload: </FormLabel>
                                            <div
                                                className={"h-[200px] bg-[#f6f7fb] flex justify-center items-center flex-col rounded-md"}>
                                                <FormControl>
                                                    <Input
                                                        className={`px-3 py-[1.7em] h-auto w-auto cursor-pointer`}
                                                        type="file"
                                                        {...field}
                                                        onChange={handleFileChange}
                                                    />
                                                </FormControl>
                                            </div>
                                        </FormItem>
                                    )}
                                />


                                <div className={`flex justify-end`}>
                                    {isCreating ? (
                                        <Button disabled className="mt-6">
                                            <Loader2 className="animate-spin"/>
                                            Upload & Create Study Set
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="mt-6">
                                            <CheckCircle/> Upload & Create Study Set
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Index;
