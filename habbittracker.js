document.addEventListener('DOMContentLoaded', () => {
    // === ЭЛЕМЕНТЫ ===
    const introScreen = document.getElementById('intro-screen');
    const introText = document.getElementById('intro-text');
    const identityScreen = document.getElementById('identity-screen');
    const evolutionScreen = document.getElementById('evolution-screen');
    const evoList = document.getElementById('evo-list');
    const evoTitle = document.getElementById('evo-title');
    const backBtn = document.getElementById('back-btn');
    const evoFinalConfirm = document.getElementById('evo-final-confirm');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const resetBtn = document.getElementById('reset-btn');
    const loadingOverlay = document.getElementById('loading-overlay');

    // === ДАННЫЕ (Цели -> Привычки) ===
    const goalHabits = {
        energy: ['Стакан воды натощак', 'Сон 7-8 часов', 'Контрастный душ'],
        body: ['Силовая 15 мин', 'Белок в каждом приеме', 'Замеры раз в неделю'],
        health: ['Порция овощей к обеду', '8000 шагов', 'Отказ от сахара'],
        sport: ['Интервалы 10 мин', 'Дневник тренировок', 'Разминка суставов'],
        discipline: ['Подъем в одно время', 'План вечера на утро', 'Минимум 2 мин'],
        flex: ['Растяжка 5 мин', 'МФР-ролл вечером', 'Ходьба босиком 10 мин'],
        recovery: ['Медитация после нагрузки', 'Витамины по расписанию', 'Нет экранам до сна'],
        expert: ['10 страниц книги', 'Лекция 15 мин', 'Конспект 1 идеи'],
        lang: ['5 новых слов', '1 минута вслух', 'Интервальное повторение'],
        focus: ['25 мин без телефона', 'Уведомления выкл', 'Чистый рабочий стол'],
        creative: ['1 идея в заметки', 'Прогулка без цели', 'Скетч от руки'],
        career: ['1 урок курса', '1 контакт/нетворкинг', 'Пополнить портфолио'],
        memory: ['Чтение с таймером', 'Ментальная карта', 'Пересказ своими словами'],
        system: ['Разбор 5 файлов', 'Связать 2 заметки', 'Архив старого'],
        silence: ['3 минуты тишины', 'Дыхание 4-7-8', 'Дневник выгрузки мыслей'],
        aware: ['Осознанное питье', 'Прогулка без наушников', 'Чек-ин: Где я сейчас?'],
        detox: ['Отключить уведомления', 'Телефон в другой комнате', 'Цифровой закат'],
        emotion: ['Пауза 3 сек', 'Записать 3 эмоции', 'Благодарность'],
        spirit: ['1 страница мудрости', 'Вечерний ритуал свечи', 'День молчания'],
        minim: ['Выбросить 1 вещь', 'Отказ от покупки', 'Чистое пространство 5 мин'],
        nature: ['10 мин на воздухе', 'Встретить рассвет', 'Контакт с землей']
    };

    const goalNames = {
        energy: 'Вечная энергия', body: 'Тело мечты', health: 'Железное здоровье',
        sport: 'Спортивный результат', discipline: 'Дисциплина и режим',
        flex: 'Гибкость и подвижность', recovery: 'Глубокое восстановление',
        expert: 'Глубокая экспертиза', lang: 'Владение языком', focus: 'Стальной фокус',
        creative: 'Креативное мышление', career: 'Карьерный рост', memory: 'Скорочтение и память',
        system: 'Система знаний', silence: 'Внутренняя тишина', aware: 'Осознанность 24/7',
        detox: 'Цифровой детокс', emotion: 'Эмоциональный контроль', spirit: 'Духовный рост',
        minim: 'Простота и минимализм', nature: 'Гармония с природой'
    };

    const phrases = [
        "Повторение — это не рутина. Это ритм, в котором рождается мастерство.",
        "Ты не становишься кем-то за один день. Каждое действие — это голос за того, кем ты хочешь стать.",
        "Дисциплина — это не ограничение свободы. Это путь к ней."
    ];

    // === ПЕРЕМЕННЫЕ СОСТОЯНИЯ ===
    let selectedIdentity = null;
    let selectedGoals = { athlete: [], student: [], monk: [] };
    let sliderStates = {};
    let phraseInterval = null;
    let currentPhraseIndex = 0;
    let isTransitioning = false;

    // === ЛОГИКА УРОВНЕЙ И XP ===
    function getLevelStats(level) {
        const xpNeeded = Math.floor(15 * Math.pow(level, 1.8));
        const xpPerHabit = 5 + (level - 1) * 3;
        return { xpNeeded, xpPerHabit };
    }

    // === ГЛОБАЛЬНОЕ СОСТОЯНИЕ (DASHBOARD) ===
    let dashState = {
        identity: null,
        identityName: null,
        level: 1,
        currentXP: 0,
        habits: [],
        lastActiveDate: null
    };

    function saveProgress() {
        localStorage.setItem('habbittracker_progress', JSON.stringify(dashState));
    }

    function loadProgress() {
        const saved = localStorage.getItem('habbittracker_progress');
        return saved ? JSON.parse(saved) : null;
    }

    function checkNewDay() {
        const today = new Date().toISOString().split('T')[0];
        if (dashState.lastActiveDate !== today) {
            dashState.habits.forEach(h => h.completed = false);
            dashState.lastActiveDate = today;
            saveProgress();
        }
    }

    // === ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ===
    function init() {
        const saved = loadProgress();
        if (saved && saved.identity) {
            dashState = saved;
            checkNewDay();
            showDashboard();
        } else {
            // Если нет данных, показываем Интро
            introScreen.style.opacity = '1';
            phraseInterval = setInterval(changePhrase, 5000);
        }
    }

    // === ИНТРО: СМЕНА ФРАЗ ===
    function changePhrase() {
        if (isTransitioning) return;
        isTransitioning = true;
        introText.classList.add('fade-out');
        setTimeout(() => {
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            introText.textContent = phrases[currentPhraseIndex];
            introText.classList.remove('fade-out');
            isTransitioning = false;
        }, 1500);
    }

    // === ПЕРЕХОД С ИНТРО -> ВЫБОР ИДЕНТИЧНОСТИ (С ЗАГЛУШКОЙ) ===
    introScreen.addEventListener('click', () => {
        clearInterval(phraseInterval);
        
        // 1. Показываем заглушку
        loadingOverlay.classList.add('active');
        
        // 2. Ждем, потом скрываем интро и показываем выбор
        setTimeout(() => {
            introScreen.style.opacity = '0';
            setTimeout(() => {
                introScreen.style.display = 'none';
                loadingOverlay.classList.remove('active'); // Скрываем заглушку
                identityScreen.classList.add('visible');
            }, 500);
        }, 1500);
    });

    // === ЛОГИКА ИДЕНТИЧНОСТЕЙ (Аккордеон) ===
    document.querySelectorAll('.identity-header').forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = header.closest('.identity-item');
            const id = parent.dataset.id;
            const isActive = parent.classList.contains('active');
            
            document.querySelectorAll('.identity-item').forEach(item => item.classList.remove('active'));
            
            if (!isActive) { 
                parent.classList.add('active'); 
                selectedIdentity = id; 
            } else { 
                selectedIdentity = null; 
            }
        });
    });

    // === ЛОГИКА ВЫБОРА ЦЕЛЕЙ (до 3-х) ===
    document.querySelectorAll('.habit').forEach(habit => {
        habit.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = habit.closest('.identity-item');
            const id = parent.dataset.id;
            const goalId = habit.dataset.habit;
            
            if (habit.classList.contains('selected')) {
                habit.classList.remove('selected');
                selectedGoals[id] = selectedGoals[id].filter(g => g !== goalId);
            } else {
                if (selectedGoals[id].length < 3) { 
                    habit.classList.add('selected'); 
                    selectedGoals[id].push(goalId); 
                }
            }
            updateHabitStates(parent);
            updateConfirmButton(parent);
        });
    });

    function updateHabitStates(parent) {
        const id = parent.dataset.id;
        parent.querySelectorAll('.habit').forEach(h => {
            h.classList.toggle('disabled', !h.classList.contains('selected') && selectedGoals[id].length >= 3);
        });
    }

    function updateConfirmButton(parent) {
        const id = parent.dataset.id;
        const count = selectedGoals[id].length;
        const wrapper = parent.querySelector('.confirm-wrapper');
        wrapper.innerHTML = `<span class="confirm-count">выбрано ${count}/3 целей.</span><br><span class="confirm-text ${count > 0 ? '' : 'disabled'}" id="confirm-${id}">подтверждаешь выбор?</span>`;
        const btn = wrapper.querySelector('.confirm-text');
        if (count > 0) btn.addEventListener('click', (e) => { e.stopPropagation(); startTransition(id); });
    }
    document.querySelectorAll('.identity-item').forEach(item => updateConfirmButton(item));

    // === ПЕРЕХОД ИДЕНТИЧНОСТЬ -> ЭВОЛЮЦИЯ (Анимация FLIP) ===
    function startTransition(identityId) {
        const activeNameEl = document.querySelector('.identity-item.active .identity-name');
        if (!activeNameEl) return;

        renderEvolutionScreen(identityId);
        evolutionScreen.classList.add('visible');
        evoTitle.textContent = activeNameEl.textContent; 
        evoTitle.style.opacity = '0';
        evoTitle.offsetHeight; 
        
        const endRect = evoTitle.getBoundingClientRect();
        const targetComp = window.getComputedStyle(evoTitle);

        const clone = document.createElement('span');
        clone.className = 'clone-title';
        clone.textContent = activeNameEl.textContent;
        Object.assign(clone.style, {
            position: 'fixed', left: `${endRect.left}px`, top: `${endRect.top}px`,
            width: `${endRect.width}px`, fontSize: targetComp.fontSize,
            fontWeight: targetComp.fontWeight, fontFamily: targetComp.fontFamily,
            color: '#111111', lineHeight: targetComp.lineHeight, letterSpacing: targetComp.letterSpacing,
            zIndex: '1000', pointerEvents: 'none', margin: '0', whiteSpace: 'nowrap',
            overflow: 'hidden', transition: 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
            transformOrigin: 'top left'
        });
        document.body.appendChild(clone);

        const startRect = activeNameEl.getBoundingClientRect();
        const deltaX = startRect.left - endRect.left;
        const deltaY = startRect.top - endRect.top;
        const scaleX = startRect.width / endRect.width;
        const scaleY = startRect.height / endRect.height;
        clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;

        identityScreen.classList.add('dissolving');
        identityScreen.style.pointerEvents = 'none';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                clone.style.transform = 'translate(0, 0) scale(1, 1)';
            });
        });

        clone.addEventListener('transitionend', () => {
            evoTitle.style.opacity = '1';
            clone.remove();
            identityScreen.style.display = 'none';
            identityScreen.classList.remove('dissolving');
            identityScreen.style.pointerEvents = 'auto';
        }, { once: true });
    }

    function renderEvolutionScreen(identityId) {
        evoList.innerHTML = '';
        sliderStates = {};
        const selectedGoalIds = selectedGoals[identityId] || [];
        
        selectedGoalIds.forEach((goalId) => {
            const habits = goalHabits[goalId] || ['Привычка 1', 'Привычка 2', 'Привычка 3'];
            const goalTitle = goalNames[goalId] || 'Цель';
            
            const row = document.createElement('div');
            row.className = 'evo-row';
            row.innerHTML = `
                <span class="evo-initial">${goalTitle}</span>
                <span class="evo-arrow">→</span>
                <div class="evo-slider-wrapper" data-goal="${goalId}">
                    <div class="evo-nav prev">‹</div>
                    <div class="evo-slider-viewport">
                        <div class="evo-track">
                            ${habits.map(h => `<div class="evo-option">${h}</div>`).join('')}
                        </div>
                    </div>
                    <div class="evo-nav next">›</div>
                </div>
            `;
            evoList.appendChild(row);
        });
        initSliders();
    }

    function initSliders() {
        document.querySelectorAll('.evo-slider-wrapper').forEach(wrapper => {
            const track = wrapper.querySelector('.evo-track');
            const options = wrapper.querySelectorAll('.evo-option');
            let current = 0, startX = 0, isDragging = false;
            const update = () => { track.style.transform = `translateX(-${current * 100}%)`; };
            wrapper.querySelector('.prev').addEventListener('click', e => { e.stopPropagation(); if(current>0){current--;update();} });
            wrapper.querySelector('.next').addEventListener('click', e => { e.stopPropagation(); if(current<options.length-1){current++;update();} });
            wrapper.addEventListener('mousedown', e => { startX = e.pageX; isDragging = true; });
            wrapper.addEventListener('mouseup', e => {
                if(!isDragging) return;
                const diff = startX - e.pageX;
                if(diff > 30 && current < options.length-1) { current++; update(); }
                else if(diff < -30 && current > 0) { current--; update(); }
                isDragging = false;
            });
            wrapper.addEventListener('mouseleave', () => isDragging = false);
        });
    }

    // === ФИНАЛЬНОЕ ПОДТВЕРЖДЕНИЕ -> ЗАГРУЗКА -> ДАШБОРД ===
    evoFinalConfirm.addEventListener('click', () => {
        const activeNameEl = document.querySelector('.identity-item.active .identity-name');
        const identityId = document.querySelector('.identity-item.active').dataset.id;
        const selectedGoalIds = selectedGoals[identityId];
        
        const finalHabits = selectedGoalIds.map(goalId => {
            const wrapper = document.querySelector(`.evo-slider-wrapper[data-goal="${goalId}"]`);
            const track = wrapper.querySelector('.evo-track');
            const options = wrapper.querySelectorAll('.evo-option');
            const transform = track.style.transform;
            const percent = transform ? parseInt(transform.match(/-(\d+)/)?.[1] || 0) : 0;
            const index = percent / 100;
            
            return {
                id: goalId,
                text: options[index] ? options[index].textContent : options[0].textContent,
                completed: false
            };
        });

        // 1. Скрываем экран эволюции
        evolutionScreen.classList.remove('visible');
        
        // 2. Показываем ЗАГЛУШКУ
        loadingOverlay.classList.add('active');

        // 3. Ждем 2 секунды (магия), сохраняем и переходим
        setTimeout(() => {
            dashState = {
                identity: identityId,
                identityName: activeNameEl.textContent,
                level: 1,
                currentXP: 0,
                habits: finalHabits,
                lastActiveDate: new Date().toISOString().split('T')[0]
            };
            
            saveProgress();
            
            // 4. Скрываем заглушку и показываем Дашборд
            loadingOverlay.classList.remove('active');
            showDashboard();
        }, 2000);
    });

    // === ЛОГИКА ДАШБОРДА ===
    function showDashboard() {
        identityScreen.style.display = 'none';
        evolutionScreen.style.display = 'none';
        
        document.getElementById('dash-identity-name').textContent = dashState.identityName;
        
        renderDashboardHabits();
        updateProgressUI();
        
        dashboardScreen.classList.add('visible');
    }

    function renderDashboardHabits() {
        const list = document.getElementById('dash-habit-list');
        list.innerHTML = '';
        
        const stats = getLevelStats(dashState.level);

        dashState.habits.forEach((habit, index) => {
            const row = document.createElement('div');
            row.className = `dash-habit-row ${habit.completed ? 'completed' : ''}`;
            row.innerHTML = `
                <span class="dash-habit-text">${habit.text}</span>
                <span class="dash-habit-xp">+${stats.xpPerHabit} XP</span>
            `;
            row.addEventListener('click', () => toggleHabit(index, row));
            list.appendChild(row);
        });
    }

    function toggleHabit(index, rowElement) {
        if (dashState.habits[index].completed) return; 
        
        const stats = getLevelStats(dashState.level);
        
        dashState.habits[index].completed = true;
        dashState.currentXP += stats.xpPerHabit;
        
        rowElement.classList.add('completed');
        
        if (dashState.currentXP >= stats.xpNeeded) {
            dashState.level++;
            dashState.currentXP = 0;
            const levelEl = document.getElementById('dash-level-value');
            levelEl.style.transform = "scale(1.5)";
            levelEl.style.color = "#111";
            setTimeout(() => {
                levelEl.style.transform = "scale(1)";
            }, 300);
        }
        
        updateProgressUI();
        saveProgress();
    }

    function updateProgressUI() {
        const stats = getLevelStats(dashState.level);
        const percent = Math.min(100, (dashState.currentXP / stats.xpNeeded) * 100);
        
        document.getElementById('progress-fill').style.width = `${percent}%`;
        document.getElementById('progress-text').textContent = `${dashState.currentXP} / ${stats.xpNeeded} XP`;
        document.getElementById('progress-percent').textContent = `${Math.round(percent)}%`;
        document.getElementById('dash-level-value').textContent = dashState.level;
    }

    // Кнопка сброса
    resetBtn.addEventListener('click', () => {
        if(confirm('Сбросить весь прогресс и начать заново?')) {
            localStorage.removeItem('habbittracker_progress');
            location.reload();
        }
    });

    // Кнопка назад (на экран эволюции)
    backBtn.addEventListener('click', () => {
        evolutionScreen.classList.remove('visible');
        setTimeout(() => {
            identityScreen.style.display = 'flex';
            requestAnimationFrame(() => { identityScreen.classList.add('visible'); identityScreen.style.pointerEvents = 'auto'; });
        }, 300);
    });

    document.addEventListener('click', e => {
        if(!e.target.closest('.identity-header') && !e.target.closest('.habit') && !e.target.closest('.confirm-wrapper')) {
            document.querySelectorAll('.identity-item').forEach(i => i.classList.remove('active'));
            selectedIdentity = null;
        }
    });

    // Запуск приложения
    init();
});
