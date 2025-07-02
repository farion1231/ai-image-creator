"use client";

import { useMemo, forwardRef } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import type { GeneratedImage } from "@/types";
import { ImageCard } from "./ImageCard";

interface VirtualizedImageListProps {
  images: GeneratedImage[];
  onToggleFavorite: (imageId: string) => void;
  onDownload: (image: GeneratedImage) => void;
  onDelete: (imageId: string) => void;
  height: number;
  width?: number;
}

interface ItemData {
  images: GeneratedImage[];
  onToggleFavorite: (imageId: string) => void;
  onDownload: (image: GeneratedImage) => void;
  onDelete: (imageId: string) => void;
}

// 虚拟化列表项组件
const VirtualizedImageItem = ({ index, style, data }: ListChildComponentProps<ItemData>) => {
  const { images, onToggleFavorite, onDownload, onDelete } = data;
  const image = images[index];

  if (!image) {
    return (
      <div style={style} className="p-2">
        <div className="h-full bg-slate-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div style={style} className="p-2">
      <ImageCard
        image={image}
        onToggleFavorite={onToggleFavorite}
        onDownload={onDownload}
        onDelete={onDelete}
      />
    </div>
  );
};

export const VirtualizedImageList = forwardRef<HTMLDivElement, VirtualizedImageListProps>(
  ({ images, onToggleFavorite, onDownload, onDelete, height, width = "100%" }, ref) => {
    // 预估每个图片卡片的高度
    const ITEM_HEIGHT = 200; // 根据ImageCard的实际高度调整

    // 创建传递给虚拟化组件的数据
    const itemData: ItemData = useMemo(
      () => ({
        images,
        onToggleFavorite,
        onDownload,
        onDelete,
      }),
      [images, onToggleFavorite, onDownload, onDelete]
    );

    if (images.length === 0) {
      return (
        <div ref={ref} className="text-center py-8 text-slate-500">
          暂无图片
        </div>
      );
    }

    return (
      <div ref={ref} style={{ width, height }}>
        <List
          height={height}
          itemCount={images.length}
          itemSize={ITEM_HEIGHT}
          itemData={itemData}
          width={width}
          className="scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
        >
          {VirtualizedImageItem}
        </List>
      </div>
    );
  }
);

VirtualizedImageList.displayName = "VirtualizedImageList";