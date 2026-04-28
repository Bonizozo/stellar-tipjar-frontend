"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { CollaborationService, type CollaborationWorkspace, type CollaborationTask } from "@/services/collaborationService";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import {
  PlusIcon,
  TrashIcon,
  FolderOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface CreatorCollaborationProps {
  className?: string;
}

const STATUS_COLORS: Record<string, "default" | "success" | "warning" | "info"> = {
  todo: "default",
  in_progress: "info",
  review: "warning",
  done: "success",
};

const PRIORITY_COLORS: Record<string, string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-100 text-blue-600",
  high: "bg-orange-100 text-orange-600",
  urgent: "bg-red-100 text-red-600",
};

export function CreatorCollaboration({ className = "" }: CreatorCollaborationProps) {
  const queryClient = useQueryClient();
  const [expandedWorkspace, setExpandedWorkspace] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newWorkspaceDesc, setNewWorkspaceDesc] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<CollaborationTask["priority"]>("medium");
  const [activeTab, setActiveTab] = useState<"tasks" | "files" | "chat">("tasks");
  const [chatMessage, setChatMessage] = useState("");

  // Fetch workspaces
  const { data: workspaces, isLoading } = useQuery({
    queryKey: ["collaboration-workspaces"],
    queryFn: () => CollaborationService.getUserWorkspaces(),
    staleTime: 30_000,
  });

  // Create workspace mutation
  const createWorkspaceMutation = useMutation({
    mutationFn: (data: { name: string; description: string }) =>
      CollaborationService.createWorkspace(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collaboration-workspaces"] });
      setIsCreating(false);
      setNewWorkspaceName("");
      setNewWorkspaceDesc("");
    },
  });

  // Delete workspace mutation
  const deleteWorkspaceMutation = useMutation({
    mutationFn: (id: string) => CollaborationService.deleteWorkspace(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["collaboration-workspaces"] }),
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: ({
      workspaceId,
      task,
    }: {
      workspaceId: string;
      task: Omit<CollaborationTask, "id" | "workspaceId" | "createdAt" | "updatedAt">;
    }) => CollaborationService.createTask(workspaceId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collaboration-workspaces"] });
      setNewTaskTitle("");
      setNewTaskAssignee("");
      setNewTaskPriority("medium");
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({
      workspaceId,
      taskId,
      updates,
    }: {
      workspaceId: string;
      taskId: string;
      updates: Partial<Pick<CollaborationTask, "status">>;
    }) => CollaborationService.updateTask(workspaceId, taskId, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["collaboration-workspaces"] }),
  });

  // Send chat message mutation
  const sendMessageMutation = useMutation({
    mutationFn: ({ workspaceId, content }: { workspaceId: string; content: string }) =>
      CollaborationService.sendMessage(workspaceId, content),
    onSuccess: () => {
      setChatMessage("");
      queryClient.invalidateQueries({ queryKey: ["collaboration-messages"] });
    },
  });

  const toggleExpand = (id: string) => {
    setExpandedWorkspace(expandedWorkspace === id ? null : id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "done":
        return <CheckCircleIcon className="h-4 w-4 text-moss" />;
      case "in_progress":
        return <ClockIcon className="h-4 w-4 text-wave" />;
      case "review":
        return <ExclamationTriangleIcon className="h-4 w-4 text-warning" />;
      default:
        return <ClockIcon className="h-4 w-4 text-ink/40" />;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Creator Collaboration</h2>
          <p className="mt-0.5 text-sm text-ink/50">
            Work together on content and split tips
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center gap-1.5"
        >
          <PlusIcon className="h-4 w-4" aria-hidden="true" />
          New Workspace
        </Button>
      </div>

      {/* Create workspace form */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4"
          >
            <div className="space-y-3">
              <input
                type="text"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                placeholder="Workspace name"
                className="w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 dark:bg-gray-900"
                aria-label="Workspace name"
              />
              <textarea
                value={newWorkspaceDesc}
                onChange={(e) => setNewWorkspaceDesc(e.target.value)}
                placeholder="Description (optional)"
                rows={2}
                className="w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 dark:bg-gray-900"
                aria-label="Workspace description"
              />
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    createWorkspaceMutation.mutate({
                      name: newWorkspaceName,
                      description: newWorkspaceDesc,
                    })
                  }
                  disabled={!newWorkspaceName.trim() || createWorkspaceMutation.isPending}
                >
                  {createWorkspaceMutation.isPending ? "Creating..." : "Create"}
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Workspace list */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl border border-ink/10 bg-ink/5" />
          ))}
        </div>
      )}

      {!isLoading && (!workspaces || workspaces.length === 0) && (
        <div className="rounded-2xl border border-dashed border-ink/20 p-8 text-center">
          <FolderOpenIcon className="mx-auto h-10 w-10 text-ink/30" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-ink/60">No workspaces yet</p>
          <p className="mt-1 text-xs text-ink/40">
            Create a collaboration workspace to start working with other creators.
          </p>
        </div>
      )}

      {workspaces?.map((workspace) => (
        <motion.div
          key={workspace.id}
          layout
          className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] overflow-hidden"
        >
          {/* Workspace header */}
          <button
            type="button"
            onClick={() => toggleExpand(workspace.id)}
            className="flex w-full items-center justify-between p-4 text-left hover:bg-ink/5 transition-colors"
            aria-expanded={expandedWorkspace === workspace.id}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-wave/10">
                <UserGroupIcon className="h-5 w-5 text-wave" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-ink truncate">{workspace.name}</p>
                <p className="text-xs text-ink/50">
                  {workspace.memberCount} member{workspace.memberCount !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {expandedWorkspace === workspace.id ? (
                <ChevronUpIcon className="h-4 w-4 text-ink/40" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-ink/40" />
              )}
            </div>
          </button>

          {/* Expanded content */}
          <AnimatePresence>
            {expandedWorkspace === workspace.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-ink/10"
              >
                <div className="p-4 space-y-4">
                  {/* Description */}
                  {workspace.description && (
                    <p className="text-sm text-ink/60">{workspace.description}</p>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => deleteWorkspaceMutation.mutate(workspace.id)}
                      disabled={deleteWorkspaceMutation.isPending}
                      className="inline-flex items-center gap-1.5 text-semantic-error hover:bg-semantic-error/10"
                    >
                      <TrashIcon className="h-4 w-4" aria-hidden="true" />
                      Delete
                    </Button>
                  </div>

                  {/* Tabs: Tasks | Files | Chat */}
                  <div className="flex gap-1 border-b border-ink/10 pb-1" role="tablist">
                    {(["tasks", "files", "chat"] as const).map((tab) => (
                      <button
                        key={tab}
                        role="tab"
                        aria-selected={activeTab === tab}
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-t-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                          activeTab === tab
                            ? "bg-wave/10 text-wave border-b-2 border-wave"
                            : "text-ink/50 hover:text-ink/80"
                        }`}
                      >
                        {tab === "tasks" && <DocumentTextIcon className="inline h-3.5 w-3.5 mr-1" />}
                        {tab === "files" && <FolderOpenIcon className="inline h-3.5 w-3.5 mr-1" />}
                        {tab === "chat" && <ChatBubbleLeftRightIcon className="inline h-3.5 w-3.5 mr-1" />}
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tasks tab */}
                  {activeTab === "tasks" && (
                    <div className="space-y-3">
                      {/* Add task form */}
                      <div className="flex flex-wrap gap-2">
                        <input
                          type="text"
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          placeholder="Task title..."
                          className="flex-1 min-w-[200px] rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 dark:bg-gray-900"
                          aria-label="Task title"
                        />
                        <input
                          type="text"
                          value={newTaskAssignee}
                          onChange={(e) => setNewTaskAssignee(e.target.value)}
                          placeholder="Assign to..."
                          className="w-32 rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 dark:bg-gray-900"
                          aria-label="Assignee"
                        />
                        <select
                          value={newTaskPriority}
                          onChange={(e) => setNewTaskPriority(e.target.value as CollaborationTask["priority"])}
                          className="rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-sm text-ink focus:border-wave focus:outline-none dark:bg-gray-900"
                          aria-label="Priority"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            createTaskMutation.mutate({
                              workspaceId: workspace.id,
                              task: {
                                title: newTaskTitle,
                                description: "",
                                assignedTo: newTaskAssignee,
                                status: "todo",
                                priority: newTaskPriority,
                              },
                            })
                          }
                          disabled={!newTaskTitle.trim() || createTaskMutation.isPending}
                        >
                          Add Task
                        </Button>
                      </div>

                      {/* Task list */}
                      {workspace.tasks && workspace.tasks.length > 0 ? (
                        <div className="space-y-2">
                          {workspace.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-center gap-3 rounded-lg border border-ink/10 p-3"
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  updateTaskMutation.mutate({
                                    workspaceId: workspace.id,
                                    taskId: task.id,
                                    updates: {
                                      status: task.status === "done" ? "todo" : "done",
                                    },
                                  })
                                }
                                className="shrink-0"
                                aria-label={`Mark task as ${task.status === "done" ? "not done" : "done"}`}
                              >
                                {getStatusIcon(task.status)}
                              </button>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-medium truncate ${
                                    task.status === "done" ? "line-through text-ink/40" : "text-ink"
                                  }`}
                                >
                                  {task.title}
                                </p>
                                {task.assignedTo && (
                                  <p className="text-xs text-ink/50">Assigned to {task.assignedTo}</p>
                                )}
                              </div>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${PRIORITY_COLORS[task.priority]}`}
                              >
                                {task.priority}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-ink/50 italic">No tasks yet. Add your first task above.</p>
                      )}
                    </div>
                  )}

                  {/* Files tab */}
                  {activeTab === "files" && (
                    <div className="space-y-3">
                      <div className="rounded-lg border border-dashed border-ink/20 p-6 text-center">
                        <DocumentTextIcon className="mx-auto h-8 w-8 text-ink/30" aria-hidden="true" />
                        <p className="mt-2 text-sm text-ink/50">
                          Drag and drop files here, or click to upload
                        </p>
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          aria-label="Upload files"
                        />
                        <Button variant="secondary" size="sm" className="mt-3">
                          Upload Files
                        </Button>
                      </div>
                      {workspace.files && workspace.files.length > 0 && (
                        <div className="space-y-2">
                          {workspace.files.map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center gap-3 rounded-lg border border-ink/10 p-3"
                            >
                              <DocumentTextIcon className="h-5 w-5 text-ink/40" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-ink truncate">{file.fileName}</p>
                                <p className="text-xs text-ink/50">
                                  {(file.fileSize / 1024).toFixed(1)} KB &middot; by {file.uploadedBy}
                                </p>
                              </div>
                              <Badge variant="default" className="text-xs">
                                {file.fileType}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Chat tab */}
                  {activeTab === "chat" && (
                    <div className="space-y-3">
                      <div className="h-48 rounded-lg border border-ink/10 bg-ink/5 p-3 overflow-y-auto">
                        <p className="text-center text-sm text-ink/40 mt-16">
                          Chat messages will appear here
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 dark:bg-gray-900"
                          aria-label="Chat message"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && chatMessage.trim()) {
                              sendMessageMutation.mutate({
                                workspaceId: workspace.id,
                                content: chatMessage,
                              });
                            }
                          }}
                        />
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            sendMessageMutation.mutate({
                              workspaceId: workspace.id,
                              content: chatMessage,
                            })
                          }
                          disabled={!chatMessage.trim() || sendMessageMutation.isPending}
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
