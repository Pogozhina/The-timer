// Находим элементы на странице
const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

let intervalId;

// Создаем функцию для создания анимации таймера
const createTimerAnimator = () => {
   // Функция-аниматор таймера
   return (seconds) => {
      clearInterval(intervalId);
      const startTime = Date.now();
      const endTime = startTime + seconds * 1000;

      intervalId = setInterval(() => {
         const remainingTime = Math.max(endTime - Date.now(), 0);
         const date = new Date(remainingTime);
         const hours = date.getUTCHours().toString().padStart(2, "0");
         const minutes = date.getUTCMinutes().toString().padStart(2, "0");
         const seconds = date.getUTCSeconds().toString().padStart(2, "0");
         timerEl.textContent = `${hours}:${minutes}:${seconds}`;

         if (remainingTime === 0) {
            clearInterval(intervalId);
         }
      }, 1000);
   };
};

// Создаем функцию-обработчик для события input
inputEl.addEventListener("input", () => {
   // Валидация введенного значения, обнуление поля в случае ошибки или превышения ограничения
   if (!/^\d+$/.test(inputEl.value) || inputEl.value > 86400) {
      inputEl.value = "";
   }
});

// Создаем функцию-обработчик для события click на кнопке
buttonEl.addEventListener("click", () => {
   const seconds = Number(inputEl.value);

   // Валидация введенного значения, запуск таймера в случае корректного ввода
   if (!isNaN(seconds) && seconds > 0 && seconds <= 86400) {
      // Создание функции-аниматора и запуск таймера
      const animateTimer = createTimerAnimator();
      animateTimer(seconds);

      // Очистка поля ввода
      inputEl.value = "";

      // Вывод отладочной информации
      console.log(`Таймер запущен на ${seconds} секунд.`);
   } else {
      // Обработка ошибки некорректного ввода
      timerEl.textContent = "00:00:00";
      inputEl.value = "";

      // Вывод отладочной информации
      console.error(`Ошибка ввода: "${inputEl.value}" не является корректным числом.`);
   }
});

// Создаем функцию-обработчик для события keypress на поле ввода
inputEl.addEventListener("keypress", (event) => {
   // Если нажат Enter, то вызываем функцию-обработчик для события click на кнопке
   if (event.key === "Enter") {
      buttonEl.click();
   }
});
