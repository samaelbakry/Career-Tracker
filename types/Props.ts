import { Job } from "./jobs";

export type FormDialogProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "create" | "edit";
  job?: Job;
}

