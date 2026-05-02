window.selectedIdentity = null;

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

    // === БАЗА ДАННЫХ ПРИВЫЧЕК ===
    const goalHabits = {
        energy: ['Стакан воды натощак', '10 приседаний перед завтраком', '3 глубоких вдоха перед едой'],
        body: ['10 отжиманий сразу после пробуждения', '1 минута планки перед сном', 'Растяжка шеи и плеч (2 мин)'],
        health: ['Почистить зубы нитью', 'Гимнастика для глаз (20 сек вдаль)', 'Заменить сладкий чай на воду (1 раз)'],
        sport: ['1 мин суставной разминки', 'Замерить утренний пульс', 'Написать план тренировки на завтра'],
        discipline: ['Записать 3 главные задачи на завтра', 'Убрать рабочий стол перед сном', 'Вычеркнуть выполненное из списка'],
        flex: ['Наклоны к ногам (достать до пола)', 'Вращения плечами и шеей (1 мин)', 'Растяжка грудных мышц в дверном проеме'],
        recovery: ['Убрать телефон за 30 мин до сна', 'Записать 3 вещи, за которые благодарен', 'Почитать бумажную книгу 5 минут'],
        expert: ['Выписать 1 ключевой термин', 'Послушать 2 мин тематического подкаста', 'Пересказать вслух 1 изученный факт'],
        lang: ['Выучить 3 новых слова (карточки)', 'Прочитать 1 короткий пост на языке', 'Написать 1 предложение в дневнике'],
        focus: ['Написать 1 главную задачу на стикере', 'Запустить таймер на 15 мин работы', 'Сделать 3 глубоких вдоха перед стартом'],
        creative: ['Придумать 3 альтернативных решения', 'Написать 5 слов-ассоциаций', 'Задать себе вопрос «А что если…?»'],
        career: ['Посмотреть 1 вакансию мечты (анализ)', 'Записать 1 профессиональное достижение', 'Открыть профиль эксперта и изучить 1 пост'],
        memory: ['Прочитать абзац, ведя пальцем по строке', 'Запомнить 5 цифр/слов и повторить', 'Визуализировать прочитанное (закрыть глаза)'],
        system: ['Почистить фотогалерею (удалить 10 фото)', 'Написать 2 главные задачи на завтра', 'Прибрать рабочий стол в конце дня'],
        silence: ['Посидеть 1 минуту в полной тишине', 'Выписать все мысли на лист (2 мин)', 'Отключить звук на телефоне на 15 минут'],
        aware: ['Сделать первый глоток кофе/чая осознанно', 'Задать себе вопрос: «Где я сейчас?»', 'Посмотреть на свое отражение и улыбнуться'],
        detox: ['Удалить 1 приложение, которое не нужно', 'Не брать телефон в туалет', 'Заменить 5 мин скроллинга на взгляд в окно'],
        emotion: ['Записать 1 эмоцию, которую чувствуешь', 'Сжать и разжать кулаки 5 раз', 'Улыбнуться незнакомцу или коллеге'],
        spirit: ['Спросить себя: «Кто я без своей работы?»', 'Поблагодарить тело за работу', 'Вспомнить свою главную ценность на сегодня'],
        minim: ['Протереть 1 полку или поверхность', 'Надеть простую одежду (без логотипов)', 'Сказать «Нет» одной лишней просьбе'],
        nature: ['Посмотреть на небо 30 секунд', 'Потрогать дерево или растение', 'Послушать пение птиц или шум ветра']
    };

    const goalNames = {
        energy: 'Вечная энергия', body: 'Тело мечты', health: 'Железное здоровье', sport: 'Спортивный результат', discipline: 'Дисциплина и режим', flex: 'Гибкость и подвижность', recovery: 'Глубокое восстановление',
        expert: 'Глубокая экспертиза', lang: 'Владение языком', focus: 'Стальной фокус', creative: 'Креативное мышление', career: 'Карьерный рост', memory: 'Скорочтение и память', system: 'Система знаний',
        silence: 'Внутренняя тишина', aware: 'Осознанность 24/7', detox: 'Цифровой детокс', emotion: 'Эмоциональный контроль', spirit: 'Духовный рост', minim: 'Простота и минимализм', nature: 'Гармония с природой'
    };

    const goalIdentityMap = {
        energy: 'athlete', body: 'athlete', health: 'athlete', sport: 'athlete', discipline: 'athlete', flex: 'athlete', recovery: 'athlete',
        expert: 'student', lang: 'student', focus: 'student', creative: 'student', career: 'student', memory: 'student', system: 'student',
        silence: 'monk', aware: 'monk', detox: 'monk', emotion: 'monk', spirit: 'monk', minim: 'monk', nature: 'monk'
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
    let timerInterval;
    let reminderInterval;
    let currentEditIndex = null;
    let currentTrainingGame = null;
    let trainingGameInterval = null;
    let isHistoryInitialized = false;
    
    // Переменные для Истории и Аналитики
    let currentHistoryType = null; 
    let currentHistoryDate = null;

    // === ГЛОБАЛЬНОЕ СОСТОЯНИЕ ===
    let dashState = {
        identity: null,
        identityName: null,
        level: 1,
        currentXP: 0,
        habits: [],
        lastActiveDate: null,
        checkins: { morning: {}, evening: {} },
        checkinHistory: {}
    };

    function saveProgress() {
        try {
            localStorage.setItem('habbittracker_progress', JSON.stringify(dashState));
        } catch (e) {
            console.warn('⚠️ Ошибка сохранения:', e);
        }
    }

    function loadProgress() {
        try {
            const s = localStorage.getItem('habbittracker_progress');
            return s ? JSON.parse(s) : null;
        } catch (e) {
            console.warn('⚠️ Ошибка загрузки:', e);
            return null;
        }
    }

    function getLevelStats(level) {
        return {
            xpNeeded: Math.floor(15 * Math.pow(level, 1.8)),
            xpPerHabit: 5 + (level - 1) * 3
        };
    }

    function getMaxHabitsForLevel(level) {
        if (level >= 11) return 8;
        if (level >= 9) return 7;
        if (level >= 7) return 6;
        if (level >= 5) return 5;
        if (level >= 3) return 4;
        return 3;
    }

    function checkNewDay() {
        const today = new Date().toISOString().split('T')[0];
        if (dashState.lastActiveDate !== today) {
            dashState.habits.forEach(h => h.completed = false);
            if (!dashState.checkins) dashState.checkins = {};
            dashState.checkins = { morning: {}, evening: {} };
            dashState.lastActiveDate = today;
            saveProgress();
        }
    }

    // === ИНИЦИАЛИЗАЦИЯ ===
    function init() {
        const saved = loadProgress();
        if (saved && saved.identity) {
            dashState = { ...dashState, ...saved };
            if (!dashState.checkins) dashState.checkins = { morning: {}, evening: {} };
            if (!dashState.checkinHistory) dashState.checkinHistory = {};
            window.dashState = dashState;
            
            // ✅ ВОССТАНАВЛИВАЕМ selectedIdentity
            selectedIdentity = dashState.identity;
            window.selectedIdentity = dashState.identity;
            
            selectedGoals[dashState.identity] = [...new Set(dashState.habits.map(h => h.id))];
            
            checkNewDay();
            showDashboard();
        } else {
            introScreen.style.opacity = '1';
            phraseInterval = setInterval(changePhrase, 5000);
        }
    }

    // === ИНТРО И ПЕРЕХОДЫ ===
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

    introScreen.addEventListener('click', () => {
        clearInterval(phraseInterval);
        loadingOverlay.classList.add('active');
        setTimeout(() => {
            introScreen.style.opacity = '0';
            setTimeout(() => {
                introScreen.style.display = 'none';
                loadingOverlay.classList.remove('active');
                identityScreen.classList.add('visible');
            }, 500);
        }, 1500);
    });

    document.querySelectorAll('.identity-header').forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = header.closest('.identity-item');
            const id = parent.dataset.id;
            const isActive = parent.classList.contains('active');
            document.querySelectorAll('.identity-item').forEach(i => i.classList.remove('active'));
            if (!isActive) {
                parent.classList.add('active');
                selectedIdentity = id;
            } else {
                selectedIdentity = null;
            }
        });
    });

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
        parent.querySelectorAll('.habit').forEach(h =>
            h.classList.toggle('disabled', !h.classList.contains('selected') && selectedGoals[id].length >= 3)
        );
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

    function startTransition(identityId) {
        selectedIdentity = identityId; // ✅ ИСПРАВЛЕНИЕ: сохраняем в глобальную переменную
        window.selectedIdentity = identityId;
        
        // Ищем заголовок по data-id (надёжнее, чем искать .active во время анимации)
        const activeNameEl = document.querySelector(`.identity-item[data-id="${identityId}"] .identity-name`);
        if (!activeNameEl) return;

        renderEvolutionScreen(identityId);
        evolutionScreen.classList.add('visible');
        evoTitle.textContent = activeNameEl.textContent; 
        evoTitle.style.opacity = '0'; evoTitle.offsetHeight; 
        
        const endRect = evoTitle.getBoundingClientRect();
        const targetComp = window.getComputedStyle(evoTitle);
        const clone = document.createElement('span');
        clone.className = 'clone-title'; clone.textContent = activeNameEl.textContent;
        Object.assign(clone.style, {
            position: 'fixed', left: `${endRect.left}px`, top: `${endRect.top}px`, width: `${endRect.width}px`,
            fontSize: targetComp.fontSize, fontWeight: targetComp.fontWeight, fontFamily: targetComp.fontFamily,
            color: '#111111', lineHeight: targetComp.lineHeight, letterSpacing: targetComp.letterSpacing,
            zIndex: '1000', pointerEvents: 'none', margin: '0', whiteSpace: 'nowrap', overflow: 'hidden',
            transition: 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease', transformOrigin: 'top left'
        });
        document.body.appendChild(clone);
        const startRect = activeNameEl.getBoundingClientRect();
        const deltaX = startRect.left - endRect.left; const deltaY = startRect.top - endRect.top;
        const scaleX = startRect.width / endRect.width; const scaleY = startRect.height / endRect.height;
        clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;
        identityScreen.classList.add('dissolving'); identityScreen.style.pointerEvents = 'none';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { clone.style.transform = 'translate(0, 0) scale(1, 1)'; });
        });
        clone.addEventListener('transitionend', () => {
            evoTitle.style.opacity = '1'; clone.remove(); identityScreen.style.display = 'none';
            identityScreen.classList.remove('dissolving'); identityScreen.style.pointerEvents = 'auto';
        }, { once: true });
    }

    function renderEvolutionScreen(identityId) {
        evoList.innerHTML = ''; sliderStates = {};
        const selectedGoalIds = selectedGoals[identityId] || [];
        selectedGoalIds.forEach((goalId) => {
            const habits = goalHabits[goalId] || ['Привычка 1', 'Привычка 2', 'Привычка 3'];
            const goalTitle = goalNames[goalId] || 'Цель';
            const row = document.createElement('div'); row.className = 'evo-row';
            row.innerHTML = `<span class="evo-initial">${goalTitle}</span><span class="evo-arrow">→</span><div class="evo-slider-wrapper" data-goal="${goalId}"><div class="evo-nav prev">‹</div><div class="evo-slider-viewport"><div class="evo-track">${habits.map(h => `<div class="evo-option">${h}</div>`).join('')}</div></div><div class="evo-nav next">›</div></div>`;
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
            wrapper.querySelector('.prev').addEventListener('click', e => { e.stopPropagation(); if (current > 0) { current--; update(); } });
            wrapper.querySelector('.next').addEventListener('click', e => { e.stopPropagation(); if (current < options.length - 1) { current++; update(); } });
            wrapper.addEventListener('mousedown', e => { startX = e.pageX; isDragging = true; });
            wrapper.addEventListener('mouseup', e => {
                if (!isDragging) return;
                const diff = startX - e.pageX;
                if (diff > 30 && current < options.length - 1) { current++; update(); }
                else if (diff < -30 && current > 0) { current--; update(); }
                isDragging = false;
            });
            wrapper.addEventListener('mouseleave', () => isDragging = false);
        });
    }

    evoFinalConfirm.addEventListener('click', () => {
        console.log('🔘 Кнопка "зафиксировать путь" нажата');
        console.log('selectedIdentity:', selectedIdentity);

        // ✅ Берём идентичность из переменной (она точно есть)
        const identityId = selectedIdentity;
        if (!identityId) { 
            console.error('❌ ОШИБКА: Идентичность не выбрана'); 
            alert('Пожалуйста, выбери роль и цели заново.');
            return; 
        }

        // Для названия используем маппинг (так как DOM-элемент уже скрыт)
        const identityNames = { athlete: 'Атлет', student: 'Студент', monk: 'Монах' };
        const identityName = identityNames[identityId] || 'Пользователь';

        const selectedGoalIds = selectedGoals[identityId];
        if (!selectedGoalIds || selectedGoalIds.length === 0) {
            console.error('❌ ОШИБКА: Список целей пуст');
            return;
        }

        const finalHabits = selectedGoalIds.map(goalId => {
            const wrapper = document.querySelector(`.evo-slider-wrapper[data-goal="${goalId}"]`);
            if (!wrapper) return null;
            const track = wrapper.querySelector('.evo-track');
            const options = wrapper.querySelectorAll('.evo-option');
            const match = track.style.transform ? track.style.transform.match(/-(\d+)%/) : null;
            const index = match ? parseInt(match[1]) / 100 : 0;
            const text = options[index] ? options[index].textContent : (options[0] ? options[0].textContent : 'Ошибка');
            return { id: goalId, text, completed: false };
        }).filter(h => h !== null);

        evolutionScreen.classList.remove('visible');
        loadingOverlay.classList.add('active');

        setTimeout(() => {
            dashState = {
                identity: identityId,
                identityName: identityName,
                level: 1, currentXP: 0, habits: finalHabits,
                lastActiveDate: new Date().toISOString().split('T')[0],
                checkins: { morning: {}, evening: {} },
                checkinHistory: {}
            };
            saveProgress();
            loadingOverlay.classList.remove('active');
            showDashboard();
        }, 1500);
    });

    backBtn.addEventListener('click', () => {
        evolutionScreen.classList.remove('visible');
        setTimeout(() => {
            identityScreen.style.display = 'flex';
            requestAnimationFrame(() => { identityScreen.classList.add('visible'); identityScreen.style.pointerEvents = 'auto'; });
        }, 300);
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.identity-header') && !e.target.closest('.habit') && !e.target.closest('.confirm-wrapper')) {
            document.querySelectorAll('.identity-item').forEach(i => i.classList.remove('active'));
            selectedIdentity = null;
        }
    });

    // === ПЕРЕКЛЮЧЕНИЕ ВИДОВ ===
    function switchView(viewName) {
        console.log('🔄 switchView:', viewName);
        document.querySelectorAll('.dash-view').forEach(view => view.classList.remove('active'));
        const target = document.getElementById(`view-${viewName}`);
        if (target) {
            setTimeout(() => {
                target.classList.add('active');
                if (viewName === 'habits') { startDayTimer(); } else { if (timerInterval) clearInterval(timerInterval); }
            }, 50);
        }
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === viewName) btn.classList.add('active');
        });
        if (viewName === 'habits') renderDashboardHabits();
        else if (viewName === 'training') initTrainingMenu();
        else if (viewName === 'morning' || viewName === 'evening') initCheckins(viewName);
        updateCheckinButtonPulse();
    }

    function updateCheckinButtonPulse() {
        const morningBtn = document.getElementById('btn-morning');
        const eveningBtn = document.getElementById('btn-evening');
        const today = new Date().toISOString().split('T')[0];
        const history = dashState.checkinHistory || {};
        const todayData = history[today] || {};
        
        if (morningBtn) {
            const hasMorning = todayData.morning && Object.keys(todayData.morning).length > 0;
            morningBtn.classList.toggle('pulse', !hasMorning);
        }
        if (eveningBtn) {
            const hasEvening = todayData.evening && Object.keys(todayData.evening).length > 0;
            eveningBtn.classList.toggle('pulse', !hasEvening);
        }
    }

    function updateDateLabel(type, dateStr) {
        const labelEl = document.getElementById(`date-label-${type}`);
        if (!labelEl) return;
        
        const today = new Date().toISOString().split('T')[0];
        if (!dateStr || dateStr === today) {
            labelEl.textContent = 'Сегодня';
        } else {
            // Преобразуем YYYY-MM-DD в DD.MM.YYYY
            const [y, m, d] = dateStr.split('-');
            labelEl.textContent = `${d}.${m}.${y}`;
        }
    }

    // === ДАШБОРД ===
    function showDashboard() {
        identityScreen.style.display = 'none'; evolutionScreen.style.display = 'none';
        document.getElementById('dash-identity-name').textContent = dashState.identityName;
        dashboardScreen.classList.add('visible');
        switchView('habits');
        updateProgressUI();
        startReminderChecker();
        updateCheckinButtonPulse();
        initHistoryLogic(); // Инициализируем историю и аналитику
    }

    function renderDashboardHabits() {
        const list = document.getElementById('dash-habit-list');
        if (!list) return;
        list.innerHTML = '';
        const stats = getLevelStats(dashState.level);
        const maxHabits = getMaxHabitsForLevel(dashState.level);
        const currentHabits = dashState.habits.length;

        dashState.habits.forEach((habit, index) => {
            const row = document.createElement('div');
            row.className = `dash-habit-row ${habit.completed ? 'completed' : ''}`;
            let subtextHtml = '';
            if (habit.triggerText) subtextHtml += `<span>после того как ${habit.triggerText}</span>`;
            if (habit.reminderTime) subtextHtml += `<span>⏰ Напомнить в ${habit.reminderTime}</span>`;
            row.innerHTML = `<div class="habit-main-line"><span class="dash-habit-text">${habit.text}</span><span class="dash-habit-xp">+${stats.xpPerHabit} XP</span><span class="habit-settings-icon">⚙️</span></div>${subtextHtml ? `<div class="habit-subtext">${subtextHtml}</div>` : ''}`;
            row.querySelector('.dash-habit-text').addEventListener('click', () => toggleHabit(index, row));
            row.querySelector('.habit-settings-icon').addEventListener('click', (e) => { e.stopPropagation(); openHabitSettings(index); });
            list.appendChild(row);
        });

        const emptyUnlockedSlots = maxHabits - currentHabits;
        for (let i = 0; i < emptyUnlockedSlots; i++) {
            const row = document.createElement('div');
            row.className = 'dash-habit-row dash-habit-empty unlocked';
            row.innerHTML = `<span class="dash-habit-text">Добавить привычку</span><span class="lock-icon-right">🔓</span>`;
            row.addEventListener('click', () => openHabitSelector());
            list.appendChild(row);
        }
        const lockedSlots = 8 - maxHabits;
        for (let i = 0; i < lockedSlots; i++) {
            const slotNumber = maxHabits + i + 1;
            const unlockLevel = slotNumber === 4 ? 3 : slotNumber === 5 ? 5 : slotNumber === 6 ? 7 : slotNumber === 7 ? 9 : 11;
            const row = document.createElement('div');
            row.className = 'dash-habit-row dash-habit-empty locked';
            row.innerHTML = `<span class="dash-habit-text">Уровень ${unlockLevel}</span><span class="lock-icon-right">🔒</span>`;
            list.appendChild(row);
        }
    }

    function toggleHabit(index, rowElement) {
        if (dashState.habits[index].completed) return;
        const stats = getLevelStats(dashState.level);
        dashState.habits[index].completed = true;
        dashState.currentXP += stats.xpPerHabit;
        rowElement.classList.add('completed');
        if (dashState.currentXP >= stats.xpNeeded) {
            dashState.level++; dashState.currentXP = 0;
            const levelEl = document.getElementById('dash-level-value');
            levelEl.style.transform = "scale(1.5)"; levelEl.style.color = "#111";
            setTimeout(() => { levelEl.style.transform = "scale(1)"; }, 300);
            showLevelUpAnimation();
            renderDashboardHabits();
        }
        updateProgressUI(); saveProgress();
    }

    function updateProgressUI() {
        const stats = getLevelStats(dashState.level);
        const percent = Math.min(100, (dashState.currentXP / stats.xpNeeded) * 100);
        document.getElementById('progress-fill').style.width = `${percent}%`;
        document.getElementById('progress-text').textContent = `${dashState.currentXP} / ${stats.xpNeeded} XP`;
        document.getElementById('progress-percent').textContent = `${Math.round(percent)}%`;
        document.getElementById('dash-level-value').textContent = dashState.level;
    }

    resetBtn.addEventListener('click', () => {
        if (confirm('Сбросить прогресс?')) {
            localStorage.removeItem('habbittracker_progress');
            location.reload();
        }
    });

    // === ВЫБОР ПРИВЫЧКИ ===
    function openHabitSelector() {
        const modal = document.getElementById('habit-selector-modal');
        const list = document.getElementById('habit-selector-list');
        const subtitle = document.querySelector('.habit-selector-subtitle');
        if (!modal || !list) return;
        const identityId = dashState.identity;
        const availableHabits = [];
        for (const [goalId, habits] of Object.entries(goalHabits)) {
            if (goalIdentityMap[goalId] === identityId) {
                habits.forEach(habitText => {
                    if (!dashState.habits.some(h => h.text === habitText)) availableHabits.push({ goalId, text: habitText });
                });
            }
        }
        subtitle.textContent = `доступно ${availableHabits.length} вариантов`;
        list.innerHTML = '';
        if (availableHabits.length === 0) {
            list.innerHTML = '<div style="text-align:center;color:#999;padding:20px;">Все привычки уже добавлены!</div>';
        } else {
            availableHabits.sort((a, b) => a.text.localeCompare(b.text));
            availableHabits.forEach(habit => {
                const option = document.createElement('div'); option.className = 'habit-option'; option.textContent = habit.text;
                option.addEventListener('click', () => { addNewHabit(habit); closeModal(); });
                list.appendChild(option);
            });
        }
        modal.classList.add('active');
        modal.onclick = (e) => { if (e.target === modal) closeModal(); };
        document.addEventListener('keydown', handleEsc);
    }
    function closeModal() { document.getElementById('habit-selector-modal').classList.remove('active'); document.removeEventListener('keydown', handleEsc); }
    function handleEsc(e) { if (e.key === 'Escape') closeModal(); }
    function addNewHabit(habit) {
        dashState.habits.push({ id: habit.goalId, text: habit.text, completed: false });
        saveProgress(); renderDashboardHabits(); updateProgressUI();
    }

    // === НАСТРОЙКИ ПРИВЫЧКИ ===
    function openHabitSettings(index) {
        currentEditIndex = index;
        const habit = dashState.habits[index];
        const modal = document.getElementById('habit-settings-modal');
        const triggerInput = document.getElementById('setting-trigger-input');
        const reminderToggle = document.getElementById('setting-reminder-toggle');
        const timeInput = document.getElementById('setting-time-input');
        triggerInput.value = habit.triggerText || '';
        if (habit.reminderTime) {
            reminderToggle.checked = true; timeInput.value = habit.reminderTime; timeInput.disabled = false;
        } else {
            reminderToggle.checked = false; timeInput.value = '08:00'; timeInput.disabled = true;
        }
        modal.classList.add('active');
        const saveBtn = document.getElementById('settings-save-btn').cloneNode(true);
        const cancelBtn = document.getElementById('settings-cancel-btn').cloneNode(true);
        const closeBtn = document.getElementById('habit-settings-close').cloneNode(true);
        document.getElementById('settings-save-btn').replaceWith(saveBtn);
        document.getElementById('settings-cancel-btn').replaceWith(cancelBtn);
        document.getElementById('habit-settings-close').replaceWith(closeBtn);
        saveBtn.addEventListener('click', () => { saveSettings(); modal.classList.remove('active'); currentEditIndex = null; });
        cancelBtn.addEventListener('click', () => { modal.classList.remove('active'); currentEditIndex = null; });
        closeBtn.addEventListener('click', () => { modal.classList.remove('active'); currentEditIndex = null; });
        document.querySelector('#setting-reminder-toggle').addEventListener('change', (e) => { timeInput.disabled = !e.target.checked; });
    }
    function saveSettings() {
        if (currentEditIndex === null) return;
        dashState.habits[currentEditIndex].triggerText = document.getElementById('setting-trigger-input').value.trim();
        dashState.habits[currentEditIndex].reminderTime = document.getElementById('setting-reminder-toggle').checked ? document.getElementById('setting-time-input').value : null;
        saveProgress(); renderDashboardHabits();
    }

    // === ЧЕКАПЫ ===
    function initCheckins(type) {
        console.log('🔍 initCheckins вызван для:', type);
        
        if (!dashState.checkins) dashState.checkins = { morning: {}, evening: {} };
        if (!dashState.checkins.morning) dashState.checkins.morning = {};
        if (!dashState.checkins.evening) dashState.checkins.evening = {};
        if (!dashState.checkinHistory) dashState.checkinHistory = {};
        
        // === ПРОВЕРКА: если уже сохранено за сегодня — блокируем форму ===
        const today = new Date().toISOString().split('T')[0];
        if (dashState.checkinHistory[today]?.[type]) {
            console.log(`✅ ${type} уже сохранён за сегодня, загружаем и блокируем`);
            setTimeout(() => lockFormAfterSave(type), 100);
            updateDateLabel(type, today);
            return;
        }
        // ================================================================
        
        setTimeout(() => {
            const prefix = type;
            const form = document.getElementById(`${prefix}-form`);
            if (!form) { console.error(`❌ Форма ${prefix}-form не найдена!`); return; }
            
            // Инициализация шкал 1-10
            const scaleContainers = form.querySelectorAll('.scale-container');
            scaleContainers.forEach((container) => {
                const key = container.dataset.key;
                if (!key) return;
                const checkinsData = dashState.checkins[prefix] || {};
                const currentVal = checkinsData[key] || 0;
                container.innerHTML = '';
                container.className = 'scale-container';
                for (let i = 1; i <= 10; i++) {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = `scale-btn ${i === currentVal ? 'active' : ''}`;
                    btn.textContent = i;
                    btn.addEventListener('click', () => {
                        container.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        if (!dashState.checkins[prefix]) dashState.checkins[prefix] = {};
                        dashState.checkins[prefix][key] = i;
                        saveProgress();
                        updateCheckinButtonPulse();
                        checkSaveButtonState(prefix);
                    });
                    container.appendChild(btn);
                }
            });
            
            // Инициализация полей ввода
            const inputs = form.querySelectorAll('.checkin-time, .checkin-text');
            inputs.forEach(input => {
                const key = input.dataset.key;
                if (!key) return;
                const checkinsData = dashState.checkins[prefix] || {};
                input.value = checkinsData[key] || '';
                const newInput = input.cloneNode(true);
                input.parentNode.replaceChild(newInput, input);
                newInput.addEventListener('input', (e) => {
                    if (!dashState.checkins[prefix]) dashState.checkins[prefix] = {};
                    dashState.checkins[prefix][key] = e.target.value;
                    saveProgress();
                    updateCheckinButtonPulse();
                    checkSaveButtonState(prefix);
                });
            });
            
            initSaveButton(prefix);
            updateDateLabel(type, null);
            console.log('✅ initCheckins завершён');
        }, 150);
    }

    function initSaveButton(type) {
        const btn = document.getElementById(`save-${type}-btn`);
        const status = document.getElementById(`status-${type}`);
        if (!btn || !status) return;
        
        const today = new Date().toISOString().split('T')[0];
        const history = dashState.checkinHistory || {};
        const todayData = history[today];
        
        // Если мы в режиме истории, кнопку сохранения не показываем
        if (currentHistoryType === type) {
             btn.style.display = 'none';
             // Логика кнопки "Назад" обрабатывается в loadHistoryData
             return;
        }

        if (todayData && todayData[type] && Object.keys(todayData[type]).length > 0) {
            btn.classList.add('saved');
            btn.innerHTML = '✓ Сохранено';
            btn.disabled = true;
            status.textContent = 'Чек-ап сохранён';
            status.classList.add('show');
        } else {
            btn.classList.remove('saved');
            btn.innerHTML = '💾 Сохранить чек-ап';
            btn.disabled = false;
            status.classList.remove('show');
            btn.style.opacity = '0.5';
        }
        
        // Удаляем старую кнопку "Назад", если мы вернулись из истории
        const backBtn = document.getElementById('back-to-today-btn');
        if (backBtn) backBtn.remove();
        
        // Назначаем обработчик заново (на случай если он был удален клонированием)
        // Но лучше сделать один раз. Сделаем проверку.
        if (!btn.dataset.handlerAttached) {
            btn.onclick = () => saveCheckin(type);
            btn.dataset.handlerAttached = "true";
        }
    }

    function saveCheckin(type) {
        const today = new Date().toISOString().split('T')[0];
        if (!dashState.checkinHistory) dashState.checkinHistory = {};
        if (!dashState.checkinHistory[today]) dashState.checkinHistory[today] = {};
        
        const checkinData = JSON.parse(JSON.stringify(dashState.checkins[type] || {}));
        if (Object.keys(checkinData).length === 0) {
            alert('Заполни хотя бы одно поле перед сохранением!');
            return;
        }
        
        // Проверяем, было ли уже сохранено (чтобы не фармить XP)
        const wasAlreadySaved = !!dashState.checkinHistory[today][type];
        
        dashState.checkinHistory[today][type] = { ...checkinData, savedAt: new Date().toISOString() };
        
        // Начисляем XP только если это ПЕРВОЕ сохранение за сегодня
        if (!wasAlreadySaved) {
            const xpEarned = 3;
            dashState.currentXP += xpEarned;
            updateProgressUI();
        }
        
        saveProgress();
        
        const btn = document.getElementById(`save-${type}-btn`);
        const status = document.getElementById(`status-${type}`);
        const editBtn = document.getElementById(`edit-${type}-btn`);
        
        if (btn) {
            btn.classList.add('saved');
            btn.innerHTML = `✓ Сохранено`;
            btn.disabled = true;
            btn.style.transform = 'scale(1.05)';
            setTimeout(() => { btn.style.transform = ''; }, 200);
        }
        if (status) {
            status.textContent = wasAlreadySaved ? `Обновлено в ${today}` : `Сохранено в ${today}`;
            status.classList.add('show');
        }
        if (editBtn) {
            editBtn.style.display = 'inline-block';
            editBtn.onclick = () => enableEditing(type);
        }
        
        // Снова блокируем форму
        setTimeout(() => lockFormAfterSave(type), 100);
        
        updateCheckinButtonPulse();
    }

    function checkSaveButtonState(type) {
        const btn = document.getElementById(`save-${type}-btn`);
        if (!btn || btn.disabled) return;
        // Если мы в режиме истории, не трогаем прозрачность
        if (currentHistoryType === type) return;
        
        const checkinData = dashState.checkins[type] || {};
        const hasData = Object.keys(checkinData).some(key => checkinData[key] !== '');
        btn.style.opacity = hasData ? '1' : '0.5';
    }

    // === ТАЙМЕР ===
    function startDayTimer() {
        const timerEl = document.getElementById('reset-timer');
        if (!timerEl) return;
        if (timerInterval) clearInterval(timerInterval);
        function update() {
            const now = new Date();
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const diff = tomorrow - now;
            if (diff <= 0) { location.reload(); return; }
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            timerEl.textContent = `до обновления: ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
        update();
        timerInterval = setInterval(update, 1000);
    }

    // === НАПОМИНАНИЯ ===
    function startReminderChecker() {
        if (reminderInterval) clearInterval(reminderInterval);
        checkReminders();
        reminderInterval = setInterval(checkReminders, 30000);
    }
    function checkReminders() {
        if (!dashState.habits) return;
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        dashState.habits.forEach(habit => {
            if (!habit.completed && habit.reminderTime === currentTime) {
                showReminderToast(habit); playReminderSound();
            }
        });
    }
    function showReminderToast(habit) {
        document.querySelectorAll('.reminder-toast').forEach(t => t.remove());
        const toast = document.createElement('div'); toast.className = 'reminder-toast';
        toast.innerHTML = `<span class="toast-icon">🔔</span><div><strong>Время действовать</strong><p>${habit.text}</p>${habit.triggerText ? `<small>Привязка: ${habit.triggerText}</small>` : ''}</div><button class="toast-close">✕</button>`;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); });
        setTimeout(() => { if (document.body.contains(toast)) { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); } }, 6000);
    }
    function playReminderSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext(); const osc = ctx.createOscillator(); const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = 'sine'; osc.frequency.setValueAtTime(880, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.08, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
            osc.start(); osc.stop(ctx.currentTime + 0.4);
        } catch (e) {}
    }

    // === АНИМАЦИЯ УРОВНЯ ===
    const wolfImages = ['Sneaky wolf 1.png', 'Sneaky wolf 2.png', 'Sneaky wolf 3.png', 'Sneaky wolf 4.png', 'Sneaky wolf 5.png', 'Sneaky wolf 6.png'];
    function showLevelUpAnimation() {
        const animation = document.getElementById('level-up-animation');
        const wolfImg = document.getElementById('level-up-wolf-img');
        if (!animation || !wolfImg) return;
        wolfImg.src = `pics/${wolfImages[Math.floor(Math.random() * wolfImages.length)]}`;
        animation.classList.add('show');
        setTimeout(() => { animation.classList.remove('show'); }, 7000);
    }

    // === ТРЕНИРОВКА: МЕНЮ И ИГРЫ ===
    function initTrainingMenu() {
        const container = document.getElementById('training-games-container');
        if (!container) return;
        container.innerHTML = `
            <div class="training-menu">
                <div class="training-card" data-game="count"><span class="training-icon">🔢</span><span class="training-name">Посчитай</span><span class="training-desc">Быстрый счёт на время</span></div>
                <div class="training-card" data-game="memory"><span class="training-icon">🃏</span><span class="training-name">Найди пару</span><span class="training-desc">Тренировка памяти</span></div>
                <div class="training-card" data-game="words"><span class="training-icon">📝</span><span class="training-name">10 слов</span><span class="training-desc">Запомни и введи</span></div>
            </div>`;
        container.querySelectorAll('.training-card').forEach(card => {
            card.addEventListener('click', () => startTrainingGame(card.dataset.game));
        });
    }

    function startTrainingGame(gameName) {
        const container = document.getElementById('training-games-container');
        if (!container) return;
        currentTrainingGame = gameName;
        stopTrainingGame();
        switch (gameName) {
            case 'count': renderCountGame(container); break;
            case 'memory': renderMemoryGame(container); break;
            case 'words': renderWordsGame(container); break;
        }
    }

    function stopTrainingGame() {
        if (trainingGameInterval) { clearInterval(trainingGameInterval); trainingGameInterval = null; }
    }

    function renderCountGame(container) {
        container.innerHTML = `
            <div class="game-setup" id="count-setup"><h3 style="margin-bottom:15px">Выбери сложность</h3><button class="difficulty-btn" data-diff="1">1-9</button><button class="difficulty-btn" data-diff="2">10-99</button><button class="difficulty-btn" data-diff="3">100-999</button></div>
            <div class="game-area" id="count-area" style="display:none"><div class="game-timer" id="count-timer">60</div><div class="game-equation" id="count-equation"></div><input type="number" class="game-input" id="count-input" placeholder="?" autocomplete="off"></div>
            <button class="training-back-btn" id="training-back">← Назад</button>`;
        let difficulty = 1, timer = 60, correct = 0, total = 0, currentEq = null;
        function getRandom(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
        function generate() {
            const ranges = { 1: [1, 9], 2: [10, 99], 3: [100, 999] };
            const [min, max] = ranges[difficulty];
            let a = getRandom(min, max), b = getRandom(min, max), op = Math.random() > 0.5 ? '+' : '-';
            if (op === '-' && a < b) [a, b] = [b, a];
            return { a, b, op, result: op === '+' ? a + b : a - b };
        }
        function showEq() {
            currentEq = generate();
            document.getElementById('count-equation').textContent = `${currentEq.a} ${currentEq.op} ${currentEq.b} =`;
            const input = document.getElementById('count-input'); input.value = ''; input.focus();
        }
        function start(diff) {
            difficulty = diff; timer = 60; correct = 0; total = 0;
            document.getElementById('count-setup').style.display = 'none';
            document.getElementById('count-area').style.display = 'block';
            document.getElementById('count-timer').textContent = timer;
            showEq();
            trainingGameInterval = setInterval(() => { timer--; document.getElementById('count-timer').textContent = timer; if (timer <= 0) endGame(); }, 1000);
        }
        function endGame() {
            clearInterval(trainingGameInterval);
            container.innerHTML = `<div class="training-result"><div class="training-result-title">Результат</div><div class="training-result-message">Правильных ответов: ${correct} из ${total}</div><div class="training-xp-badge">+${Math.max(1, Math.min(10, correct))} XP</div><div class="training-result-buttons"><button class="training-btn primary" id="retry-count">Ещё раз</button><button class="training-btn secondary" id="menu-count">В меню</button></div><button class="training-back-btn" id="back-count">← Назад</button></div>`;
            document.getElementById('retry-count').onclick = () => renderCountGame(container);
            document.getElementById('menu-count').onclick = () => initTrainingMenu();
            document.getElementById('back-count').onclick = () => initTrainingMenu();
            const earned = Math.max(1, Math.min(10, correct));
            if (window.dashState) { window.dashState.currentXP += earned; const stats = window.getLevelStats?.(window.dashState.level) || { xpNeeded: 15 }; if (window.dashState.currentXP >= stats.xpNeeded) { window.dashState.level++; window.dashState.currentXP = 0; } window.saveProgress?.(); window.updateProgressUI?.(); }
        }
        document.querySelectorAll('#count-setup .difficulty-btn').forEach(btn => btn.addEventListener('click', (e) => start(parseInt(e.target.dataset.diff))));
        document.getElementById('count-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && currentEq) {
                const ans = parseInt(e.target.value);
                if (!isNaN(ans)) {
                    total++; const isCorrect = (ans === currentEq.result);
                    if (isCorrect) { correct++; document.getElementById('count-area').style.backgroundColor = '#e8f5e9'; }
                    else { document.getElementById('count-area').style.backgroundColor = '#ffebee'; }
                    setTimeout(() => { document.getElementById('count-area').style.backgroundColor = ''; }, 250);
                    showEq();
                }
            }
        });
        document.getElementById('training-back').onclick = () => initTrainingMenu();
        start(1);
    }

    function renderMemoryGame(container) {
        const allCardImages = ['Буби 2.png', 'Буби 3.png', 'Буби 4.png', 'Буби 5.png', 'Буби 6.png', 'Буби 7.png', 'Буби 8.png', 'Буби 9.png', 'Буби 10.png', 'Буби Валет.png', 'Буби Дама.png', 'Буби Король.png', 'Буби Туз.png', 'Пики 2.png', 'Пики 3.png', 'Пики 4.png', 'Пики 5.png', 'Пики 6.png', 'Пики 7.png', 'Пики 8.png', 'Пики 9.png', 'Пики 10.png', 'Пики Валет.png', 'Пики Дама.png', 'Пики Король.png', 'Пики Туз.png', 'Трефы 2.png', 'Трефы 3.png', 'Трефы 4.png', 'Трефы 5.png', 'Трефы 6.png', 'Трефы 7.png', 'Трефы 8.png', 'Трефы 9.png', 'Трефы 10.png', 'Трефы Валет.png', 'Трефы Дама.png', 'Трефы Король.png', 'Трефы Туз.png', 'Черви 2.png', 'Черви 3.png', 'Черви 4.png', 'Черви 5.png', 'Черви 6.png', 'Черви 7.png', 'Черви 8.png', 'Черви 9.png', 'Черви 10.png', 'Черви Валет.png', 'Черви Дама.png', 'Черви Король.png', 'Черви Туз.png'];
        const selectedImages = [...allCardImages].sort(() => Math.random() - 0.5).slice(0, 8);
        let cards = [], flipped = [], matchedPairs = 0, moves = 0, canFlip = true;
        container.innerHTML = `<div id="game-grid" style="grid-template-columns:repeat(4,1fr);gap:5px;width:100%;max-width:400px;margin:0 auto"></div><button class="training-back-btn" id="training-back">← Назад</button>`;
        const gameGrid = document.getElementById('game-grid');
        function createCards() { cards = [...selectedImages, ...selectedImages].map((img, i) => ({ id: i, img, flipped: false, matched: false })).sort(() => Math.random() - 0.5); }
        function render() {
            gameGrid.innerHTML = '';
            cards.forEach(card => {
                const el = document.createElement('div');
                el.className = `card${card.flipped || card.matched ? ' flipped' : ''}${card.matched ? ' matched' : ''}`;
                el.dataset.id = card.id;
                const back = document.createElement('div'); back.className = 'card-back'; back.innerHTML = '<span style="font-size:18px;color:#888">?</span>'; el.appendChild(back);
                const img = document.createElement('img'); img.src = `pics/${card.img}`; img.alt = ''; img.draggable = false;
                img.onerror = () => { img.src = 'image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23ddd" width="100" height="100"/></svg>'; };
                el.appendChild(img); el.addEventListener('click', () => flip(card.id)); gameGrid.appendChild(el);
            });
        }
        function flip(id) {
            if (!canFlip) return;
            const card = cards.find(c => c.id === id);
            if (flipped.length === 2 || card.flipped || card.matched) return;
            card.flipped = true; flipped.push(card); render();
            if (flipped.length === 2) {
                moves++; canFlip = false;
                setTimeout(() => {
                    if (flipped[0].img === flipped[1].img) {
                        flipped.forEach(c => { c.matched = true; c.flipped = false; }); matchedPairs++;
                        if (matchedPairs === 8) { clearInterval(trainingGameInterval); endGame(); }
                    } else { flipped.forEach(c => c.flipped = false); }
                    flipped = []; canFlip = true; render();
                }, 400);
            }
        }
        function endGame() {
            const xp = Math.max(1, Math.round(matchedPairs * 1.25));
            container.innerHTML = `<div class="training-result"><div class="training-result-title">Результат</div><div class="training-result-message">Пар найдено: ${matchedPairs} из 8</div><div class="training-xp-badge">+${xp} XP</div><div class="training-result-buttons"><button class="training-btn primary" id="retry-memory">Ещё раз</button><button class="training-btn secondary" id="menu-memory">В меню</button></div><button class="training-back-btn" id="back-memory">← Назад</button></div>`;
            document.getElementById('retry-memory').onclick = () => renderMemoryGame(container);
            document.getElementById('menu-memory').onclick = () => initTrainingMenu();
            document.getElementById('back-memory').onclick = () => initTrainingMenu();
            if (window.dashState) { window.dashState.currentXP += xp; const stats = window.getLevelStats?.(window.dashState.level) || { xpNeeded: 15 }; if (window.dashState.currentXP >= stats.xpNeeded) { window.dashState.level++; window.dashState.currentXP = 0; } window.saveProgress?.(); window.updateProgressUI?.(); }
        }
        createCards(); render();
        document.getElementById('training-back').onclick = () => initTrainingMenu();
    }

    function renderWordsGame(container) {
        const allWords = ["яблоко", "машина", "дом", "книга", "ручка", "солнце", "вода", "дерево", "окно", "стул", "стол", "кошка", "собака", "цветок", "птица", "небо", "облако", "лес", "озеро", "река", "камень", "песок", "море", "снег", "дождь", "ветер", "луна", "звезда", "свет", "тень", "путь", "дверь", "замок", "ключ", "часы", "телефон", "ноутбук", "клавиатура", "мышь", "экран", "зеркало", "картина", "стена", "крыша", "крыло", "хвост", "лапа", "нос", "глаз", "рот", "ухо", "волос", "кожа", "платье", "рубашка", "ботинок", "сапог", "шляпа", "очки", "сумка", "портфель", "карандаш", "тетрадь", "доска", "мел", "сцена", "актер", "роль", "театр", "музыка", "песня", "танец", "праздник", "рождение", "день", "ночь", "сон", "мысль", "чувство", "ум", "сердце", "рука", "нога", "голова", "тело", "жизнь", "смерть", "время", "история", "мир", "война", "дружба", "любовь", "ненависть", "радость", "печаль", "страх", "надежда", "вера"];
        let targetWords = [], entered = [], memorizeTime = 15, guessTime = 45, phase = 'memorize';
        container.innerHTML = `<div class="game-timer" id="words-timer">${memorizeTime}</div><div id="words-display" style="margin:15px 0;font-size:16px"></div><div id="words-input-area" style="display:none"><input type="text" class="game-input" id="words-input" placeholder="Введи слово и нажми Enter" style="width:200px;margin:10px auto"><div class="word-placeholders" id="words-placeholders"></div></div><button class="training-back-btn" id="training-back">← Назад</button>`;
        function getRandomWords(n) { return [...allWords].sort(() => Math.random() - 0.5).slice(0, n); }
        function setupPlaceholders() {
            const c = document.getElementById('words-placeholders'); c.innerHTML = '';
            targetWords.forEach((_, i) => { const ph = document.createElement('div'); ph.className = 'word-placeholder'; ph.id = `ph-${i}`; c.appendChild(ph); });
        }
        function start() {
            targetWords = getRandomWords(8); entered = []; phase = 'memorize'; memorizeTime = 15;
            document.getElementById('words-display').textContent = targetWords.join(', ');
            document.getElementById('words-input-area').style.display = 'none';
            document.getElementById('words-timer').textContent = memorizeTime; setupPlaceholders();
            trainingGameInterval = setInterval(() => {
                if (phase === 'memorize') { memorizeTime--; document.getElementById('words-timer').textContent = memorizeTime; if (memorizeTime <= 0) { phase = 'guess'; guessTime = 45; document.getElementById('words-display').style.visibility = 'hidden'; document.getElementById('words-input-area').style.display = 'block'; document.getElementById('words-input').focus(); document.getElementById('words-timer').textContent = guessTime; } }
                else { guessTime--; document.getElementById('words-timer').textContent = guessTime; if (guessTime <= 0) endGame(); }
            }, 1000);
        }
        function endGame() {
            clearInterval(trainingGameInterval);
            const correct = targetWords.filter(w => entered.includes(w)).length;
            const xp = Math.max(1, correct);
            container.innerHTML = `<div class="training-result"><div class="training-result-title">Результат</div><div class="training-result-message">Угадано слов: ${correct} из 8</div><div class="training-xp-badge">+${xp} XP</div><div class="training-result-buttons"><button class="training-btn primary" id="retry-words">Ещё раз</button><button class="training-btn secondary" id="menu-words">В меню</button></div><button class="training-back-btn" id="back-words">← Назад</button></div>`;
            document.getElementById('retry-words').onclick = () => renderWordsGame(container);
            document.getElementById('menu-words').onclick = () => initTrainingMenu();
            document.getElementById('back-words').onclick = () => initTrainingMenu();
            if (window.dashState) { window.dashState.currentXP += xp; const stats = window.getLevelStats?.(window.dashState.level) || { xpNeeded: 15 }; if (window.dashState.currentXP >= stats.xpNeeded) { window.dashState.level++; window.dashState.currentXP = 0; } window.saveProgress?.(); window.updateProgressUI?.(); }
        }
        document.getElementById('words-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && phase === 'guess') {
                const word = e.target.value.trim().toLowerCase(); e.target.value = '';
                if (word && !entered.includes(word)) {
                    entered.push(word);
                    const idx = targetWords.indexOf(word);
                    if (idx >= 0) { const ph = document.getElementById(`ph-${idx}`); if (ph) { ph.classList.add('filled'); ph.textContent = word; } }
                    if (targetWords.every(w => entered.includes(w))) endGame();
                }
            }
        });
        document.getElementById('training-back').onclick = () => initTrainingMenu();
        start();
    }

    // =========================================
    // 📅 ЛОГИКА ИСТОРИИ И 📊 АНАЛИТИКИ
    // =========================================

    function initHistoryLogic() {
        if (isHistoryInitialized) return;
        isHistoryInitialized = true;
    
        ['morning', 'evening'].forEach(type => {
            const btn = document.getElementById(`history-btn-${type}`);
            const dateInput = document.getElementById(`date-input-${type}`);
            
            if (!btn || !dateInput) return;
    
            // Календарь
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (currentHistoryType === type) {
                    loadTodayData(type);
                    btn.classList.remove('active');
                    currentHistoryType = null;
                } else {
                    const dateInputEl = document.getElementById(`date-input-${type}`);
                    if (dateInputEl) {
                        dateInputEl.showPicker ? dateInputEl.showPicker() : dateInputEl.click();
                    }
                }
            });
    
            // Выбор даты
            dateInput.addEventListener('change', (e) => {
                const date = e.target.value;
                if (!date) return;
                currentHistoryType = type;
                currentHistoryDate = date;
                btn.classList.add('active');
                loadHistoryData(type, date);
            });
        });
    
        // ✅ Аналитика через делегирование (работает всегда, независимо от перерисовок)
        document.addEventListener('click', (e) => {
            const analyticsBtn = e.target.closest('.checkin-analytics-btn');
            if (analyticsBtn) {
                const viewDiv = analyticsBtn.closest('.dash-view');
                if (viewDiv) {
                    const type = viewDiv.id.replace('view-', '');
                    openAnalytics(type);
                }
            }
        });
    }

    function loadTodayData(type) {
        const form = document.getElementById(`${type}-form`);
        if (form) form.classList.remove('history-mode');
        
        const dateInput = document.getElementById(`date-input-${type}`);
        if (dateInput) dateInput.value = '';
        
        const today = new Date().toISOString().split('T')[0];
        const isSaved = dashState.checkinHistory[today]?.[type];
        
        // === Если уже сохранено — сразу блокируем ===
        if (isSaved) {
            console.log(`🔒 ${type} за сегодня уже сохранён, блокируем`);
            setTimeout(() => lockFormAfterSave(type), 50);
            updateDateLabel(type, today);
            return;
        }
        // =========================================
        
        initCheckins(type);
        
        const btn = document.getElementById(`save-${type}-btn`);
        if (btn) btn.style.display = 'inline-block';
        
        updateDateLabel(type, null);
        
        const backBtn = document.getElementById('back-to-today-btn');
        if (backBtn) backBtn.remove();
    }

    function lockFormAfterSave(type) {
        const today = new Date().toISOString().split('T')[0];
        const savedData = dashState.checkinHistory[today]?.[type];
        
        if (!savedData) return; // Если нет сохранённых данных — не блокируем
        
        const form = document.getElementById(`${type}-form`);
        form.classList.add('history-mode');
        
        // Заполняем форму сохранёнными данными
        form.querySelectorAll('.scale-container').forEach(container => {
            const key = container.dataset.key;
            const val = savedData[key] || 0;
            container.innerHTML = '';
            container.className = 'scale-container';
            
            for (let i = 1; i <= 10; i++) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `scale-btn ${i === val ? 'active' : ''}`;
                btn.textContent = i;
                btn.disabled = true;
                container.appendChild(btn);
            }
        });
        
        form.querySelectorAll('input').forEach(input => {
            const key = input.dataset.key;
            if (key) input.value = savedData[key] || '';
            input.disabled = true;
            input.readOnly = true;
        });
        
        // Скрываем кнопку сохранения
        const saveBtn = document.getElementById(`save-${type}-btn`);
        if (saveBtn) saveBtn.style.display = 'none';
        
        // Показываем статус
        const status = document.getElementById(`status-${type}`);
        if (status) {
            status.textContent = 'Чек-ап сохранён';
            status.classList.add('show');
        }
        
        // === ПОКАЗЫВАЕМ КНОПКУ РЕДАКТИРОВАНИЯ ===
        const editBtn = document.getElementById(`edit-${type}-btn`);
        if (editBtn) {
            editBtn.style.display = 'inline-block';
            editBtn.onclick = () => enableEditing(type);
        }
        // =========================================
        
        // Обновляем метку даты
        updateDateLabel(type, today);
    }

    function enableEditing(type) {
        const form = document.getElementById(`${type}-form`);
        const today = new Date().toISOString().split('T')[0];
        
        // Загружаем сохранённые данные во временное хранилище
        const savedData = dashState.checkinHistory[today]?.[type] || {};
        dashState.checkins[type] = { ...savedData };
        
        form.classList.remove('history-mode');
        
        // UI обновления
        const editBtn = document.getElementById(`edit-${type}-btn`);
        const saveBtn = document.getElementById(`save-${type}-btn`);
        const status = document.getElementById(`status-${type}`);
        
        if (editBtn) editBtn.style.display = 'none';
        
        // === ИСПРАВЛЕНИЕ: Показываем кнопку и ВЕШАЕМ ОБРАБОТЧИК ===
        if (saveBtn) {
            saveBtn.style.display = 'inline-block';
            saveBtn.innerHTML = '💾 Обновить чек-ап';
            saveBtn.disabled = false;
            saveBtn.classList.remove('saved');
            // Явно назначаем функцию сохранения
            saveBtn.onclick = () => saveCheckin(type);
        }
        // =========================================
        
        if (status) status.classList.remove('show');
        
        // Перерисовываем интерактивные элементы
        setTimeout(() => {
            // Шкалы
            form.querySelectorAll('.scale-container').forEach(container => {
                const key = container.dataset.key;
                const val = dashState.checkins[type]?.[key] || 0;
                container.innerHTML = '';
                container.className = 'scale-container';
                for (let i = 1; i <= 10; i++) {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = `scale-btn ${i === val ? 'active' : ''}`;
                    btn.textContent = i;
                    btn.addEventListener('click', () => {
                        container.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        dashState.checkins[type][key] = i;
                        saveProgress();
                    });
                    container.appendChild(btn);
                }
            });
            
            // Инпуты
            form.querySelectorAll('input').forEach(input => {
                const key = input.dataset.key;
                if (!key) return;
                input.value = dashState.checkins[type]?.[key] || '';
                input.disabled = false;
                input.readOnly = false;
                
                const newInput = input.cloneNode(true);
                input.parentNode.replaceChild(newInput, input);
                newInput.addEventListener('input', (e) => {
                    dashState.checkins[type][key] = e.target.value;
                    saveProgress();
                });
            });
        }, 50);
    }

    function loadHistoryData(type, date) {
        const history = dashState.checkinHistory || {};
        const data = history[date]?.[type];
        
        if (!data) {
            alert('Нет данных за этот день');
            loadTodayData(type);
            return;
        }
    
        const form = document.getElementById(`${type}-form`);
        form.classList.add('history-mode'); // Включаем визуальный режим чтения
        
        // Блокируем шкалы
        form.querySelectorAll('.scale-container').forEach(container => {
            const key = container.dataset.key;
            const val = data[key] || 0;
            container.innerHTML = '';
            container.className = 'scale-container';
            
            for (let i = 1; i <= 10; i++) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `scale-btn ${i === val ? 'active' : ''}`;
                btn.textContent = i;
                btn.disabled = true; // Жёсткая блокировка
                container.appendChild(btn);
            }
        });
    
        // Блокируем инпуты
        form.querySelectorAll('input').forEach(input => {
            const key = input.dataset.key;
            if (key) input.value = data[key] || '';
            input.disabled = true;
            input.readOnly = true;
        });
    
        // Скрываем кнопку сохранения
        const saveBtn = document.getElementById(`save-${type}-btn`);
        if (saveBtn) saveBtn.style.display = 'none';
        
        updateDateLabel(type, date);

        // Кнопка возврата
        const oldBackBtn = document.getElementById('back-to-today-btn');
        if (oldBackBtn) oldBackBtn.remove();
        
        const backBtn = document.createElement('button');
        backBtn.className = 'checkin-save-btn';
        backBtn.id = 'back-to-today-btn';
        backBtn.innerHTML = '↩ Вернуться к сегодня';
        backBtn.onclick = () => loadTodayData(type);
        saveBtn.parentNode.appendChild(backBtn);
    }

    function openAnalytics(type) {
        console.log('📊 Opening analytics for:', type);
        
        let modal = document.getElementById('analytics-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'analytics-modal';
            modal.className = 'analytics-modal';
            document.body.appendChild(modal);
        }
        
        modal.innerHTML = `
            <div class="analytics-header">
                <h3>📊 Аналитика</h3>
                <button class="analytics-close" id="analytics-close-btn">✕</button>
            </div>
            <div class="analytics-controls">
                <label>С:</label>
                <input type="date" id="analytics-start">
                <label>По:</label>
                <input type="date" id="analytics-end">
                <button class="checkin-save-btn" style="padding:6px 12px; font-size:12px;" id="analytics-build-btn">Построить</button>
            </div>
            <div id="charts-area"></div>
        `;
        
        modal.classList.add('active');
        
        const today = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        
        document.getElementById('analytics-end').valueAsDate = today;
        document.getElementById('analytics-start').valueAsDate = weekAgo;
        
        // Обработчик закрытия
        document.getElementById('analytics-close-btn').onclick = closeAnalytics;
        
        // Обработчик построения
        document.getElementById('analytics-build-btn').onclick = () => renderCharts(type);
        
        // Строим сразу
        setTimeout(() => renderCharts(type), 100);
    }

    function closeAnalytics() {
        const modal = document.getElementById('analytics-modal');
        if (modal) modal.classList.remove('active');
    }

    function renderCharts(type) {
        const startDate = document.getElementById('analytics-start').value;
        const endDate = document.getElementById('analytics-end').value;
        if (!startDate || !endDate) return;
        
        const area = document.getElementById('charts-area');
        area.innerHTML = '<p style="color:#999;text-align:center">Генерация графиков...</p>';
        
        setTimeout(() => {
            area.innerHTML = '';
            const history = dashState.checkinHistory || {};
            
            // Порядок строго как в HTML-форме
            const metrics = type === 'morning' 
                ? ['sleepQuality', 'energy', 'mood'] 
                : ['dayRate', 'energy', 'satisfaction', 'calm', 'habitQuality'];
                
            // Названия точно как в вопросах
            const metricNames = {
                morning: {
                    sleepQuality: 'Качество сна',
                    energy: 'Уровень энергии утром',
                    mood: 'Настрой / Мотивация'
                },
                evening: {
                    dayRate: 'Общая оценка дня',
                    energy: 'Уровень энергии сейчас',
                    satisfaction: 'Удовлетворённость результатами',
                    calm: 'Уровень спокойствия',
                    habitQuality: 'Качество выполнения привычек'
                }
            };
            
            metrics.forEach(key => {
                const container = document.createElement('div');
                container.className = 'chart-container';
                const title = metricNames[type]?.[key] || key;
                container.innerHTML = `<div class="chart-title">${title}</div><canvas id="chart-${key}" width="600" height="200"></canvas>`;
                area.appendChild(container);
                
                const dataPoints = [];
                const labels = [];
                const d = new Date(startDate);
                const end = new Date(endDate);
                
                while (d <= end) {
                    const dateStr = d.toISOString().split('T')[0];
                    const dayData = history[dateStr]?.[type];
                    if (dayData && dayData[key]) {
                        dataPoints.push(dayData[key]);
                        labels.push(d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric' }));
                    }
                    d.setDate(d.getDate() + 1);
                }
                
                if (dataPoints.length > 0) {
                    drawLineChart(`chart-${key}`, labels, dataPoints, '#111');
                } else {
                    container.innerHTML += '<p style="color:#999;text-align:center;font-size:12px">Нет данных</p>';
                }
            });
        }, 50);
    }

    function drawLineChart(canvasId, labels, data, color) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || data.length === 0) return;
        
        // Для четкости на Retina дисплеях
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        
        const w = rect.width;
        const h = rect.height;
        const padding = { top: 10, right: 10, bottom: 25, left: 25 };
        
        // Очистка
        ctx.clearRect(0, 0, w, h);
        
        const maxVal = 10;
        // Если данных мало, отступы больше, чтобы точка была по центру
        const xStep = labels.length > 1 ? (w - padding.left - padding.right) / (labels.length - 1) : (w - padding.left - padding.right);
        const yScale = (h - padding.top - padding.bottom) / maxVal;
        
        // --- Сетка (Очень тонкая) ---
        ctx.beginPath();
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 1;
        // Горизонтальные линии (5 и 10)
        const lines = [5, 10];
        lines.forEach(val => {
            const y = h - padding.bottom - (val * yScale);
            ctx.moveTo(padding.left, y);
            ctx.lineTo(w - padding.right, y);
        });
        ctx.stroke();
        
        // --- Линия графика ---
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        data.forEach((val, i) => {
            const x = padding.left + i * xStep;
            const y = h - padding.bottom - (val * yScale);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
        
        // --- Точки ---
        data.forEach((val, i) => {
            const x = padding.left + i * xStep;
            const y = h - padding.bottom - (val * yScale);
            
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.arc(x, y, 3, 0, Math.PI * 2); // Маленькие точки (радиус 3)
            ctx.fill();
            ctx.stroke();
            
            // Значение над точкой
            ctx.fillStyle = '#111';
            ctx.font = '600 10px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(val, x, y - 8);
        });
        
        // --- Ось X (Даты) ---
        ctx.fillStyle = '#999';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        // Рисуем даты, но не слишком часто
        const step = Math.ceil(labels.length / 7); 
        labels.forEach((label, i) => {
            if (i % step === 0 || i === labels.length - 1) {
                const x = padding.left + i * xStep;
                ctx.fillText(label, x, h - 5);
            }
        });
    }
    // === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ===
    window.dashState = dashState;
    window.saveProgress = saveProgress;
    window.updateProgressUI = updateProgressUI;
    window.getLevelStats = getLevelStats;

    // === КНОПКИ ПЕРЕКЛЮЧЕНИЯ ===
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    // === ЗАПУСК ===
    init();
});
