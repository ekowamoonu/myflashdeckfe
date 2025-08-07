import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { processApiCallErrors } from "@/core/helpers/helpers";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";

import { Fragment } from "react/jsx-runtime";

const DeleteExpense = ({
  id,
  onDelete,
}: {
  id: number;
  onDelete: (id: number) => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteExpense = async (id: number) => {
    setIsDeleting(true);
    try {
      await axios.delete(`/expenses/${id}`);

      setIsDeleting(false);
      onDelete(id);
    } catch (error) {
      setIsDeleting(false);
      processApiCallErrors(error);
    }
  };

  return (
    <Fragment>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} size="icon">
            {isDeleting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              record from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteExpense(id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
};

export default DeleteExpense;
