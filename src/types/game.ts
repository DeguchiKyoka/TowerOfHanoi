export interface DiskType {
  id: number;
  size: number;
}

export interface TowerType {
  id: number;
  disks: DiskType[];
}

export interface GameState {
  towers: TowerType[];
  moveCount: number;
  isComplete: boolean;
  selectedDisk: DiskType | null;
  selectedTower: number | null;
}

export interface DragState {
  isDragging: boolean;
  disk: DiskType | null;
  sourceTower: number | null;
  offsetX: number;
  offsetY: number;
}