"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { addProject, updateProject } from "@/lib/actions/project-actions";
import { projectSchema } from "@/lib/validator";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Project } from "../../../db/schema";
import { Departments, Department, ProjectStatus, Priority, Position, OpportunityType } from "@/lib/validator";
import { PreparationLevel } from "@/lib/validator";

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isEditing = !!project;

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: project?.projectName || "",
      bdNumber: project?.bdNumber || "",
      bidLink: project?.bidLink || "",
      priority: project?.priority as Priority || "B",
      preparation: project?.preparation as PreparationLevel || "Medium",
      position: project?.position as Position || "Lead",
      department: project?.department as Department || "",
      bidDirector: project?.bidDirector || "",
      bidManager: project?.bidManager || "",
      donor: project?.donor || "",
      location: project?.location || "",
      oppType: project?.oppType as OpportunityType || "Competitive",
      status: project?.status as ProjectStatus || "In Progress",
      notes: project?.notes || "",
      bidsDeadline: project?.bidsDeadline || "",
      nextFollowUp: project?.nextFollowUp || "",
      budget: project?.budget || "",
      fee: project?.fee || "",
      projectStartDate: project?.projectStartDate || "",
      projectEndDate: project?.projectEndDate || "",
      probation: project?.probation || false,
      adjusted: project?.adjusted || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    setIsSubmitting(true);
    try {
      let result;
      if (isEditing) {
        result = await updateProject(project.id, values);
      } else {
        const valuesWithId = { ...values, id: crypto.randomUUID() };
        result = await addProject(valuesWithId);
      }

      if (result.success) {
        toast({
          title: `Project ${isEditing ? 'updated' : 'created'} successfully`,
          description: result.message,
          duration: 3000,
        });
        setTimeout(() => {
          router.push("/projects");
          router.refresh();
        }, 1000);
      } else {
        toast({
          title: `Failed to ${isEditing ? 'update' : 'create'} project`,
          description: result.error,
          duration: 4000,
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: `An error occurred while ${isEditing ? 'updating' : 'creating'} the project`,
        description: "Please try again later",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          {/* Project Name */}
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* BD Number */}
          <FormField
            control={form.control}
            name="bdNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BD Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Priority */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preparation */}
          <FormField
            control={form.control}
            name="preparation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preparation</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preparation level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Position */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Lead">Lead</SelectItem>
                    <SelectItem value="Partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Department */}
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bid Director */}
          <FormField
            control={form.control}
            name="bidDirector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bid Director</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bid Manager */}
          <FormField
            control={form.control}
            name="bidManager"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bid Manager</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Donor */}
          <FormField
            control={form.control}
            name="donor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Donor</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Opportunity Type */}
          <FormField
            control={form.control}
            name="oppType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opportunity Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select opportunity type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Competitive">Competitive</SelectItem>
                    <SelectItem value="Non-competitive">Non-competitive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ProjectStatus.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bids Deadline */}
          <FormField
            control={form.control}
            name="bidsDeadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bids Deadline</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value || '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Budget */}
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    {...field} 
                    placeholder="Enter budget in USD" 
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value || '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fee */}
          <FormField
            control={form.control}
            name="fee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fee</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    {...field} 
                    placeholder="Enter fee" 
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value || '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bid Link */}
          <FormField
            control={form.control}
            name="bidLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bid Link</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Enter bid link" 
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value || '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Notes */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Enter notes" 
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value || '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Next Follow Up */}
          <FormField
            control={form.control}
            name="nextFollowUp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Next Follow Up</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    value={field.value || ''} 
                    onChange={(e) => field.onChange(e.target.value || '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Project Start Date */}
          <FormField
            control={form.control}
            name="projectStartDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Start Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    value={field.value || ''} 
                    onChange={(e) => field.onChange(e.target.value || '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Project End Date */}
          <FormField
            control={form.control}
            name="projectEndDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project End Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    value={field.value || ''} 
                    onChange={(e) => field.onChange(e.target.value || '')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Probation */}
          <FormField
            control={form.control}
            name="probation"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Probation</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* Adjusted */}
          <FormField
            control={form.control}
            name="adjusted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Adjusted</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isEditing ? 'Updating...' : 'Creating...'}
              </div>
            ) : (
              isEditing ? 'Update Project' : 'Create Project'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
