"use client";

import { useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { ImageUploadState } from "./types";

interface ImageUploadProps {
  uploadState: ImageUploadState;
  onFileSelect: (file: File) => void;
  onRemoveImage: () => void;
  disabled?: boolean;
}

export function ImageUpload({
  uploadState,
  onFileSelect,
  onRemoveImage,
  disabled = false,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile) {
        onFileSelect(imageFile);
      }
    },
    [onFileSelect, disabled]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-slate-700">参考图片</div>

      {uploadState.previewUrl ? (
        // 已上传图片的预览
        <Card className="border-2 border-sky-200 bg-sky-50/50">
          <CardContent className="p-4">
            <div className="relative">
              <img
                src={uploadState.previewUrl}
                alt="上传的图片"
                className="w-full max-h-64 object-contain rounded-lg"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={onRemoveImage}
                className="absolute top-2 right-2 h-8 w-8 p-0"
                disabled={disabled}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="mt-2 text-sm text-slate-600">
              点击右上角 ✕ 可移除图片
            </div>
          </CardContent>
        </Card>
      ) : (
        // 上传区域
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            disabled
              ? "border-gray-300 bg-gray-50"
              : "border-sky-300 bg-sky-50/50 hover:border-sky-400 hover:bg-sky-100/50"
          }`}
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-sky-100 rounded-full">
                  {uploadState.isUploading ? (
                    <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-8 h-8 text-sky-600" />
                  )}
                </div>
              </div>

              <div>
                <div className="text-lg font-medium text-slate-700 mb-2">
                  {uploadState.isUploading ? "上传中..." : "上传参考图片"}
                </div>
                <div className="text-sm text-slate-500">
                  点击或拖拽图片到此处上传
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  支持 JPG、PNG、WebP 格式，最大 10MB
                </div>
              </div>

              {!disabled && (
                <Button
                  variant="outline"
                  className="border-sky-200 text-sky-700 hover:bg-sky-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                  }}
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  选择图片
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {uploadState.uploadError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-sm text-red-700">{uploadState.uploadError}</div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
