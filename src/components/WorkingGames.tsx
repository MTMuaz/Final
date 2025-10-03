import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Gamepad2, 
  Trophy, 
  Target, 
  Zap, 
  Users,
  Clock,
  Star,
  Medal,
  Play,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Pause,
  Crosshair
} from 'lucide-react';
import * as THREE from 'three';

// Snake Game Component
const SnakeGame: React.FC<{ onScore: (score: number) => void }> = ({ onScore }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 1 });
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const BOARD_SIZE = 20;

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE)
    };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 0, y: 1 });
    setScore(0);
    setGameOver(false);
    setGameRunning(false);
  };

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true);
        setGameRunning(false);
        onScore(score);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        onScore(score);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setFood(generateFood());
        setScore(prev => {
          return prev + 10;
        });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameRunning, gameOver, generateFood, onScore, score]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameRunning]);

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="text-2xl font-bold text-white mb-2">Space Snake</div>
        <div className="text-cyan-400">Score: {score}</div>
      </div>
      
      <div 
        className="inline-block bg-slate-900 border-2 border-cyan-500/30 rounded-lg p-2"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
          gap: '2px',
          width: '400px',
          height: '400px'
        }}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
          const x = index % BOARD_SIZE;
          const y = Math.floor(index / BOARD_SIZE);
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;
          const isHead = snake[0]?.x === x && snake[0]?.y === y;
          
          return (
            <div
              key={index}
              className={`w-full h-full rounded-sm transition-colors duration-150 ${
                isHead ? 'bg-cyan-400' :
                isSnake ? 'bg-cyan-600' :
                isFood ? 'bg-red-500 animate-pulse' :
                'bg-slate-800'
              }`}
            />
          );
        })}
      </div>
      
      <div className="mt-4 space-y-2">
        {!gameRunning && !gameOver && (
          <button
            onClick={() => setGameRunning(true)}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg transition-all"
          >
            Start Game
          </button>
        )}
        
        {gameRunning && (
          <button
            onClick={() => setGameRunning(false)}
            className="px-6 py-2 bg-orange-500/20 rounded-lg text-orange-400 hover:bg-orange-500/30 transition-colors"
          >
            Pause
          </button>
        )}
        
        {gameOver && (
          <div className="space-y-2">
            <div className="text-red-400 font-semibold">Game Over!</div>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white font-medium hover:shadow-lg transition-all"
            >
              Play Again
            </button>
          </div>
        )}
        
        <div className="text-sm text-slate-400 mt-2">
          Use arrow keys to control the space snake
        </div>
      </div>
    </div>
  );
};

// 3D Space Shooter Game Component
const SpaceShooter3D: React.FC<{ onScore: (score: number) => void }> = ({ onScore }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const playerRef = useRef<THREE.Mesh>();
  const bulletsRef = useRef<THREE.Mesh[]>([]);
  const enemiesRef = useRef<THREE.Mesh[]>([]);
  const animationIdRef = useRef<number>();
  
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);
  
  const keysRef = useRef({
    left: false,
    right: false,
    up: false,
    down: false,
    space: false
  });

  // Initialize 3D scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    camera.position.z = 10;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Player spaceship
    const playerGeometry = new THREE.ConeGeometry(0.3, 1, 8);
    const playerMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00ffff,
      emissive: 0x002244,
      shininess: 100
    });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(0, -4, 0);
    player.rotation.x = Math.PI;
    player.castShadow = true;
    scene.add(player);
    playerRef.current = player;

    // Stars background
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const positions = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.1,
      transparent: true,
      opacity: 0.8
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameRunning || gameOver) return;

    const gameLoop = () => {
      if (!sceneRef.current || !rendererRef.current || !cameraRef.current || !playerRef.current) return;

      // Move player
      if (keysRef.current.left && playerRef.current.position.x > -8) {
        playerRef.current.position.x -= 0.2;
      }
      if (keysRef.current.right && playerRef.current.position.x < 8) {
        playerRef.current.position.x += 0.2;
      }
      if (keysRef.current.up && playerRef.current.position.y < 4) {
        playerRef.current.position.y += 0.2;
      }
      if (keysRef.current.down && playerRef.current.position.y > -4) {
        playerRef.current.position.y -= 0.2;
      }

      // Shoot bullets
      if (keysRef.current.space && Math.random() < 0.3) {
        const bulletGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const bulletMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xffff00,
          emissive: 0x444400
        });
        const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
        bullet.position.copy(playerRef.current.position);
        bullet.position.y += 0.5;
        sceneRef.current.add(bullet);
        bulletsRef.current.push(bullet);
      }

      // Move bullets
      bulletsRef.current = bulletsRef.current.filter(bullet => {
        bullet.position.y += 0.5;
        if (bullet.position.y > 10) {
          sceneRef.current?.remove(bullet);
          return false;
        }
        return true;
      });

      // Spawn enemies
      if (Math.random() < 0.02) {
        const enemyGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const enemyMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xff0000,
          emissive: 0x440000
        });
        const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
        enemy.position.set(
          (Math.random() - 0.5) * 16,
          8,
          0
        );
        enemy.rotation.x = Math.random() * Math.PI;
        enemy.rotation.y = Math.random() * Math.PI;
        sceneRef.current.add(enemy);
        enemiesRef.current.push(enemy);
      }

      // Move enemies
      enemiesRef.current = enemiesRef.current.filter(enemy => {
        enemy.position.y -= 0.15;
        enemy.rotation.x += 0.05;
        enemy.rotation.y += 0.05;
        
        if (enemy.position.y < -10) {
          sceneRef.current?.remove(enemy);
          return false;
        }
        return true;
      });

      // Check bullet-enemy collisions
      bulletsRef.current = bulletsRef.current.filter(bullet => {
        let bulletHit = false;
        enemiesRef.current = enemiesRef.current.filter(enemy => {
          const distance = bullet.position.distanceTo(enemy.position);
          if (distance < 0.5) {
            sceneRef.current?.remove(bullet);
            sceneRef.current?.remove(enemy);
            setScore(prev => prev + 10);
            bulletHit = true;
            return false;
          }
          return true;
        });
        return !bulletHit;
      });

      // Check player-enemy collisions
      enemiesRef.current = enemiesRef.current.filter(enemy => {
        const distance = playerRef.current!.position.distanceTo(enemy.position);
        if (distance < 0.8) {
          sceneRef.current?.remove(enemy);
          setLives(prev => {
            const newLives = prev - 1;
            if (newLives <= 0) {
              setGameOver(true);
              setGameRunning(false);
              onScore(score);
            }
            return newLives;
          });
          return false;
        }
        return true;
      });

      // Render
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      if (gameRunning && !gameOver) {
        animationIdRef.current = requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [gameRunning, gameOver, score, onScore]);

  // Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameRunning) return;
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          keysRef.current.left = true;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          keysRef.current.right = true;
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          keysRef.current.up = true;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          keysRef.current.down = true;
          break;
        case ' ':
          e.preventDefault();
          keysRef.current.space = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          keysRef.current.left = false;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          keysRef.current.right = false;
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          keysRef.current.up = false;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          keysRef.current.down = false;
          break;
        case ' ':
          keysRef.current.space = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameRunning]);

  const resetGame = () => {
    // Clear all game objects
    bulletsRef.current.forEach(bullet => sceneRef.current?.remove(bullet));
    enemiesRef.current.forEach(enemy => sceneRef.current?.remove(enemy));
    bulletsRef.current = [];
    enemiesRef.current = [];
    
    // Reset player position
    if (playerRef.current) {
      playerRef.current.position.set(0, -4, 0);
    }
    
    // Reset game state
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameRunning(false);
    
    // Reset keys
    keysRef.current = {
      left: false,
      right: false,
      up: false,
      down: false,
      space: false
    };
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="text-2xl font-bold text-white mb-2">3D Space Shooter</div>
        <div className="flex justify-center space-x-4 text-sm">
          <div className="text-cyan-400">Score: {score}</div>
          <div className="text-red-400">Lives: {lives}</div>
        </div>
      </div>
      
      <div 
        ref={mountRef}
        className="inline-block border-2 border-cyan-500/30 rounded-lg overflow-hidden bg-black"
        style={{ width: '600px', height: '400px' }}
      />
      
      <div className="mt-4 space-y-2">
        {!gameRunning && !gameOver && (
          <button
            onClick={() => setGameRunning(true)}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg transition-all"
          >
            Start Game
          </button>
        )}
        
        {gameRunning && (
          <button
            onClick={() => setGameRunning(false)}
            className="px-6 py-2 bg-orange-500/20 rounded-lg text-orange-400 hover:bg-orange-500/30 transition-colors"
          >
            Pause
          </button>
        )}
        
        {gameOver && (
          <div className="space-y-2">
            <div className="text-red-400 font-semibold">Game Over!</div>
            <div className="text-cyan-400">Final Score: {score}</div>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white font-medium hover:shadow-lg transition-all"
            >
              Play Again
            </button>
          </div>
        )}
        
        <div className="text-sm text-slate-400 mt-2">
          WASD or Arrow keys to move, Spacebar to shoot
        </div>
      </div>
    </div>
  );
};

// Docking Simulator Component
const DockingSimulator: React.FC<{ onScore: (score: number) => void }> = ({ onScore }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [target, setTarget] = useState({ x: 200, y: 200 });
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [docked, setDocked] = useState(false);

  const moveSpacecraft = (dx: number, dy: number) => {
    if (!gameActive || docked) return;
    
    setPosition(prev => ({
      x: Math.max(0, Math.min(350, prev.x + dx * 5)),
      y: Math.max(0, Math.min(350, prev.y + dy * 5))
    }));
  };

  const checkDocking = () => {
    const distance = Math.sqrt(
      Math.pow(position.x - target.x, 2) + Math.pow(position.y - target.y, 2)
    );
    
    if (distance < 20) {
      setDocked(true);
      setGameActive(false);
      const finalScore = Math.max(100, 1000 - attempts * 10);
      setScore(finalScore);
      onScore(finalScore);
    }
  };

  useEffect(() => {
    checkDocking();
  }, [position]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameActive) return;
      
      setAttempts(prev => prev + 1);
      
      switch (e.key) {
        case 'ArrowUp':
          moveSpacecraft(0, -1);
          break;
        case 'ArrowDown':
          moveSpacecraft(0, 1);
          break;
        case 'ArrowLeft':
          moveSpacecraft(-1, 0);
          break;
        case 'ArrowRight':
          moveSpacecraft(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameActive]);

  const resetGame = () => {
    setPosition({ x: 50, y: 50 });
    setTarget({ 
      x: 150 + Math.random() * 100, 
      y: 150 + Math.random() * 100 
    });
    setScore(0);
    setAttempts(0);
    setDocked(false);
    setGameActive(false);
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="text-2xl font-bold text-white mb-2">ISS Docking Simulator</div>
        <div className="text-cyan-400">Score: {score} | Attempts: {attempts}</div>
      </div>
      
      <div 
        className="relative inline-block bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500/30 rounded-lg"
        style={{ width: '400px', height: '400px' }}
      >
        {/* Spacecraft */}
        <div
          className="absolute w-6 h-6 bg-cyan-400 rounded-full border-2 border-white transition-all duration-100"
          style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* ISS Target */}
        <div
          className="absolute w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded border-2 border-yellow-400 transition-all duration-100"
          style={{ 
            left: `${target.x}px`, 
            top: `${target.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Docking Zone */}
        <div
          className="absolute border-2 border-green-400/50 rounded-full"
          style={{ 
            left: `${target.x}px`, 
            top: `${target.y}px`,
            width: '40px',
            height: '40px',
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* Stars background */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
      
      <div className="mt-4 space-y-2">
        {!gameActive && !docked && (
          <button
            onClick={() => setGameActive(true)}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg transition-all"
          >
            Start Docking
          </button>
        )}
        
        {docked && (
          <div className="space-y-2">
            <div className="text-green-400 font-semibold text-lg">🎉 Successful Docking!</div>
            <div className="text-cyan-400">Final Score: {score}</div>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white font-medium hover:shadow-lg transition-all"
            >
              Try Again
            </button>
          </div>
        )}
        
        <div className="text-sm text-slate-400 mt-2">
          Use arrow keys to dock with the ISS. Get close to the green zone!
        </div>
      </div>
    </div>
  );
};

// Memory Game Component
const MemoryGame: React.FC<{ onScore: (score: number) => void }> = ({ onScore }) => {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);

  const spaceEmojis = ['🚀', '🛰️', '🌍', '🌙', '⭐', '🪐', '☄️', '👨‍🚀'];

  const initializeGame = () => {
    const gameCards = [...spaceEmojis, ...spaceEmojis].sort(() => Math.random() - 0.5);
    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setScore(0);
    setGameActive(true);
  };

  const handleCardClick = (index: number) => {
    if (!gameActive || flipped.includes(index) || matched.includes(index)) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    
    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched(prev => [...prev, ...newFlipped]);
        setFlipped([]);
        
        if (matched.length + 2 === cards.length) {
          const finalScore = Math.max(100, 1000 - moves * 20);
          setScore(finalScore);
          onScore(finalScore);
          setGameActive(false);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="text-2xl font-bold text-white mb-2">Space Memory</div>
        <div className="text-cyan-400">Moves: {moves} | Score: {score}</div>
      </div>
      
      {cards.length === 0 ? (
        <button
          onClick={initializeGame}
          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-medium hover:shadow-lg transition-all"
        >
          Start Game
        </button>
      ) : (
        <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`w-16 h-16 rounded-lg border-2 text-2xl transition-all duration-300 ${
                flipped.includes(index) || matched.includes(index)
                  ? 'bg-cyan-500/20 border-cyan-400'
                  : 'bg-slate-800 border-slate-600 hover:border-cyan-500/50'
              }`}
            >
              {flipped.includes(index) || matched.includes(index) ? card : '?'}
            </button>
          ))}
        </div>
      )}
      
      {matched.length === cards.length && cards.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="text-green-400 font-semibold text-lg">🎉 Congratulations!</div>
          <button
            onClick={initializeGame}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white font-medium hover:shadow-lg transition-all"
          >
            Play Again
          </button>
        </div>
      )}
      
      <div className="text-sm text-slate-400 mt-2">
        Match pairs of space-themed cards
      </div>
    </div>
  );
};

const WorkingGames: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [playerStats, setPlayerStats] = useState({
    gamesPlayed: 0,
    totalScore: 0,
    bestScore: 0
  });

  const handleScore = (score: number) => {
    setPlayerStats(prev => ({
      gamesPlayed: prev.gamesPlayed + 1,
      totalScore: prev.totalScore + score,
      bestScore: Math.max(prev.bestScore, score)
    }));
  };

  const games = [
    {
      id: 'snake',
      title: 'Space Snake',
      description: 'Navigate your spacecraft through space, collecting resources while avoiding collisions',
      difficulty: 'Easy',
      players: '1,247',
      icon: Target,
      gradient: 'from-cyan-400 to-blue-500',
      component: <SnakeGame onScore={handleScore} />
    },
    {
      id: 'shooter',
      title: '3D Space Shooter',
      description: 'Defend Earth from alien invaders in this immersive 3D space shooter experience',
      difficulty: 'Medium',
      players: '2,156',
      icon: Crosshair,
      gradient: 'from-red-400 to-pink-500',
      component: <SpaceShooter3D onScore={handleScore} />
    },
    {
      id: 'docking',
      title: 'ISS Docking Simulator',
      description: 'Master the precise art of spacecraft docking with the International Space Station',
      difficulty: 'Hard',
      players: '892',
      icon: Zap,
      gradient: 'from-orange-400 to-red-500',
      component: <DockingSimulator onScore={handleScore} />
    },
    {
      id: 'memory',
      title: 'Space Memory Challenge',
      description: 'Test your memory with space-themed cards and improve your cognitive skills',
      difficulty: 'Medium',
      players: '1,456',
      icon: Star,
      gradient: 'from-purple-400 to-pink-500',
      component: <MemoryGame onScore={handleScore} />
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'AstronautAce', score: 98752, badge: '🥇' },
    { rank: 2, name: 'SpaceExplorer', score: 95431, badge: '🥈' },
    { rank: 3, name: 'OrbitMaster', score: 92187, badge: '🥉' },
    { rank: 4, name: 'CosmicPilot', score: 88965, badge: '🏆' },
    { rank: 5, name: 'StarNavigator', score: 85742, badge: '🌟' },
  ];

  return (
    <div className="relative z-10 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Space Gaming Zone
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Challenge yourself with space-themed games that teach real space science concepts
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Game Selection */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Select Game</h3>
              <div className="space-y-3">
                {games.map((game) => {
                  const Icon = game.icon;
                  return (
                    <button
                      key={game.id}
                      onClick={() => setSelectedGame(game.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        selectedGame === game.id
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-l-4 border-cyan-400'
                          : 'bg-slate-800/30 hover:bg-slate-700/40'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${game.gradient} flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">{game.title}</h4>
                          <p className="text-xs text-slate-400">{game.difficulty}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Player Stats */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Games Played</span>
                  <span className="text-white font-semibold">{playerStats.gamesPlayed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Score</span>
                  <span className="text-cyan-400 font-semibold">{playerStats.totalScore.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Best Score</span>
                  <span className="text-green-400 font-semibold">{playerStats.bestScore.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                Leaderboard
              </h3>
              <div className="space-y-2">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between p-2 rounded transition-colors ${
                      player.rank === 1 ? 'bg-yellow-500/10' :
                      player.rank === 2 ? 'bg-slate-600/20' :
                      player.rank === 3 ? 'bg-orange-500/10' :
                      'bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{player.badge}</span>
                      <div>
                        <div className="text-white font-medium text-sm">{player.name}</div>
                        <div className="text-xs text-slate-400">{player.score.toLocaleString()} pts</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">#{player.rank}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Game Area */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20 min-h-[600px] flex items-center justify-center">
              {selectedGame ? (
                <div className="w-full">
                  {games.find(g => g.id === selectedGame)?.component}
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                    <Gamepad2 className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Choose Your Space Adventure</h3>
                  <p className="text-slate-300 mb-6 max-w-md mx-auto">
                    Select a game from the sidebar to start your space exploration journey. 
                    Each game teaches real space science concepts while providing fun gameplay.
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {games.map((game) => {
                      const Icon = game.icon;
                      return (
                        <button
                          key={game.id}
                          onClick={() => setSelectedGame(game.id)}
                          className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all group"
                        >
                          <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r ${game.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-white font-medium mb-1">{game.title}</h4>
                          <p className="text-xs text-slate-400">{game.players} players</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingGames;