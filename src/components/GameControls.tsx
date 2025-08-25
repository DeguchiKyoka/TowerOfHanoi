import React from 'react';

interface GameControlsProps {
  moveCount: number;
  isComplete: boolean;
  resetGame: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  moveCount,
  isComplete,
  resetGame,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-sm text-gray-600">手数</div>
          <div className="text-2xl font-bold text-blue-600">{moveCount}</div>
        </div>
        
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold"
        >
          リセット
        </button>
      </div>
      
      {isComplete && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
          <div className="text-green-800 font-bold text-center">
            🎉 おめでとうございます！クリアしました！
          </div>
          <div className="text-green-700 text-center text-sm mt-1">
            最適解: {Math.pow(2, 3) - 1} 手 / あなた: {moveCount} 手
          </div>
        </div>
      )}
    </div>
  );
};