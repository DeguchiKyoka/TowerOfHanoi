import React from 'react';
import { TowerType, DiskType } from '../types/game';
import { Disk } from './Disk';

interface TowerProps {
  tower: TowerType;
  onDragStart: (e: React.DragEvent, disk: DiskType, towerIndex: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, towerIndex: number) => void;
  isDragOver?: boolean;
  selectedDisk?: DiskType | null;
}

export const Tower: React.FC<TowerProps> = ({
  tower,
  onDragStart,
  onDragOver,
  onDrop,
  isDragOver = false,
  selectedDisk = null,
}) => {
  const towerHeight = 200;
  const towerWidth = 150;

  return (
    <div
      className={`
        tower
        relative
        bg-amber-100
        rounded-lg
        border-2
        ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-amber-300'}
        transition-colors
        duration-200
        flex flex-col items-center justify-end
      `}
      style={{
        width: `${towerWidth}px`,
        height: `${towerHeight}px`,
      }}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, tower.id)}
    >
      {/* 塔の土台 */}
      <div className="tower-base"></div>
      
      {/* 塔のポール */}
      <div className="tower-pole"></div>
      
      {/* 円盤を表示 */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col-reverse items-center justify-center">
        {tower.disks.map((disk, index) => (
          <div
            key={disk.id}
            className="flex justify-center"
            style={{
              marginBottom: '0px',
              marginTop: '0',
              position: 'relative',
              zIndex: 10 - disk.size // 円盤1（size=1）→zIndex=9、円盤2（size=2）→zIndex=8、円盤3（size=3）→zIndex=7
            }}
          >
            <Disk
              disk={disk}
              isSelected={selectedDisk?.id === disk.id}
              onDragStart={(e) => onDragStart(e, disk, tower.id)}
            />
          </div>
        ))}
      </div>
      
      {/* 塔のラベル */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-700">
        塔 {tower.id + 1}
      </div>
    </div>
  );
};