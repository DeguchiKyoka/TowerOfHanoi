import React from 'react';
import { DiskType } from '../types/game';

interface DiskProps {
  disk: DiskType;
  isDragging?: boolean;
  isSelected?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}

const DISK_COLORS = [
  'from-red-500 to-red-600',
  'from-blue-500 to-blue-600',
  'from-green-500 to-green-600',
  'from-yellow-500 to-yellow-600',
  'from-purple-500 to-purple-600',
];

export const Disk: React.FC<DiskProps> = ({ disk, isDragging = false, isSelected = false, onDragStart }) => {
  const baseWidth = 60;
  const widthIncrement = 20;
  const width = baseWidth + (disk.size - 1) * widthIncrement;
  const height = 20;
  const colorClass = DISK_COLORS[(disk.size - 1) % DISK_COLORS.length];

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`
        disk
        ${isDragging ? 'dragging' : ''}
        ${isSelected ? 'ring-4 ring-blue-400 ring-opacity-75' : ''}
        bg-gradient-to-r ${colorClass}
        rounded-md
        cursor-grab
        transition-all
        duration-300
        hover:shadow-lg
        hover:cursor-grabbing
        flex items-center justify-center
        text-white font-bold text-sm
        select-none
        ${isDragging ? 'ring-4 ring-yellow-400 ring-opacity-90 z-50' : ''}
        ${isDragging ? 'transform scale-110' : ''}
        ${isDragging ? 'cursor-grabbing' : ''}
        ${isDragging ? 'shadow-2xl' : ''}
        ${isDragging ? 'brightness-110' : ''}
        ${isDragging ? 'animate-pulse' : ''}
        ${isDragging ? 'border-2 border-yellow-300' : ''}
        ${isDragging ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : ''}
        relative
        ${isDragging ? 'z-[100]' : ''}
        ${isSelected ? 'z-[60]' : ''}
      `}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <span className={`${isDragging ? 'text-gray-900 font-black' : 'text-white font-bold'}`}>
          {disk.size}
        </span>
      </div>
      
      {isDragging && (
        <div className="absolute -inset-1 bg-yellow-400 rounded-md opacity-30 animate-ping"></div>
      )}
    </div>
  );
};