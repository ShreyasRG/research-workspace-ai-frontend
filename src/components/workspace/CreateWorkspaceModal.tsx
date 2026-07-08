import { useState } from "react";
import { ClientError } from "graphql-request";

import { useCreateWorkspace } from "../../hooks/mutations";
import { useToast } from "../../contexts/ToastContext";
import { Modal } from "../ui/Modal";

import type { Workspace } from "../../types";
import { WorkspaceForm } from "./WorkspaceForm";

interface CreateWorkspaceModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (workspace: Workspace) => void;
}

export function CreateWorkspaceModal({
  open,
  onClose,
  onSuccess,
}: CreateWorkspaceModalProps) {
  const { show } = useToast();
  const createWorkspace = useCreateWorkspace();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
     console.log("Create clicked", { name, description });
        if (!name.trim()) {
            console.log("Returned because name is empty");
            return;
        }

console.log("About to call mutation");
        console.log("About to call mutation");

    try {
    const workspace = await createWorkspace.mutateAsync({
      name,
      description,
    });

    console.log("Mutation succeeded", workspace);

      show({
        type: "success",
        title: "Workspace created",
        message: workspace.title,
      });

      setName("");
      setDescription("");

      onClose();

      onSuccess?.(workspace);
    } catch (error) {
      let title = "Workspace creation failed";
      let message = "Unable to create workspace.";

      if (error instanceof ClientError) {
        const graphQLError = error.response.errors?.[0];

        switch (graphQLError?.extensions?.code) {
          case "DUPLICATE_WORKSPACE":
            title = "Workspace already exists";
            message = graphQLError.message;
            break;

          case "WORKSPACE_NOT_FOUND":
            title = "Workspace not found";
            message = graphQLError.message;
            break;

          default:
            message = graphQLError?.message ?? message;
        }
      }

      show({
        type: "error",
        title,
        message,
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create new workspace"
      description="Organize your research into themed collections."
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn-primary"
            onClick={handleCreate}
            disabled={createWorkspace.isPending || !name.trim()}
          >
            {createWorkspace.isPending
              ? "Creating..."
              : "Create workspace"}
          </button>
        </>
      }
    >
<WorkspaceForm
  name={name}
  description={description}
  onNameChange={setName}
  onDescriptionChange={setDescription}
/>
    </Modal>
  );
}