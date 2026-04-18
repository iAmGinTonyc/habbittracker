document.addEventListener('DOMContentLoaded', () => {
    // === ЭЛЕМЕНТЫ ===
    const introScreen = document.getElementById('intro-screen');
    const introText = document.getElementById('intro-text');
    const identityScreen = document.getElementById('identity-screen');
    const headers = document.querySelectorAll('.identity-header');
    
    // === СОСТОЯНИЕ ===
    let selectedIdentity = null;
    let selectedHabits = {
        athlete: [],
        student: [],
        monk: []
    };

    // === 3 УМНЫХ ФРАЗЫ ===
    const phrases = [
        "Повторение — это не рутина. Это ритм, в котором рождается мастерство.",
        "Ты не становишься кем-то за один день. Каждое действие — это голос за того, кем ты хочешь стать.",
        "Дисциплина — это не ограничение свободы. Это путь к ней."
    ];

    let currentPhraseIndex = 0;
    let isTransitioning = false;

    // === ФУНКЦИЯ СМЕНЫ ФРАЗ ===
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

    // === АВТО-СМЕНА КАЖДЫЕ 7 СЕКУНД ===
    const phraseInterval = setInterval(changePhrase, 5000);

    // === ПЕРЕХОД К ВЫБОРУ ИДЕНТИЧНОСТИ ===
    introScreen.addEventListener('click', () => {
        clearInterval(phraseInterval);
        
        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.style.display = 'none';
            identityScreen.classList.add('visible');
        }, 1200);
    });

    // === ЛОГИКА АККОРДЕОНА ИДЕНТИЧНОСТЕЙ ===
    headers.forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const parentItem = header.parentElement;
            const identityId = header.dataset.id;
            const isActive = parentItem.classList.contains('active');

            // Если кликнули на уже активную — просто закрываем
            if (isActive) {
                parentItem.classList.remove('active');
                selectedIdentity = null;
                return;
            }

            // Закрываем все блоки
            document.querySelectorAll('.identity-item').forEach(item => {
                item.classList.remove('active');
            });

            // Открываем новый
            parentItem.classList.add('active');
            selectedIdentity = identityId;
            
            // Обновляем отображение счётчика
            updateSelectionInfo();
        });
    });

    // === ЛОГИКА ВЫБОРА ПРИВЫЧЕК ===
    document.querySelectorAll('.habit').forEach(habit => {
        habit.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const parentItem = habit.closest('.identity-item');
            const identityId = parentItem.querySelector('.identity-header').dataset.id;
            const habitId = habit.dataset.habit;
            
            // Если привычка уже выбрана — снимаем выбор
            if (habit.classList.contains('selected')) {
                habit.classList.remove('selected');
                selectedHabits[identityId] = selectedHabits[identityId].filter(h => h !== habitId);
            } else {
                // Если ещё не выбрано 3 привычки
                if (selectedHabits[identityId].length < 3) {
                    habit.classList.add('selected');
                    selectedHabits[identityId].push(habitId);
                }
            }
            
            // Обновляем состояние disabled для остальных привычек
            updateHabitStates(parentItem);
            
            // Обновляем счётчик
            updateSelectionInfo();
        });
    });

    // Обновление состояния привычек (disabled если уже 3 выбрано)
    function updateHabitStates(parentItem) {
        const identityId = parentItem.querySelector('.identity-header').dataset.id;
        const habits = parentItem.querySelectorAll('.habit');
        
        habits.forEach(habit => {
            if (!habit.classList.contains('selected') && selectedHabits[identityId].length >= 3) {
                habit.classList.add('disabled');
            } else {
                habit.classList.remove('disabled');
            }
        });
    }

    // Обновление информации о выборе
    function updateSelectionInfo() {
        document.querySelectorAll('.identity-item').forEach(item => {
            const identityId = item.querySelector('.identity-header').dataset.id;
            const countSpan = item.querySelector('.selection-info .count');
            const count = selectedHabits[identityId].length;
            countSpan.textContent = count;
        });
    }

    // Клик вне заголовков закрывает всё
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.identity-header') && !e.target.closest('.habit')) {
            document.querySelectorAll('.identity-item').forEach(item => {
                item.classList.remove('active');
            });
            selectedIdentity = null;
        }
    });
});