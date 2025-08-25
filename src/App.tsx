import React from 'react';
import { useTowerOfHanoi } from './hooks/useTowerOfHanoi';
import { Tower } from './components/Tower';
import { GameControls } from './components/GameControls';

const App: React.FC = () => {
  const {
    gameState,
    dragState,
    selectedDisk,
    resetGame,
    handleDragStart,
    handleDragOver,
    handleDrop,
  } = useTowerOfHanoi();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          ハノイの塔
        </h1>
        
        <div className="flex flex-col items-center gap-8">
          <GameControls
            moveCount={gameState.moveCount}
            isComplete={gameState.isComplete}
            resetGame={resetGame}
          />
          
          <div className="flex flex-col sm:flex-row justify-center items-end gap-4 sm:gap-8 p-4 sm:p-8 bg-white rounded-lg shadow-lg">
            {gameState.towers.map((tower, index) => (
              <Tower
                key={tower.id}
                tower={tower}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDragOver={dragState.isDragging && dragState.sourceTower !== index}
                selectedDisk={selectedDisk?.towerIndex === index && selectedDisk.disk?.id === tower.disks[tower.disks.length - 1]?.id ? selectedDisk.disk : null}
              />
            ))}
          </div>
          
          <div className="text-center text-gray-600 max-w-2xl px-4">
            <h3 className="font-semibold mb-2 text-lg sm:text-xl">遊び方</h3>
            <p className="text-sm sm:text-base leading-relaxed">
              円盤をドラッグして別の塔に移動させます。一度に1枚の円盤しか動かせず、
              大きい円盤の上に小さい円盤を置くことはできません。
              目標はすべての円盤を右端の塔に移動させることです。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;