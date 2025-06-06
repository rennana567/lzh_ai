// 游戏主类
class BubbleShooter {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.startScreen = document.getElementById('start-screen');
        this.gameOverScreen = document.getElementById('game-over');
        this.pauseScreen = document.getElementById('pause-screen');
        this.scoreDisplay = document.getElementById('score');
        this.finalScoreDisplay = document.getElementById('final-score');
        this.finalMessage = document.getElementById('final-message');
        this.timeDisplay = document.getElementById('time-display');
        this.soundToggleBtn = document.getElementById('sound-toggle');
        this.settingsBtn = document.getElementById('settings-btn');
        this.powerupBtn = document.getElementById('powerup-btn');
        this.powerupModal = document.getElementById('powerup-modal');
        this.leaderboard = document.getElementById('leaderboard');
        this.nameInputContainer = document.getElementById('name-input-container');
        this.playerNameInput = document.getElementById('player-name');
        this.submitScoreBtn = document.getElementById('submit-score');
        this.undoBtn = document.getElementById('undo-btn');
        this.undoCountDisplay = document.getElementById('undo-count');
        this.hintBtn = document.getElementById('hint-btn');

        this.gameState = 'ready'; // ready, playing, paused, gameOver
        this.score = 0;
        this.level = 1;
        this.bubbles = [];
        this.shootingBubble = null;
        this.nextBubble = null;
        this.bubbleRadius = 0;
        this.rows = 11;
        this.cols = 0;
        this.bubbleColors = [
            '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', 
            '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC8DD'
        ];
        this.shootSpeed = 15;
        this.gameSpeed = 1;
        
        // 时间限制相关变量
        this.gameDuration = 120000; // 2分钟 = 120,000毫秒
        this.startTime = 0;
        this.remainingTime = this.gameDuration;
        this.timeUpdateInterval = null;

        this.lastTime = 0;
        this.animationId = null;
        this.soundEnabled = true;
        this.popAnimations = [];

        // 道具相关变量
        this.powerupUsed = false;
        this.selectedPowerupColor = null;

        // 撤销相关变量
        this.undoStack = []; // 存储游戏状态历史
        this.undoCount = 3; // 每局可撤销次数
        this.maxUndoCount = 3; // 最大撤销次数

        // 排行榜数据
        this.leaderboardData = [
            { name: "时间王者", score: 1500 },
            { name: "泡泡达人", score: 1200 },
            { name: "新手挑战", score: 800 }
        ];

        // 音效占位符
        this.sounds = {
            shoot: null,
            pop: null,
            gameOver: null,
            levelUp: null,
            win: null
        };
        this.loadSounds();

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.initializeGame();
        this.setupEventListeners();
        this.startGameLoop();
        this.updateLeaderboard();
    }

    loadSounds() {
        try {
            console.log("音效占位符，请替换为真实音频");
        } catch (e) {
            console.warn("加载音效失败，将禁用音效:", e);
            this.soundEnabled = false;
            this.updateSoundIcon();
        }
    }

    playSound(soundName) {
        if (this.soundEnabled && this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play().catch(e => console.warn(`播放音效 ${soundName} 失败:`, e));
        }
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const availableWidth = container.clientWidth - 8;
        
        const minCols = 8;
        const maxCols = 15;
        this.cols = Math.max(minCols, Math.min(maxCols, Math.floor(availableWidth / (this.bubbleRadius * 2 || 40))));
        this.bubbleRadius = Math.floor(availableWidth / (this.cols * 2));
        
        this.canvas.width = this.cols * this.bubbleRadius * 2;
        this.canvas.height = this.rows * this.bubbleRadius * 1.8;

        this.launcherX = this.canvas.width / 2;
        this.launcherY = this.canvas.height - this.bubbleRadius * 1.5;

        if (this.gameState === 'ready' || this.gameState === 'gameOver') {
             this.initializeGame();
        }
        this.drawGame();
    }

    initializeGame() {
        this.score = 0;
        this.level = 1;
        this.bubbles = [];
        this.shootingBubble = null;
        this.nextBubble = null;
        this.popAnimations = [];
        this.gameSpeed = 1;
        this.remainingTime = this.gameDuration;
        this.timeDisplay.textContent = '2:00';
        this.powerupUsed = false;
        this.selectedPowerupColor = null;
        this.powerupBtn.disabled = false;
        this.undoCount = this.maxUndoCount;
        this.undoStack = [];
        this.updateUndoCount();
        
        this.createBubbleGrid();
        this.createShootingBubble();
        this.updateScore();
        this.updateLevelDisplay();
        this.gameState = 'ready';
        this.showStartScreen();
        this.drawGame();
    }

    saveGameState() {
        // 只在游戏进行中保存状态
        if (this.gameState !== 'playing') return;
        
        // 保存当前游戏状态
        const gameState = {
            bubbles: JSON.parse(JSON.stringify(this.bubbles)),
            shootingBubble: this.shootingBubble ? JSON.parse(JSON.stringify(this.shootingBubble)) : null,
            nextBubble: this.nextBubble ? JSON.parse(JSON.stringify(this.nextBubble)) : null,
            score: this.score,
            level: this.level,
            remainingTime: this.remainingTime
        };
        
        this.undoStack.push(gameState);
        
        // 限制保存的状态数量，防止内存占用过大
        if (this.undoStack.length > 10) {
            this.undoStack.shift();
        }
    }

    undoLastMove() {
        if (this.undoCount <= 0 || this.undoStack.length === 0 || this.gameState !== 'playing') {
            this.showUndoMessage(`没有可撤销的操作或撤销次数已用完`);
            return;
        }
        
        this.undoCount--;
        this.updateUndoCount();
        
        const lastState = this.undoStack.pop();
        
        this.bubbles = JSON.parse(JSON.stringify(lastState.bubbles));
        this.shootingBubble = lastState.shootingBubble ? JSON.parse(JSON.stringify(lastState.shootingBubble)) : null;
        this.nextBubble = lastState.nextBubble ? JSON.parse(JSON.stringify(lastState.nextBubble)) : null;
        this.score = lastState.score;
        this.level = lastState.level;
        this.remainingTime = lastState.remainingTime;
        
        this.updateScore();
        this.updateLevelDisplay();
        this.drawGame();
        
        this.showUndoMessage(`撤销成功！剩余撤销次数: ${this.undoCount}`);
    }

    showUndoMessage(message) {
        const undoMsg = document.createElement('div');
        undoMsg.className = 'hint-message';
        undoMsg.textContent = message;
        undoMsg.style.backgroundColor = 'rgba(67, 97, 238, 0.9)';
        
        document.body.appendChild(undoMsg);
        
        setTimeout(() => {
            undoMsg.remove();
        }, 1500);
    }

    updateUndoCount() {
        this.undoCountDisplay.textContent = this.undoCount;
    }

    createBubbleGrid() {
        this.bubbles = [];
        const startRows = 4;
        const bubbleDiameter = this.bubbleRadius * 2;
        const rowHeight = this.bubbleRadius * 1.8;

        for (let row = 0; row < startRows; row++) {
            const isOffsetRow = row % 2 === 1;
            const y = this.bubbleRadius + row * rowHeight;
            const colsInRow = isOffsetRow ? this.cols - 1 : this.cols;
            
            for (let col = 0; col < colsInRow; col++) {
                if (Math.random() < 0.8) { // 80%概率生成泡泡
                    const x = this.bubbleRadius + col * bubbleDiameter + (isOffsetRow ? this.bubbleRadius : 0);
                    if (x + this.bubbleRadius <= this.canvas.width) {
                        const color = this.getRandomColor();
                        this.bubbles.push({
                            x, y, radius: this.bubbleRadius, color, 
                            row, col, isShooting: false, isMatched: false, isConnected: true
                        });
                    }
                }
            }
        }
    }

    getRandomColor() {
        const existingColors = [...new Set(this.bubbles.map(b => b.color))];
        const availableColors = this.bubbleColors.filter(c => existingColors.includes(c));
        if (availableColors.length > 0 && Math.random() < 0.8) {
            return availableColors[Math.floor(Math.random() * availableColors.length)];
        } else {
            return this.bubbleColors[Math.floor(Math.random() * this.bubbleColors.length)];
        }
    }

    createShootingBubble() {
        if (this.shootingBubble) return;

        if (!this.nextBubble) {
            this.nextBubble = this.generateRandomBubble();
        }
        
        this.shootingBubble = {
            ...this.nextBubble,
            x: this.launcherX,
            y: this.launcherY,
            isShooting: false,
            velocity: { x: 0, y: 0 },
            direction: { x: 0, y: -1 }
        };
        
        this.nextBubble = this.generateRandomBubble();
        this.drawGame();
    }

    generateRandomBubble() {
        // 如果有选择的道具颜色，优先使用
        if (this.selectedPowerupColor) {
            const color = this.selectedPowerupColor;
            this.selectedPowerupColor = null; // 重置选择
            return {
                x: 0, y: 0, radius: this.bubbleRadius, color, 
                row: -1, col: -1, isShooting: false, isMatched: false, isConnected: false
            };
        }
        
        const color = this.getRandomColor();
        return {
            x: 0, y: 0, radius: this.bubbleRadius, color, 
            row: -1, col: -1, isShooting: false, isMatched: false, isConnected: false
        };
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('click', this.handleMouseClick.bind(this));
        window.addEventListener('keydown', this.handleKeyDown.bind(this));

        document.getElementById('start-btn').addEventListener('click', this.startGame.bind(this));
        document.getElementById('pause-btn').addEventListener('click', this.togglePause.bind(this));
        document.getElementById('resume-btn').addEventListener('click', this.togglePause.bind(this));
        document.getElementById('restart-btn').addEventListener('click', this.restartGame.bind(this));
        this.soundToggleBtn.addEventListener('click', this.toggleSound.bind(this));
        this.powerupBtn.addEventListener('click', this.showPowerupModal.bind(this));
        this.submitScoreBtn.addEventListener('click', this.submitScore.bind(this));
        this.undoBtn.addEventListener('click', this.undoLastMove.bind(this));
        this.hintBtn.addEventListener('click', this.showHint.bind(this));
        
        this.settingsBtn.addEventListener('click', () => {
            alert('设置功能待开发。');
        });

        // 道具选择相关事件
        document.querySelectorAll('.powerup-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.powerup-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
        
        document.getElementById('confirm-powerup').addEventListener('click', this.selectPowerup.bind(this));
        document.getElementById('cancel-powerup').addEventListener('click', this.hidePowerupModal.bind(this));
    }

    showHint() {
        const hintMsg = document.createElement('div');
        hintMsg.className = 'hint-message';
        hintMsg.textContent = '这么简单，还要提示？指哪打哪就行';
        
        document.body.appendChild(hintMsg);
        
        setTimeout(() => {
            hintMsg.remove();
        }, 1500);
    }

    showPowerupModal() {
        if (this.gameState !== 'playing' || this.powerupUsed) return;
        this.powerupModal.style.display = 'flex';
    }

    hidePowerupModal() {
        this.powerupModal.style.display = 'none';
        document.querySelectorAll('.powerup-option').forEach(opt => opt.classList.remove('selected'));
    }

    selectPowerup() {
        const selectedOption = document.querySelector('.powerup-option.selected');
        if (!selectedOption) {
            alert('请先选择一种颜色');
            return;
        }
        
        this.selectedPowerupColor = selectedOption.dataset.color;
        this.powerupUsed = true;
        this.powerupBtn.disabled = true;
        this.hidePowerupModal();
        
        // 显示道具使用提示
        const powerupMsg = document.createElement('div');
        powerupMsg.className = 'level-up-msg';
        powerupMsg.textContent = '道具已使用!';
        powerupMsg.style.backgroundColor = 'rgba(255, 195, 0, 0.9)';
        document.body.appendChild(powerupMsg);
        
        setTimeout(() => {
            powerupMsg.remove();
        }, 1000);
    }

    handleMouseMove(e) {
        if (this.gameState !== 'playing' || !this.shootingBubble || this.shootingBubble.isShooting) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const dx = mouseX - this.launcherX;
        const dy = mouseY - this.launcherY;
        const length = Math.sqrt(dx * dx + dy * dy);
        
        const angle = Math.atan2(dy, dx);
        const minAngle = -Math.PI * 0.9;
        const maxAngle = -Math.PI * 0.1;
        
        if (length > 10 && angle > minAngle && angle < maxAngle) {
            this.shootingBubble.direction = {
                x: dx / length,
                y: dy / length
            };
            this.drawGame();
        }
    }

    handleMouseClick() {
        if (this.gameState !== 'playing' || !this.shootingBubble || this.shootingBubble.isShooting) return;
        
        // 在发射前保存游戏状态
        this.saveGameState();
        this.shootBubble();
    }

    handleKeyDown(e) {
         if (this.gameState === 'playing') {
            if (e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                if (this.shootingBubble && !this.shootingBubble.isShooting) {
                    // 在发射前保存游戏状态
                    this.saveGameState();
                    this.shootBubble();
                }
            } else if (e.key === 'p' || e.key === 'P') {
                this.togglePause();
            }
         } else if (this.gameState === 'gameOver' && (e.key === ' ' || e.code === 'Space' || e.key === 'Enter')) {
             this.restartGame();
         } else if (this.gameState === 'ready' && (e.key === ' ' || e.code === 'Space' || e.key === 'Enter')) {
             this.startGame();
         }
    }

    shootBubble() {
        if (!this.shootingBubble || this.shootingBubble.isShooting || !this.shootingBubble.direction) return;

        this.playSound('shoot');
        this.shootingBubble.isShooting = true;
        this.shootingBubble.velocity = {
            x: this.shootingBubble.direction.x * this.shootSpeed,
            y: this.shootingBubble.direction.y * this.shootSpeed
        };
    }

    startGame() {
        if (this.gameState !== 'ready') return;
        console.log("Starting game...");
        this.gameState = 'playing';
        this.startTime = performance.now();
        this.hideAllScreens();
        this.updateTimeDisplay();
        
        if (!this.animationId) {
            this.lastTime = performance.now();
            this.startGameLoop();
        }
    }

    updateTimeDisplay() {
        if (this.gameState !== 'playing') return;
        
        clearTimeout(this.timeUpdateInterval);
        
        this.remainingTime = Math.max(0, this.gameDuration - (performance.now() - this.startTime));
        const minutes = Math.floor(this.remainingTime / 60000);
        const seconds = Math.floor((this.remainingTime % 60000) / 1000);
        
        this.timeDisplay.textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (this.remainingTime <= 0) {
            this.gameOver(false);
        } else {
            this.timeUpdateInterval = setTimeout(() => this.updateTimeDisplay(), 1000);
        }
    }

    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.pauseScreen.style.display = 'flex';
            clearTimeout(this.timeUpdateInterval);
            
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            this.drawGame();
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.pauseScreen.style.display = 'none';
            this.startTime += (performance.now() - this.lastTime); // 调整开始时间以补偿暂停时间
            this.lastTime = performance.now();
            this.updateTimeDisplay();
            this.startGameLoop();
        }
    }

    restartGame() {
        console.log("Restarting game...");
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        clearTimeout(this.timeUpdateInterval);
        this.hideAllScreens();
        this.initializeGame();
    }

    gameOver(isWin = false) {
        if (this.gameState === 'gameOver') return;
    
        this.gameState = 'gameOver';
        this.playSound(isWin ? 'win' : 'gameOver');
            
        // 显示不同的结束信息
        const gameOverTitle = this.gameOverScreen.querySelector('h2');
        gameOverTitle.textContent = isWin ? "恭喜获胜！" : "游戏结束";
            
        this.finalScoreDisplay.textContent = this.score;
        this.gameOverScreen.style.display = 'flex';
        
        // 检查是否进入排行榜
        if (this.score > this.leaderboardData[this.leaderboardData.length - 1].score) {
            this.nameInputContainer.style.display = 'block';
            this.playerNameInput.focus();
        } else {
            this.nameInputContainer.style.display = 'none';
        }
            
        // 清除计时器和动画
        if (this.gameTimer) clearInterval(this.gameTimer);
        if (this.animationId) cancelAnimationFrame(this.animationId);
    }

    submitScore() {
        const playerName = this.playerNameInput.value.trim();
        if (!playerName) {
            alert('请输入你的名字');
            return;
        }
        
        // 添加到排行榜
        this.leaderboardData.push({
            name: playerName,
            score: this.score
        });
        
        // 按分数排序
        this.leaderboardData.sort((a, b) => b.score - a.score);
        
        // 只保留前3名
        if (this.leaderboardData.length > 3) {
            this.leaderboardData = this.leaderboardData.slice(0, 3);
        }
        
        // 更新排行榜显示
        this.updateLeaderboard();
        
        // 隐藏输入框
        this.nameInputContainer.style.display = 'none';
        this.playerNameInput.value = '';
    }

    updateLeaderboard() {
        this.leaderboard.innerHTML = '';
        
        this.leaderboardData.forEach((entry, index) => {
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center py-1 border-b border-gray-100';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'font-semibold';
            nameSpan.innerHTML = `<i class="fa fa-user mr-1"></i> ${entry.name}`;
            
            const scoreSpan = document.createElement('span');
            scoreSpan.className = 'text-secondary font-bold';
            scoreSpan.innerHTML = `${entry.score} <i class="fa fa-star ml-1"></i>`;
            
            li.appendChild(nameSpan);
            li.appendChild(scoreSpan);
            this.leaderboard.appendChild(li);
        });
    }

    createConfetti() {
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    hideAllScreens() {
        this.startScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'none';
        this.pauseScreen.style.display = 'none';
    }

    showStartScreen() {
         this.hideAllScreens();
         this.startScreen.style.display = 'flex';
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.updateSoundIcon();
    }

    updateSoundIcon() {
         const soundIcon = this.soundToggleBtn.querySelector('i');
         soundIcon.className = this.soundEnabled ? 'fa fa-volume-up' : 'fa fa-volume-off';
    }

    update(deltaTime) {
        if (this.gameState !== 'playing') return;
        // 检查是否所有泡泡已被消除
        if (this.bubbles.length === 0) {
            this.gameOver(true); // true 表示胜利
            return;
        }
        this.popAnimations = this.popAnimations.filter(anim => {
            anim.timer -= deltaTime;
            return anim.timer > 0;
        });

        if (this.shootingBubble && this.shootingBubble.isShooting) {
            this.shootingBubble.x += this.shootingBubble.velocity.x * (deltaTime / 16.67);
            this.shootingBubble.y += this.shootingBubble.velocity.y * (deltaTime / 16.67);
            
            if (this.shootingBubble.x - this.bubbleRadius <= 0) {
                this.shootingBubble.x = this.bubbleRadius;
                this.shootingBubble.velocity.x *= -1;
            } else if (this.shootingBubble.x + this.bubbleRadius >= this.canvas.width) {
                this.shootingBubble.x = this.canvas.width - this.bubbleRadius;
                this.shootingBubble.velocity.x *= -1;
            }
            
            if (this.shootingBubble.y - this.bubbleRadius <= 0) {
                this.shootingBubble.y = this.bubbleRadius;
                this.snapBubbleToGrid(this.shootingBubble);
                return;
            }
            
            for (const bubble of this.bubbles) {
                if (this.checkCollision(this.shootingBubble, bubble)) {
                    this.snapBubbleToGrid(this.shootingBubble);
                    return;
                }
            }
            
            if (this.shootingBubble.y + this.bubbleRadius < 0) {
                 this.shootingBubble.y = this.bubbleRadius;
                 this.snapBubbleToGrid(this.shootingBubble);
                 return;
            }
        }
    }

    snapBubbleToGrid(bubbleToSnap) {
        if (!bubbleToSnap || !bubbleToSnap.isShooting) return;

        bubbleToSnap.isShooting = false;
        bubbleToSnap.velocity = { x: 0, y: 0 };

        let closestDist = Infinity;
        let snapPos = { x: bubbleToSnap.x, y: bubbleToSnap.y };
        let snapRow = -1, snapCol = -1;

        const bubbleDiameter = this.bubbleRadius * 2;
        const rowHeight = this.bubbleRadius * 1.8;
        const estimatedRow = Math.max(0, Math.round((bubbleToSnap.y - this.bubbleRadius) / rowHeight));

        for (let r = Math.max(0, estimatedRow - 1); r <= estimatedRow + 1 && r < this.rows; r++) {
            const isOffsetRow = r % 2 === 1;
            const y = this.bubbleRadius + r * rowHeight;
            const colsInRow = isOffsetRow ? this.cols - 1 : this.cols;

            for (let c = 0; c < colsInRow; c++) {
                const x = this.bubbleRadius + c * bubbleDiameter + (isOffsetRow ? this.bubbleRadius : 0);
                
                const occupied = this.bubbles.some(b => Math.abs(b.x - x) < 1 && Math.abs(b.y - y) < 1);
                
                if (!occupied) {
                    const dx = bubbleToSnap.x - x;
                    const dy = bubbleToSnap.y - y;
                    const dist = dx * dx + dy * dy;

                    if (dist < closestDist) {
                        closestDist = dist;
                        snapPos = { x, y };
                        snapRow = r;
                        snapCol = c;
                    }
                }
            }
        }
        
        if (snapRow === -1) {
            console.warn("未能找到吸附位置，放置在碰撞点");
            snapPos = { x: bubbleToSnap.x, y: bubbleToSnap.y };
            snapRow = Math.floor((bubbleToSnap.y - this.bubbleRadius) / rowHeight);
            const isOffset = snapRow % 2 === 1;
            snapCol = Math.floor((bubbleToSnap.x - (isOffset ? this.bubbleRadius : 0)) / bubbleDiameter);
        }

        const newBubble = {
            ...bubbleToSnap,
            x: snapPos.x,
            y: snapPos.y,
            row: snapRow,
            col: snapCol,
            isShooting: false,
            isMatched: false,
            isConnected: false
        };

        this.bubbles.push(newBubble);
        this.shootingBubble = null;

        // 检查消除
        const matches = this.findMatches(newBubble);
        if (matches.length >= 3) {
            this.removeMatchedBubbles(matches);
            this.checkFloatingBubbles();
        } else {
            this.checkConnectivity(); 
        }

        // 检查是否清除了所有泡泡
        if (this.bubbles.length === 0) {
            this.gameOver(true);
        } else if (this.checkGameOverCondition()) {
            this.gameOver(false);
        } else {
            setTimeout(() => {
                if (this.gameState === 'playing') {
                     this.createShootingBubble();
                }
            }, 100); 
        }
    }

    checkCollision(bubble1, bubble2) {
        if (!bubble1 || !bubble2) return false;
        const dx = bubble1.x - bubble2.x;
        const dy = bubble1.y - bubble2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < bubble1.radius + bubble2.radius - 2;
    }

    findMatches(startBubble) {
        const matches = [];
        const queue = [startBubble];
        const visited = new Set([startBubble]);

        while (queue.length > 0) {
            const current = queue.shift();
            if (current.color === startBubble.color) {
                matches.push(current);
                const neighbors = this.getAdjacentBubbles(current);
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
        }
        return matches;
    }

    getAdjacentBubbles(bubble) {
        const neighbors = [];
        const searchRadius = this.bubbleRadius * 2.2;

        for (const other of this.bubbles) {
            if (bubble === other) continue;
            const dx = bubble.x - other.x;
            const dy = bubble.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < searchRadius) {
                neighbors.push(other);
            }
        }
        return neighbors;
    }

    removeMatchedBubbles(matchedBubbles) {
        this.playSound('pop');
        const matchScore = matchedBubbles.length * 10 + (matchedBubbles.length - 3) * 5;
        this.score += matchScore;
        this.updateScore();

        const centerX = matchedBubbles.reduce((sum, b) => sum + b.x, 0) / matchedBubbles.length;
        const centerY = matchedBubbles.reduce((sum, b) => sum + b.y, 0) / matchedBubbles.length;
        this.showScorePopup(centerX, centerY, matchScore);

        for (const bubble of matchedBubbles) {
            bubble.isMatched = true;
            this.popAnimations.push({ x: bubble.x, y: bubble.y, radius: bubble.radius, timer: 300 });
        }

        setTimeout(() => {
            this.bubbles = this.bubbles.filter(bubble => !bubble.isMatched);
            this.checkFloatingBubbles();
            // 检查是否所有泡泡都被消除
            if (this.bubbles.length === 0) {
                this.gameOver(true); // true 表示胜利
            }
        }, 300);
    }

    checkFloatingBubbles() {
        this.checkConnectivity();
        const floating = this.bubbles.filter(bubble => !bubble.isConnected && !bubble.isMatched);
        
        if (floating.length > 0) {
            this.playSound('pop');
            const floatScore = floating.length * 20;
            this.score += floatScore;
            this.updateScore();

            for (const bubble of floating) {
                 bubble.isMatched = true;
                 this.showScorePopup(bubble.x, bubble.y, 20);
                 this.popAnimations.push({ x: bubble.x, y: bubble.y, radius: bubble.radius, timer: 300, isFalling: true });
            }
            
            setTimeout(() => {
                this.bubbles = this.bubbles.filter(bubble => !bubble.isMatched);
                this.checkLevelUp();
            }, 300);
        }
    }

    checkConnectivity() {
        for (const bubble of this.bubbles) {
            bubble.isConnected = false;
        }

        const queue = [];
        for (const bubble of this.bubbles) {
            if (bubble.y - bubble.radius <= this.bubbleRadius * 0.5) {
                queue.push(bubble);
                bubble.isConnected = true;
            }
        }

        let head = 0;
        while(head < queue.length) {
            const current = queue[head++];
            const neighbors = this.getAdjacentBubbles(current);
            for (const neighbor of neighbors) {
                if (!neighbor.isConnected) {
                    neighbor.isConnected = true;
                    queue.push(neighbor);
                }
            }
        }
    }

    checkGameOverCondition() {
        const lowestAllowedY = this.launcherY - this.bubbleRadius * 2;
        return this.bubbles.some(bubble => bubble.y + bubble.radius >= lowestAllowedY);
    }

    showScorePopup(x, y, score) {
        const scorePopup = document.createElement('div');
        scorePopup.className = 'score-popup';
        const rect = this.canvas.getBoundingClientRect();
        scorePopup.style.left = `${rect.left + x}px`;
        scorePopup.style.top = `${rect.top + y}px`;
        scorePopup.textContent = score > 0 ? `+${score}` : `${score}`;
        
        document.body.appendChild(scorePopup);
        
        setTimeout(() => {
            scorePopup.remove();
        }, 1000); 
    }
    
    checkLevelUp() {
        const scoreThreshold = 1000 + (this.level - 1) * 1500;
        if (this.score >= scoreThreshold) {
            this.level++;
            this.playSound('levelUp');
            this.showLevelUpMessage();
            this.updateLevelDisplay();
            
            this.gameSpeed = Math.min(2.5, 1 + (this.level - 1) * 0.1);
            console.log(`Level Up! Level: ${this.level}, Speed: ${this.gameSpeed.toFixed(1)}`);
        }
    }
    
    showLevelUpMessage() {
        const levelUpMsg = document.createElement('div');
        levelUpMsg.className = 'level-up-msg';
        levelUpMsg.textContent = `Level ${this.level}!`;
        
        document.body.appendChild(levelUpMsg);
        
        setTimeout(() => {
            levelUpMsg.remove();
        }, 1500);
    }

    updateScore() {
        this.scoreDisplay.textContent = this.score;
    }

    updateLevelDisplay() {
        console.log(`Current Level: ${this.level}`);
    }
    
    drawGame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.bubbles.forEach(bubble => this.drawBubble(bubble));
        
        this.drawLauncher();

        if (this.shootingBubble) {
            this.drawBubble(this.shootingBubble);
            if (!this.shootingBubble.isShooting && this.gameState === 'playing') {
                this.drawDirectionIndicator(this.shootingBubble);
            }
        }
        
        this.drawNextBubblePreview();
        
        this.drawPopAnimations();
    }

    drawLauncher() {
        this.ctx.fillStyle = '#6c757d';
        this.ctx.beginPath();
        this.ctx.arc(this.launcherX, this.launcherY, this.bubbleRadius * 0.8, 0, Math.PI * 2);
        this.ctx.fill();
        
        if (this.shootingBubble && !this.shootingBubble.isShooting && this.shootingBubble.direction) {
            const dir = this.shootingBubble.direction;
            const arrowLength = this.bubbleRadius * 1.5;
            const arrowEndX = this.launcherX + dir.x * arrowLength;
            const arrowEndY = this.launcherY + dir.y * arrowLength;
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.launcherX, this.launcherY);
            this.ctx.lineTo(arrowEndX, arrowEndY);
            this.ctx.strokeStyle = '#343a40';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            this.drawArrowhead(arrowEndX, arrowEndY, dir.x, dir.y, '#343a40');
        }
    }

    drawBubble(bubble) {
        if (!bubble) return;

        this.ctx.save();

        if (bubble.isMatched) {
            // 效果由 popAnimations 处理
        } else {
            this.ctx.beginPath();
            this.ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
            
            const gradient = this.ctx.createRadialGradient(
                bubble.x - bubble.radius * 0.3, 
                bubble.y - bubble.radius * 0.3, 
                bubble.radius * 0.1,
                bubble.x, 
                bubble.y, 
                bubble.radius
            );
            gradient.addColorStop(0, this.lightenColor(bubble.color, 30));
            gradient.addColorStop(1, bubble.color);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            this.ctx.beginPath();
            this.ctx.arc(
                bubble.x - bubble.radius * 0.4, 
                bubble.y - bubble.radius * 0.4, 
                bubble.radius * 0.25, 
                0, 
                Math.PI * 2
            );
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            this.ctx.fill();
            
            this.ctx.beginPath();
            this.ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
        this.ctx.restore();
    }

    drawPopAnimations() {
        this.ctx.save();
        this.popAnimations.forEach(anim => {
            const progress = 1 - (anim.timer / 300);
            const currentRadius = anim.radius * (1 - progress);
            
            if (anim.isFalling) {
                const fallDistance = progress * this.bubbleRadius * 3; 
                this.ctx.globalAlpha = 1 - progress;
                this.ctx.beginPath();
                this.ctx.arc(anim.x, anim.y + fallDistance, currentRadius, 0, Math.PI * 2);
                this.ctx.fillStyle = this.lightenColor(this.bubbleColors[Math.floor(Math.random()*this.bubbleColors.length)], 20);
                this.ctx.fill();
            } else {
                this.ctx.globalAlpha = 1 - progress;
                this.ctx.beginPath();
                this.ctx.arc(anim.x, anim.y, currentRadius, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                this.ctx.fill();
                
                for(let i=0; i<3; i++) {
                    this.ctx.beginPath();
                    const angle = Math.random() * Math.PI * 2;
                    const dist = Math.random() * anim.radius * progress;
                    this.ctx.arc(anim.x + Math.cos(angle)*dist, anim.y + Math.sin(angle)*dist, Math.random()*2+1, 0, Math.PI*2);
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${1-progress})`;
                    this.ctx.fill();
                }
            }
        });
        this.ctx.restore();
    }
    
    drawDirectionIndicator(bubble) {
        if (!bubble || !bubble.direction || bubble.isShooting) return;

        const maxLength = this.canvas.height * 1.5;
        let currentX = bubble.x;
        let currentY = bubble.y;
        let currentVelX = bubble.direction.x * this.shootSpeed;
        let currentVelY = bubble.direction.y * this.shootSpeed;
        let pathLength = 0;

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(currentX, currentY);
        this.ctx.setLineDash([5, 5]);
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';

        const timeStep = 0.1;
        const maxSteps = 100;

        for (let i = 0; i < maxSteps && pathLength < maxLength; i++) {
            let nextX = currentX + currentVelX * timeStep;
            let nextY = currentY + currentVelY * timeStep;
            pathLength += Math.sqrt(Math.pow(currentVelX * timeStep, 2) + Math.pow(currentVelY * timeStep, 2));

            if (nextX - this.bubbleRadius <= 0) {
                nextX = this.bubbleRadius;
                currentVelX *= -1;
            } else if (nextX + this.bubbleRadius >= this.canvas.width) {
                nextX = this.canvas.width - this.bubbleRadius;
                currentVelX *= -1;
            }

            if (nextY - this.bubbleRadius <= 0) {
                nextY = this.bubbleRadius;
                this.ctx.lineTo(nextX, nextY);
                break;
            }

            let collided = false;
            for (const existingBubble of this.bubbles) {
                const dx = nextX - existingBubble.x;
                const dy = nextY - existingBubble.y;
                if (dx * dx + dy * dy < Math.pow(this.bubbleRadius * 2, 2)) {
                     const dist = Math.sqrt(dx*dx + dy*dy);
                     const overlap = this.bubbleRadius * 2 - dist;
                     const adjustX = (dx / dist) * overlap * 0.5;
                     const adjustY = (dy / dist) * overlap * 0.5;
                     this.ctx.lineTo(nextX - adjustX, nextY - adjustY);
                     collided = true;
                     break;
                }
            }
            if (collided) break;

            this.ctx.lineTo(nextX, nextY);
            currentX = nextX;
            currentY = nextY;
        }

        this.ctx.stroke();
        this.ctx.restore();
    }
    
    drawArrowhead(x, y, dirX, dirY, color = 'rgba(0, 0, 0, 0.3)') {
        const arrowSize = 10;
        const angle = Math.atan2(dirY, dirX);
        
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-arrowSize, -arrowSize / 2);
        this.ctx.lineTo(-arrowSize, arrowSize / 2);
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.restore();
    }
    
    drawNextBubblePreview() {
        if (!this.nextBubble) return;
        
        const previewSize = this.bubbleRadius * 1.5;
        const previewX = this.launcherX + this.bubbleRadius * 3;
        const previewY = this.launcherY;
        
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(previewX, previewY, previewSize, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        const tempBubble = {...this.nextBubble, x: previewX, y: previewY, radius: this.bubbleRadius};
        this.drawBubble(tempBubble);
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.font = `${Math.max(10, this.bubbleRadius * 0.6)}px ${tailwind.config.theme.extend.fontFamily.game[0]}`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText('Next', previewX, previewY - previewSize - 5);
        this.ctx.restore();
    }
    
    lightenColor(color, percent) {
        try {
            color = color.replace('#', '');
            let r = parseInt(color.substring(0, 2), 16);
            let g = parseInt(color.substring(2, 4), 16);
            let b = parseInt(color.substring(4, 6), 16);
            r = Math.min(255, Math.round(r * (1 + percent / 100)));
            g = Math.min(255, Math.round(g * (1 + percent / 100)));
            b = Math.min(255, Math.round(b * (1 + percent / 100)));
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        } catch (e) {
            console.warn("Failed to lighten color:", color, e);
            return color;
        }
    }
    
    gameLoop(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        if (this.gameState === 'playing') {
            this.update(deltaTime);
        }
        
        this.drawGame();
        
        if (this.gameState === 'playing' || this.gameState === 'paused') {
            this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
        } else {
            this.animationId = null;
        }
    }
    
    startGameLoop() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.lastTime = performance.now();
        this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    if (window.tailwind) {
        const game = new BubbleShooter();
    } else {
        console.error("Tailwind CSS not loaded!");
    }
});