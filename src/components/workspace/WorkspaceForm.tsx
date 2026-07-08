import type { ChangeEvent } from "react";

interface WorkspaceFormProps {
  name: string;
  description: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export function WorkspaceForm({
  name,
  description,
  onNameChange,
  onDescriptionChange,
}: WorkspaceFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Name
        </label>

        <input
          className="input"
          placeholder="e.g. Climate Science Research"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onNameChange(e.target.value)
          }
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
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onDescriptionChange(e.target.value)
          }
        />
      </div>
    </div>
  );
}