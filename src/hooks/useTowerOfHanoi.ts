import { useState, useCallback, useEffect } from 'react';
import { GameState, TowerType, DiskType, DragState } from '../types/game';

const INITIAL_DISK_COUNT = 3;

export function useTowerOfHanoi() {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame());
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    disk: null,
    sourceTower: null,
    offsetX: 0,
    offsetY: 0,
  });
  const [selectedDisk, setSelectedDisk] = useState<{disk: DiskType, towerIndex: number} | null>(null);

  function initializeGame(): GameState {
    const disks: DiskType[] = Array.from({ length: INITIAL_DISK_COUNT }, (_, i) => ({
      id: i + 1,
      size: INITIAL_DISK_COUNT - i,
    }));

    return {
      towers: [
        { id: 0, disks },
        { id: 1, disks: [] },
        { id: 2, disks: [] },
      ],
      moveCount: 0,
      isComplete: false,
      selectedDisk: null,
      selectedTower: null,
    };
  }

  const resetGame = useCallback(() => {
    setGameState(initializeGame());
    setDragState({
      isDragging: false,
      disk: null,
      sourceTower: null,
      offsetX: 0,
      offsetY: 0,
    });
  }, []);

  const canMoveDisk = useCallback((disk: DiskType, targetTower: TowerType): boolean => {
    if (targetTower.disks.length === 0) return true;
    const topDisk = targetTower.disks[targetTower.disks.length - 1];
    return disk.size < topDisk.size;
  }, []);

  const checkWin = useCallback((towers: TowerType[]): boolean => {
    return towers[2].disks.length === INITIAL_DISK_COUNT;
  }, []);

  const moveDisk = useCallback((sourceTowerIndex: number, targetTowerIndex: number) => {
    setGameState(prev => {
      const newTowers = [...prev.towers];
      const sourceTower = { ...newTowers[sourceTowerIndex] };
      const targetTower = { ...newTowers[targetTowerIndex] };

      if (sourceTower.disks.length === 0) return prev;

      const diskToMove = sourceTower.disks[sourceTower.disks.length - 1];
      
      if (!canMoveDisk(diskToMove, targetTower)) return prev;

      // 円盤を移動
      sourceTower.disks = sourceTower.disks.slice(0, -1);
      targetTower.disks = [...targetTower.disks, diskToMove];

      const updatedTowers = newTowers.map((tower, index) => {
        if (index === sourceTowerIndex) return sourceTower;
        if (index === targetTowerIndex) return targetTower;
        return tower;
      });

      const isComplete = checkWin(updatedTowers);
      const moveCount = prev.moveCount + 1;

      return {
        ...prev,
        towers: updatedTowers,
        moveCount,
        isComplete,
      };
    });
  }, [canMoveDisk, checkWin]);

  const handleDragStart = useCallback((e: React.DragEvent, disk: DiskType, towerIndex: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragState({
      isDragging: true,
      disk,
      sourceTower: towerIndex,
      offsetX,
      offsetY,
    });

    // 選択状態を設定
    setSelectedDisk({ disk, towerIndex });

    // ドラッグ中のスタイルを適用
    e.dataTransfer.effectAllowed = 'move';
    
    // ドラッグ中に表示されるカスタム画像を作成
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 140;
      canvas.height = 60;
      
      // 背景を描画（より目立つ色）
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#fbbf24');
      gradient.addColorStop(0.5, '#fde047');
      gradient.addColorStop(1, '#f59e0b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 枠線を描画
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      
      // 内側の装飾
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
      
      // 円盤のサイズを表示
      ctx.fillStyle = '#92400e';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`🎯 ドラッグ中: 円盤 ${disk.size}`, canvas.width / 2, canvas.height / 2);
      
      // 追強調のための星印
      ctx.font = 'bold 16px Arial';
      ctx.fillText('⭐', 20, 20);
      ctx.fillText('⭐', canvas.width - 20, 20);
      ctx.fillText('⭐', 20, canvas.height - 20);
      ctx.fillText('⭐', canvas.width - 20, canvas.height - 20);
      
      // この画像をドラッグ画像として設定
      e.dataTransfer.setDragImage(canvas, 70, 30);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetTowerIndex: number) => {
    e.preventDefault();
    
    if (!dragState.isDragging || dragState.sourceTower === null) return;

    if (dragState.sourceTower !== targetTowerIndex) {
      moveDisk(dragState.sourceTower, targetTowerIndex);
    }

    // ドラッグ終了時に選択状態を解除
    setSelectedDisk(null);

    setDragState({
      isDragging: false,
      disk: null,
      sourceTower: null,
      offsetX: 0,
      offsetY: 0,
    });
  }, [dragState, moveDisk]);

  // ゲーム完了時のアニメーション効果
  useEffect(() => {
    if (gameState.isComplete) {
      // 完成メッセージを表示
      const celebrationMessage = document.createElement('div');
      celebrationMessage.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg z-50 animate-celebrate';
      celebrationMessage.innerHTML = '🎉 おめでとうございます！クリアしました！';
      document.body.appendChild(celebrationMessage);

      // 3秒後にメッセージを削除
      setTimeout(() => {
        document.body.removeChild(celebrationMessage);
      }, 3000);

      // 円盤にアニメーションを追加
      const disks = document.querySelectorAll('.disk');
      disks.forEach((disk, index) => {
        setTimeout(() => {
          disk.classList.add('animate-disk-bounce');
        }, index * 100);
      });
    }
  }, [gameState.isComplete]);

  return {
    gameState,
    dragState,
    selectedDisk,
    resetGame,
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
}