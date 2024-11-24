import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "../../../db/schema";
import { deleteProject } from "@/lib/actions/project-actions";
import { toast } from "sonner";

interface ProjectActionsProps {
  project: Project;
  userRole?: string;
}

export function ProjectActions({ project, userRole }: ProjectActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const router = useRouter();


  if (!userRole || (userRole !== "admin" && userRole !== "manager")) {
    return null;
  }

  const handleDelete = async () => {
    try {
      const result = await deleteProject(project.id);
      if (result.success) {
        toast.success("Project deleted successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete project");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        
      toast.error("An error occurred while deleting the project");
    }
    setShowDeleteDialog(false);
  };

  const handleEdit = () => {
    router.push(`/projects/${project.id}/edit`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project &quot;{project.projectName}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
