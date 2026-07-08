import { useEffect, useState } from "react";
import { ClientError } from "graphql-request";

import { Modal } from "../ui/Modal";
import { WorkspaceForm } from "./WorkspaceForm";

import { useToast } from "../../contexts/ToastContext";
import { useUpdateWorkspace } from "../../hooks/mutations";

import type { Workspace } from "../../types";

interface EditWorkspaceModalProps {
  open: boolean;
  workspace: Workspace;
  onClose: () => void;
}

export function EditWorkspaceModal({
  open,
  workspace,
  onClose,
}: EditWorkspaceModalProps) {
  const { show } = useToast();
  const updateWorkspace = useUpdateWorkspace();

  const [name, setName] = useState(workspace.title);
  const [description, setDescription] = useState(workspace.description);

  const hasChanges =
  name.trim() !== workspace.title ||
  description.trim() !== (workspace.description ?? "");

  useEffect(() => {
    setName(workspace.title);
    setDescription(workspace.description);
  }, [workspace]);

  const handleUpdate = async () => {
    if (!name.trim() || !hasChanges) {
  return;
}

    try {
      await updateWorkspace.mutateAsync({
        id: workspace.id,
        name,
        description,
      });

      show({
        type: "success",
        title: "Workspace updated",
        message: name,
      });

      onClose();
    } catch (error) {
      let title = "Update failed";
      let message = "Unable to update workspace.";

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
      title="Edit workspace"
      description="Update your workspace details."
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn-primary"
            onClick={handleUpdate}
            disabled={
            updateWorkspace.isPending || !name.trim() || !hasChanges
}
          >
            {updateWorkspace.isPending ? "Saving..." : "Save changes"}
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