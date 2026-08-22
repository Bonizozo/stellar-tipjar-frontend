"use client";

import { useCallback, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloudIcon, X, Image as ImageIcon, FileIcon, Film, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { ProgressBar } from "@/components/Progress/ProgressBar";

export interface FileItem {
  id: string;
  file: File;
  preview?: string;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  error?: string;
}

export interface DragDropZoneProps {
  acceptedTypes?: string[];
  maxSizeMB?: number;
  maxFiles?: number;
  multiple?: boolean;
  onUpload: (files: File[], onProgress?: (id: string, progress: number) => void) => Promise<string[]>;
  onRemove?: (id: string) => void;
  className?: string;
  showPreview?: boolean;
}

export function DragDropZone({
  acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  maxSizeMB = 5,
  maxFiles = 10,
  multiple = true,
  onUpload,
  onRemove,
  className = "",
  showPreview = true,
}: DragDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const createPreview = (file: File): string | undefined => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    if (file.type.startsWith("video/")) {
      return URL.createObjectURL(file);
    }
    return undefined;
  };

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type not supported. Accepted: ${acceptedTypes.map(t => t.split("/")[1]).join(", ")}`;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File must be under ${maxSizeMB}MB`;
    }
    return null;
  };

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const currentCount = files.length;
    const availableSlots = maxFiles - currentCount;
    
    if (availableSlots <= 0) {
      return;
    }

    const filesToAdd = fileArray.slice(0, availableSlots);
    const newFileItems: FileItem[] = [];

    for (const file of filesToAdd) {
      const error = validateFile(file);
      newFileItems.push({
        id: generateId(),
        file,
        preview: createPreview(file),
        progress: 0,
        status: error ? "error" : "pending",
        error: error ?? undefined,
      });
    }

    setFiles((prev) => [...prev, ...newFileItems]);

    const validFiles = newFileItems.filter(f => f.status === "pending");
    if (validFiles.length > 0) {
      uploadFiles(validFiles);
    }
  }, [files.length, maxFiles, acceptedTypes, maxSizeMB]);

  const uploadFiles = async (itemsToUpload: FileItem[]) => {
    const fileMap = new Map(itemsToUpload.map(item => [item.id, item]));

    setFiles((prev) =>
      prev.map((item) =>
        fileMap.has(item.id) ? { ...item, status: "uploading" as const, progress: 10 } : item
      )
    );

    const validFiles = itemsToUpload.map(item => item.file);

    const updateProgress = (id: string, progress: number) => {
      setFiles((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, progress } : item
        )
      );
    };

    try {
      const uploadedUrls = await onUpload(validFiles, updateProgress);
      
      setFiles((prev) =>
        prev.map((item) => {
          if (fileMap.has(item.id)) {
            const idx = itemsToUpload.findIndex(i => i.id === item.id);
            return {
              ...item,
              progress: 100,
              status: "completed" as const,
              preview: uploadedUrls[idx] || item.preview,
            };
          }
          return item;
        })
      );
    } catch {
      setFiles((prev) =>
        prev.map((item) =>
          fileMap.has(item.id)
            ? { ...item, status: "error" as const, error: "Upload failed. Please try again." }
            : item
        )
      );
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      addFiles(selectedFiles);
    }
    e.target.value = "";
  };

  const handleRemove = (id: string) => {
    setFiles((prev) => {
      const item = prev.find(f => f.id === id);
      if (item?.preview) {
        URL.revokeObjectURL(item.preview);
      }
      return prev.filter(f => f.id !== id);
    });
    onRemove?.(id);
  };

  const handleRetry = (id: string) => {
    setFiles((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "pending" as const, error: undefined, progress: 0 } : item
      )
    );
    const item = files.find(f => f.id === id);
    if (item) {
      uploadFiles([item]);
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("video/")) return <Film className="h-5 w-5" />;
    if (type.startsWith("image/")) return <ImageIcon className="h-5 w-5" />;
    return <FileIcon className="h-5 w-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const canAddMore = files.length < maxFiles;

  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Drop files here or click to upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => canAddMore && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && canAddMore && inputRef.current?.click()}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200 ${
          isDragging
            ? "border-wave bg-wave/10 scale-[1.02]"
            : "border-ink/20 hover:border-wave/50 hover:bg-ink/[0.02]"
        } ${!canAddMore ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptedTypes.join(",")}
          multiple={multiple && canAddMore}
          onChange={handleFileSelect}
          className="hidden"
          aria-hidden="true"
        />
        
        <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-wave/10 ${isDragging ? "animate-bounce" : ""}`}>
          <UploadCloudIcon className="h-7 w-7 text-wave" />
        </div>
        
        <p className="mt-4 text-sm font-medium text-ink">
          {isDragging ? "Drop files here" : "Drag & drop files here"}
        </p>
        <p className="mt-1 text-xs text-ink/50">
          or click to browse • max {maxFiles} files, {maxSizeMB}MB each
        </p>
        <p className="mt-2 text-xs text-ink/40">
          Accepted: {acceptedTypes.map(t => t.split("/")[1].toUpperCase()).join(", ")}
        </p>
      </div>

      <AnimatePresence mode="popLayout">
        {files.length > 0 && (
          <div className="mt-4 space-y-3">
            {files.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                className="relative flex items-start gap-3 rounded-xl border border-ink/10 bg-canvas/40 p-3 dark:border-canvas/10 dark:bg-ink/40"
              >
                {showPreview && item.preview && (
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-ink/10">
                    {item.file.type.startsWith("video/") ? (
                      <video src={item.preview} className="h-full w-full object-cover" muted />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.preview} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                )}

                {!showPreview && (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-wave/10 text-wave">
                    {getFileIcon(item.file.type)}
                  </div>
                )}

                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-ink dark:text-canvas">
                      {item.file.name}
                    </p>
                    <div className="flex items-center gap-1">
                      {item.status === "completed" && (
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      )}
                      {item.status === "error" && (
                        <button
                          onClick={() => handleRetry(item.id)}
                          className="rounded-full p-1 text-rose-500 hover:bg-rose-500/10"
                          aria-label="Retry upload"
                        >
                          <AlertCircle className="h-5 w-5" />
                        </button>
                      )}
                      {item.status === "uploading" && (
                        <Loader2 className="h-5 w-5 animate-spin text-wave" />
                      )}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="rounded-full p-1 text-ink/40 hover:bg-ink/5 hover:text-ink dark:text-canvas/40 dark:hover:bg-canvas/5 dark:hover:text-canvas"
                        aria-label="Remove file"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-xs text-ink/50 dark:text-canvas/50">
                    <span>{formatFileSize(item.file.size)}</span>
                    {item.error && <span className="text-rose-500">{item.error}</span>}
                  </div>

                  {(item.status === "uploading" || item.status === "completed") && (
                    <div className="mt-2">
                      <ProgressBar
                        progress={item.progress}
                        size="sm"
                        color={item.status === "completed" ? "success" : "wave"}
                        showPercentage={item.status === "uploading"}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}