import { useState } from "react";
import { ClientError } from "graphql-request";

import { useCreateWorkspace } from "../../hooks/mutations";
import { useToast } from "../../contexts/ToastContext";
import { Modal } from "../ui/Modal";

import type { Workspace } from "../../types";

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
    if (!name.trim()) return;

    try {
      const workspace = await createWorkspace.mutateAsync({
        name,
        description,
      });

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
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Name
          </label>

          <input
            className="input"
            placeholder="e.g. Climate Science Research"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Description
          </label>

          <textarea
            className="input min-h-24 resize-none"
            placeholder="What is this workspace about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}