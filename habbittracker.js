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

    // === НОВАЯ БАЗА ДАННЫХ (Утвержденные привычки) ===
    const goalHabits = {
        // АТЛЕТ
        energy: ['Стакан воды натощак', '10 приседаний перед завтраком', '3 глубоких вдоха перед едой'],
        body: ['10 отжиманий сразу после пробуждения', '1 минута планки перед сном', 'Растяжка шеи и плеч (2 мин)'],
        health: ['Почистить зубы нитью', 'Гимнастика для глаз (20 сек вдаль)', 'Заменить сладкий чай на воду (1 раз)'],
        sport: ['1 мин суставной разминки', 'Замерить утренний пульс', 'Написать план тренировки на завтра'],
        discipline: ['Записать 3 главные задачи на завтра', 'Убрать рабочий стол перед сном', 'Вычеркнуть выполненное из списка'],
        flex: ['Наклоны к ногам (достать до пола)', 'Вращения плечами и шеей (1 мин)', 'Растяжка грудных мышц в дверном проеме'],
        recovery: ['Убрать телефон за 30 мин до сна', 'Записать 3 вещи, за которые благодарен', 'Почитать бумажную книгу 5 минут'],
        
        // СТУДЕНТ
        expert: ['Выписать 1 ключевой термин', 'Послушать 2 мин тематического подкаста', 'Пересказать вслух 1 изученный факт'],
        lang: ['Выучить 3 новых слова (карточки)', 'Прочитать 1 короткий пост на языке', 'Написать 1 предложение в дневнике'],
        focus: ['Написать 1 главную задачу на стикере', 'Запустить таймер на 15 мин работы', 'Сделать 3 глубоких вдоха перед стартом'],
        creative: ['Придумать 3 альтернативных решения', 'Написать 5 слов-ассоциаций', 'Задать себе вопрос «А что если…?»'],
        career: ['Посмотреть 1 вакансию мечты (анализ)', 'Записать 1 профессиональное достижение', 'Открыть профиль эксперта и изучить 1 пост'],
        memory: ['Прочитать абзац, ведя пальцем по строке', 'Запомнить 5 цифр/слов и повторить', 'Визуализировать прочитанное (закрыть глаза)'],
        system: ['Почистить фотогалерею (удалить 10 фото)', 'Написать 2 главные задачи на завтра', 'Прибрать рабочий стол в конце дня'],
        
        // МОНАХ
        silence: ['Посидеть 1 минуту в полной тишине', 'Выписать все мысли на лист (2 мин)', 'Отключить звук на телефоне на 15 минут'],
        aware: ['Сделать первый глоток кофе/чая осознанно', 'Задать себе вопрос: «Где я сейчас?»', 'Посмотреть на свое отражение и улыбнуться'],
        detox: ['Удалить 1 приложение, которое не нужно', 'Не брать телефон в туалет', 'Заменить 5 мин скроллинга на взгляд в окно'],
        emotion: ['Записать 1 эмоцию, которую чувствуешь', 'Сжать и разжать кулаки 5 раз', 'Улыбнуться незнакомцу или коллеге'],
        spirit: ['Спросить себя: «Кто я без своей работы?»', 'Поблагодарить тело за работу', 'Вспомнить свою главную ценность на сегодня'],
        minim: ['Протереть 1 полку или поверхность', 'Надеть простую одежду (без логотипов)', 'Сказать «Нет» одной лишней просьбе'],
        nature: ['Посмотреть на небо 30 секунд', 'Потрогать дерево или растение', 'Послушать пение птиц или шум ветра']
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

    // === МАППИНГ ЦЕЛЕЙ К ИДЕНТИЧНОСТЯМ ===
const goalIdentityMap = {
    // Атлет
    energy: 'athlete',
    body: 'athlete',
    health: 'athlete',
    sport: 'athlete',
    discipline: 'athlete',
    flex: 'athlete',
    recovery: 'athlete',
    
    // Студент
    expert: 'student',
    lang: 'student',
    focus: 'student',
    creative: 'student',
    career: 'student',
    memory: 'student',
    system: 'student',
    
    // Монах
    silence: 'monk',
    aware: 'monk',
    detox: 'monk',
    emotion: 'monk',
    spirit: 'monk',
    minim: 'monk',
    nature: 'monk'
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

    // === РАСЧЁТ ДОСТУПНЫХ СЛОТОВ ПРИВЫЧЕК ===
    function getMaxHabitsForLevel(level) {
        if (level >= 11) return 8;
        if (level >= 9) return 7;
        if (level >= 7) return 6;
        if (level >= 5) return 5;
        if (level >= 3) return 4;
        return 3; // Базово на уровне 1
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
        window.dashState = dashState;
        
        // ← ВОССТАНАВЛИВАЕМ selectedIdentity и selectedGoals
        selectedIdentity = dashState.identity;
        
        // Восстанавливаем выбранные цели из сохранённых привычек
        selectedGoals[dashState.identity] = [...new Set(dashState.habits.map(h => h.id))];
        
        // Визуально отмечаем идентичность как активную (если мы на экране выбора)
        const identityItem = document.querySelector(`.identity-item[data-id="${dashState.identity}"]`);
        if (identityItem && identityScreen.classList.contains('visible')) {
            identityItem.classList.add('active');
            updateConfirmButton(identityItem);
        }
        
        checkNewDay();
        showDashboard();
    } else {
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

    // === ПЕРЕХОД С ИНТРО -> ВЫБОР ИДЕНТИЧНОСТИ ===
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

    // === ЛОГИКА ИДЕНТИЧНОСТЕЙ ===
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

    // === ЛОГИКА ВЫБОРА ЦЕЛЕЙ ===
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

    // === ПЕРЕХОД ИДЕНТИЧНОСТЬ -> ЭВОЛЮЦИЯ ===
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

    // === ФИНАЛЬНОЕ ПОДТВЕРЖДЕНИЕ ===
    evoFinalConfirm.addEventListener('click', () => {
        console.log('🔘 Кнопка "зафиксировать путь" нажата');

        let activeItem = document.querySelector('.identity-item.active');
        if (!activeItem && selectedIdentity) {
            activeItem = document.querySelector(`.identity-item[data-id="${selectedIdentity}"]`);
        }

        if (!activeItem) {
            console.error('❌ ОШИБКА: Не найдена активная идентичность');
            alert('Ошибка: Потеряна связь с выбранной ролью.');
            return;
        }

        const identityId = activeItem.dataset.id;
        const activeNameEl = activeItem.querySelector('.identity-name');
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
            const transform = track.style.transform;
            const match = transform ? transform.match(/-(\d+)%/) : null;
            const percent = match ? parseInt(match[1]) : 0;
            const index = percent / 100;
            const habitText = options[index] ? options[index].textContent : (options[0] ? options[0].textContent : 'Ошибка');

            return { id: goalId, text: habitText, completed: false };
        }).filter(h => h !== null);

        evolutionScreen.classList.remove('visible');
        loadingOverlay.classList.add('active');

        setTimeout(() => {
            dashState = {
                identity: identityId,
                identityName: activeNameEl ? activeNameEl.textContent : 'Пользователь',
                level: 1,
                currentXP: 0,
                habits: finalHabits,
                lastActiveDate: new Date().toISOString().split('T')[0]
            };
            saveProgress();
            loadingOverlay.classList.remove('active');
            showDashboard();
        }, 1500);
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
        const maxHabits = getMaxHabitsForLevel(dashState.level);
        const currentHabits = dashState.habits.length;
    
        // 1. Заполненные привычки
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
    
        // 2. Пустые РАЗБЛОКИРОВАННЫЕ слоты (кликабельные!)
        const emptyUnlockedSlots = maxHabits - currentHabits;
        for (let i = 0; i < emptyUnlockedSlots; i++) {
            const row = document.createElement('div');
            row.className = 'dash-habit-row dash-habit-empty unlocked';
            row.innerHTML = `
                <span class="dash-habit-text">Добавить привычку</span>
                <span class="lock-icon-right">🔓</span>
            `;
            // ← ВКЛЮЧАЕМ КЛИК!
            row.addEventListener('click', () => openHabitSelector());
            list.appendChild(row);
        }
    
        // 3. Заблокированные слоты
        const totalSlots = 8;
        const lockedSlots = totalSlots - maxHabits;
        for (let i = 0; i < lockedSlots; i++) {
            const slotNumber = maxHabits + i + 1;
            let unlockLevel = 0;
            if (slotNumber === 4) unlockLevel = 3;
            else if (slotNumber === 5) unlockLevel = 5;
            else if (slotNumber === 6) unlockLevel = 7;
            else if (slotNumber === 7) unlockLevel = 9;
            else if (slotNumber === 8) unlockLevel = 11;
            
            const row = document.createElement('div');
            row.className = 'dash-habit-row dash-habit-empty locked';
            row.innerHTML = `
                <span class="dash-habit-text">Уровень ${unlockLevel}</span>
                <span class="lock-icon-right">🔒</span>
            `;
            list.appendChild(row);
        }
    }

    // === МОДАЛЬНОЕ ОКНО ВЫБОРА ПРИВЫЧКИ ===
    function openHabitSelector() {
        const modal = document.getElementById('habit-selector-modal');
        const list = document.getElementById('habit-selector-list');
        const subtitle = document.querySelector('.habit-selector-subtitle');
        const closeBtn = document.getElementById('habit-selector-close');
        
        if (!modal || !list) return;
        
        const identityId = dashState.identity;
        const availableHabits = [];
        
        // ← СОБИРАЕМ ВСЕ привычки этой идентичности (не только выбранные цели!)
        for (const [goalId, habits] of Object.entries(goalHabits)) {
            // Проверяем, принадлежит ли цель текущей идентичности
            if (goalIdentityMap[goalId] === identityId) {
                habits.forEach(habitText => {
                    // Не добавляем если уже есть в dashState
                    const alreadyAdded = dashState.habits.some(h => h.text === habitText);
                    if (!alreadyAdded) {
                        availableHabits.push({
                            goalId: goalId,
                            text: habitText
                        });
                    }
                });
            }
        }
        
        subtitle.textContent = `доступно ${availableHabits.length} вариантов`;
        
        list.innerHTML = '';
        if (availableHabits.length === 0) {
            list.innerHTML = '<div style="text-align:center;color:#999;padding:20px;">Все привычки уже добавлены!</div>';
        } else {
            // Сортируем по алфавиту для удобства
            availableHabits.sort((a, b) => a.text.localeCompare(b.text));
            
            availableHabits.forEach(habit => {
                const option = document.createElement('div');
                option.className = 'habit-option';
                option.textContent = habit.text;
                option.addEventListener('click', () => {
                    addNewHabit(habit);
                    closeModal();
                });
                list.appendChild(option);
            });
        }
        
        modal.classList.add('active');
        
        // Кнопка крестик
        if (closeBtn) {
            closeBtn.onclick = closeModal;
        }
        
        // Клик вне окна
        modal.onclick = (e) => { if (e.target === modal) closeModal(); };
        
        // Esc
        document.addEventListener('keydown', handleEsc);
    }

function closeModal() {
    const modal = document.getElementById('habit-selector-modal');
    if (modal) modal.classList.remove('active');
    document.removeEventListener('keydown', handleEsc);
}

function handleEsc(e) {
    if (e.key === 'Escape') closeModal();
}

function addNewHabit(habit) {
    // Добавляем привычку в dashState
    dashState.habits.push({
        id: habit.goalId,
        text: habit.text,
        completed: false
    });
    
    // Сохраняем
    saveProgress();
    
    // Обновляем дашборд
    renderDashboardHabits();
    updateProgressUI();
    
    // Добавляем класс анимации к новому элементу
    setTimeout(() => {
        const list = document.getElementById('dash-habit-list');
        const lastItem = list.lastElementChild;
        if (lastItem && lastItem.classList.contains('unlocked')) {
            // Это был пустой слот, теперь он заполнен
            renderDashboardHabits(); // Перерисовываем всё
        }
    }, 100);
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
            setTimeout(() => { levelEl.style.transform = "scale(1)"; }, 300);

            showLevelUpAnimation(dashState.level);
            
            renderDashboardHabits();
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
        if(confirm('Сбросить весь прогресс?')) {
            localStorage.removeItem('habbittracker_progress');
            location.reload();
        }
    });

    // Кнопка назад
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

    // === АНИМАЦИЯ ПОВЫШЕНИЯ УРОВНЯ ===
const wolfImages = [
    'Sneaky wolf 1.png',
    'Sneaky wolf 2.png',
    'Sneaky wolf 3.png',
    'Sneaky wolf 4.png',
    'Sneaky wolf 5.png',
    'Sneaky wolf 6.png'
];

function showLevelUpAnimation() {
    const animation = document.getElementById('level-up-animation');
    const wolfImg = document.getElementById('level-up-wolf-img');
    
    if (!animation || !wolfImg) return;
    
    // Выбираем случайную картинку
    const randomWolf = wolfImages[Math.floor(Math.random() * wolfImages.length)];
    wolfImg.src = `pics/${randomWolf}`;
    
    // Показываем (выезжает)
    animation.classList.add('show');
    
    // Стоит 7 секунды и уезжает обратно
    setTimeout(() => {
        animation.classList.remove('show');
    }, 7000);
}

    

    // === 🎮 ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ДЛЯ ИГР ===
    window.dashState = dashState;
    window.saveProgress = saveProgress;
    window.updateProgressUI = updateProgressUI;
    window.getLevelStats = getLevelStats;
    // ===========================================

    // =========================================
    // GAMES MANAGER — МИНИ-ИГРЫ
    // =========================================
    const GamesManager = (() => {
        console.log('🎮 GamesManager загружается...');
        
        let modal, menuScreen, containerScreen, resultScreen, gameContent;
        let resultTitle, resultMessage, resultXP, gameExitBtn;
        let currentGame = null;
        let gameInterval = null;

        function init() {
            console.log('🔧 GamesManager.init() вызван');
            
            modal = document.getElementById('games-modal');
            const trigger = document.getElementById('games-trigger');
            const closeBtn = document.getElementById('games-close');
            
            if (!modal || !trigger) { console.error('❌ Не найдены элементы игр'); return; }
            
            menuScreen = document.getElementById('games-menu');
            containerScreen = document.getElementById('games-container');
            resultScreen = document.getElementById('games-result');
            gameContent = document.getElementById('game-content');
            resultTitle = document.getElementById('result-title');
            resultMessage = document.getElementById('result-message');
            resultXP = document.getElementById('result-xp');
            gameExitBtn = document.getElementById('game-exit-btn');
            
            trigger.addEventListener('click', (e) => { e.preventDefault(); openGamesMenu(); });
            closeBtn?.addEventListener('click', closeGames);
            gameExitBtn?.addEventListener('click', closeGames);
            
            document.getElementById('result-retry')?.addEventListener('click', () => startGame(currentGame));
            document.getElementById('result-menu')?.addEventListener('click', showGamesMenu);

            document.querySelectorAll('.game-card').forEach(card => {
                card.addEventListener('click', () => startGame(card.dataset.game));
            });

            modal.addEventListener('click', (e) => { if (e.target === modal) closeGames(); });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal?.classList.contains('active')) closeGames(); });
            
            console.log('✅ GamesManager инициализирован');
        }

        function openGamesMenu() { modal.classList.add('active'); showGamesMenu(); }
        function closeGames() { stopGame(); modal?.classList.remove('active'); currentGame = null; }
        function showScreen(screen) { [menuScreen, containerScreen, resultScreen].forEach(s => s?.classList.remove('active')); screen?.classList.add('active'); }
        function showGamesMenu() { stopGame(); showScreen(menuScreen); if (gameExitBtn) gameExitBtn.style.display = 'none'; }

        function startGame(gameName) {
            stopGame(); currentGame = gameName; showScreen(containerScreen); gameContent.innerHTML = '';
            if (gameExitBtn) gameExitBtn.style.display = 'flex';
            
            switch(gameName) {
                case 'count': initCountGame(); break;
                case 'memory': initMemoryGame(); break;
                case 'words': initWordsGame(); break;
            }
        }

        function stopGame() { if (gameInterval) { clearInterval(gameInterval); gameInterval = null; } }

        function finishGame(xp, message, details = {}) {
            stopGame();
            const earnedXP = Math.max(1, Math.min(10, xp));
            resultTitle.textContent = 'Результат';
            resultMessage.innerHTML = `${message}${details.extra ? `<br><small style="color:#888">${details.extra}</small>` : ''}`;
            resultXP.textContent = `+${earnedXP} XP`;
            showScreen(resultScreen);
            
            if (window.dashState) {
                window.dashState.currentXP += earnedXP;
                const stats = window.getLevelStats?.(window.dashState.level) || { xpNeeded: 15 };
                if (window.dashState.currentXP >= stats.xpNeeded) { window.dashState.level++; window.dashState.currentXP = 0; }
                window.saveProgress?.();
                window.updateProgressUI?.();
            }
        }

        // === ИГРА 1: ПОСЧИТАЙ ===
        function initCountGame() {
            gameContent.innerHTML = `
                <div class="game-setup" id="count-setup">
                    <h3>Выбери сложность</h3>
                    <button class="difficulty-btn" data-diff="1">1-9</button>
                    <button class="difficulty-btn" data-diff="2">10-99</button>
                    <button class="difficulty-btn" data-diff="3">100-999</button>
                </div>
                <div class="game-area" id="count-area" style="display:none">
                    <div class="game-timer" id="count-timer">60</div>
                    <div class="game-equation" id="count-equation"></div>
                    <input type="number" class="game-input" id="count-input" placeholder="?" autocomplete="off">
                </div>`;

            let difficulty = 1, timer = 60, correct = 0, total = 0, currentEq = null;

            function getRandom(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
            function generate() {
                const ranges = {1:[1,9], 2:[10,99], 3:[100,999]};
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
                gameInterval = setInterval(() => { timer--; document.getElementById('count-timer').textContent = timer; if (timer <= 0) endGame(); }, 1000);
            }
            function endGame() { clearInterval(gameInterval); finishGame(correct, `Правильных ответов: ${correct} из ${total}`); }

            document.querySelectorAll('#count-setup .difficulty-btn').forEach(btn => btn.addEventListener('click', (e) => start(parseInt(e.target.dataset.diff))));
            document.getElementById('count-input')?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && currentEq) {
                    const ans = parseInt(e.target.value);
                    if (!isNaN(ans)) {
                        total++; const isCorrect = (ans === currentEq.result);
                        if (isCorrect) { correct++; document.getElementById('count-area').style.backgroundColor = '#e8f5e9'; }
                        else { document.getElementById('count-area').style.backgroundColor = '#ffebee'; }
                        setTimeout(() => { document.getElementById('count-area').style.backgroundColor = ''; }, 300);
                        showEq();
                    }
                }
            });
            start(1);
        }

        // === ИГРА 2: НАЙДИ ПАРУ ===
        function initMemoryGame() {
            const allCardImages = ['Буби 2.png','Буби 3.png','Буби 4.png','Буби 5.png','Буби 6.png','Буби 7.png','Буби 8.png','Буби 9.png','Буби 10.png','Буби Валет.png','Буби Дама.png','Буби Король.png','Буби Туз.png','Пики 2.png','Пики 3.png','Пики 4.png','Пики 5.png','Пики 6.png','Пики 7.png','Пики 8.png','Пики 9.png','Пики 10.png','Пики Валет.png','Пики Дама.png','Пики Король.png','Пики Туз.png','Трефы 2.png','Трефы 3.png','Трефы 4.png','Трефы 5.png','Трефы 6.png','Трефы 7.png','Трефы 8.png','Трефы 9.png','Трефы 10.png','Трефы Валет.png','Трефы Дама.png','Трефы Король.png','Трефы Туз.png','Черви 2.png','Черви 3.png','Черви 4.png','Черви 5.png','Черви 6.png','Черви 7.png','Черви 8.png','Черви 9.png','Черви 10.png','Черви Валет.png','Черви Дама.png','Черви Король.png','Черви Туз.png'];
            const selectedImages = [...allCardImages].sort(() => Math.random() - 0.5).slice(0, 12);
            let cards = [], flipped = [], matchedPairs = 0, moves = 0, canFlip = true;

            const gameGrid = document.createElement('div');
            gameGrid.id = 'game-grid';
            gameGrid.style.cssText = 'grid-template-columns: repeat(6, 1fr); width: 100%; max-width: 100%; gap: 0;';
            gameContent.appendChild(gameGrid);

            function createCards() { cards = [...selectedImages, ...selectedImages].map((img, i) => ({ id: i, img, flipped: false, matched: false })).sort(() => Math.random() - 0.5); }
            function render() {
                gameGrid.innerHTML = '';
                cards.forEach(card => {
                    const el = document.createElement('div');
                    el.className = `card${card.flipped || card.matched ? ' flipped' : ''}${card.matched ? ' matched' : ''}`;
                    el.dataset.id = card.id;
                    const back = document.createElement('div'); back.className = 'card-back'; back.innerHTML = '<span style="font-size:24px;color:#888">?</span>'; el.appendChild(back);
                    const img = document.createElement('img'); img.src = `pics/${card.img}`; img.alt = ''; img.draggable = false;
                    img.onerror = () => { img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23ddd" width="100" height="100"/></svg>'; };
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
                            if (matchedPairs === 12) { clearInterval(gameInterval); endGame(); }
                        } else { flipped.forEach(c => c.flipped = false); }
                        flipped = []; canFlip = true; render();
                    }, 500);
                }
            }
            function endGame() { const xp = Math.max(1, Math.round(matchedPairs * 0.83)); finishGame(xp, `Пар найдено: ${matchedPairs} из 12`, `Ходов: ${moves}`); }
            createCards(); render();
        }

        // === ИГРА 3: ПОВТОРИ 10 СЛОВ ===
        function initWordsGame() {
            const allWords = ["яблоко","машина","дом","книга","ручка","солнце","вода","дерево","окно","стул","стол","кошка","собака","цветок","птица","небо","облако","лес","озеро","река","камень","песок","море","снег","дождь","ветер","луна","звезда","свет","тень","путь","дверь","замок","ключ","часы","телефон","ноутбук","клавиатура","мышь","экран","зеркало","картина","стена","крыша","крыло","хвост","лапа","нос","глаз","рот","ухо","волос","кожа","платье","рубашка","ботинок","сапог","шляпа","очки","сумка","портфель","карандаш","тетрадь","доска","мел","сцена","актер","роль","театр","музыка","песня","танец","праздник","рождение","день","ночь","сон","мысль","чувство","ум","сердце","рука","нога","голова","тело","жизнь","смерть","время","история","мир","война","дружба","любовь","ненависть","радость","печаль","страх","надежда","вера"];
            let targetWords = [], entered = [], memorizeTime = 20, guessTime = 60, phase = 'memorize';

            gameContent.innerHTML = `<div class="game-timer" id="words-timer">${memorizeTime}</div><div id="words-display"></div><div id="words-input-area" style="display:none"><input type="text" class="game-input" id="words-input" placeholder="Введи слово и нажми Enter" autocomplete="off"><div class="word-placeholders" id="words-placeholders"></div></div>`;

            function getRandomWords(n) { return [...allWords].sort(() => Math.random() - 0.5).slice(0, n); }
            function setupPlaceholders() { const container = document.getElementById('words-placeholders'); container.innerHTML = ''; targetWords.forEach((_, i) => { const ph = document.createElement('div'); ph.className = 'word-placeholder'; ph.id = `ph-${i}`; container.appendChild(ph); }); }
            function start() {
                targetWords = getRandomWords(10); entered = []; phase = 'memorize'; memorizeTime = 20;
                document.getElementById('words-display').textContent = targetWords.join(', ');
                document.getElementById('words-input-area').style.display = 'none';
                document.getElementById('words-timer').textContent = memorizeTime; setupPlaceholders();
                gameInterval = setInterval(() => {
                    if (phase === 'memorize') { memorizeTime--; document.getElementById('words-timer').textContent = memorizeTime; if (memorizeTime <= 0) { phase = 'guess'; guessTime = 60; document.getElementById('words-display').style.visibility = 'hidden'; document.getElementById('words-input-area').style.display = 'block'; document.getElementById('words-input').focus(); document.getElementById('words-timer').textContent = guessTime; } }
                    else { guessTime--; document.getElementById('words-timer').textContent = guessTime; if (guessTime <= 0) endGame(); }
                }, 1000);
            }
            function endGame() { clearInterval(gameInterval); const correct = targetWords.filter(w => entered.includes(w)).length; const missed = targetWords.filter(w => !entered.includes(w)); let extra = ''; if (missed.length > 0) extra = `Не введено: ${missed.slice(0,3).join(', ')}${missed.length>3?'...':''}`; finishGame(correct, `Угадано слов: ${correct} из 10`, extra); }
            document.getElementById('words-input')?.addEventListener('keypress', (e) => { if (e.key === 'Enter' && phase === 'guess') { const word = e.target.value.trim().toLowerCase(); e.target.value = ''; if (word && !entered.includes(word)) { entered.push(word); const idx = targetWords.indexOf(word); if (idx >= 0) {
                const ph = document.getElementById(`ph-${idx}`);
                if (ph) {
                    ph.classList.add('filled');
                    ph.textContent = word;  // ← ДОБАВЛЯЕМ ТЕКСТ!
                }
            } if (targetWords.every(w => entered.includes(w))) endGame(); } } });
            start();
        }

        return { init };
    })();

    // Запуск приложения
    init();
    // Инициализация игр
    if (typeof GamesManager !== 'undefined') GamesManager.init();
});
