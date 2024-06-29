document.addEventListener("DOMContentLoaded", () => {
  const scrollToAboutTestBtn = document.querySelectorAll(
    ".scroll-to-about-test"
  );
  scrollToAboutTestBtn.forEach((item) => {
    item.addEventListener("click", function () {
      const aboutTestSection = document.getElementById("about-test");
      if (aboutTestSection) {
        aboutTestSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const menuIcon = document.querySelector(".menu-icon");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileClose = document.querySelector(".mobile-menu__close");
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A6",
    "#A633FF",
    "#33FFF4",
    "#FFC733",
    "#8B33FF",
    "#FF5733",
  ];

  menuIcon.addEventListener("click", function () {
    mobileMenu.classList.add("open");
    document.body.style.overflow = "hidden";
  });
  mobileClose.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      mobileMenu.style.display = "none";
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  const headerBtns = document.querySelectorAll(".header-btn");
  headerBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  const main = document.querySelector(".main");
  const qibtn = document.querySelectorAll(".iq-btn");
  const mainContent = document.querySelector(".main-content");
  let sidebarFill;

  function sidebar() {
    const container = document.createElement("div");
    container.className = "container";

    const bar = document.createElement("div");
    bar.className = "sidebar";

    sidebarFill = document.createElement("div");
    sidebarFill.className = "sidebar-fill";
    bar.append(sidebarFill);

    container.append(bar);
    main.append(container);
  }

  function addFill(percentToAdd) {
    const currentWidth = sidebarFill.offsetWidth;
    const maxWidth = sidebarFill.parentElement.offsetWidth;
    const newWidth = currentWidth + (maxWidth * percentToAdd) / 100;

    sidebarFill.style.width = `${Math.min(newWidth, maxWidth)}px`;
  }

  function testPage(
    titleText,
    radioOptions,
    nextPageFunction,
    fillPercent,
    imageUrl = ""
  ) {
    const test = document.querySelector(".test-iq");
    const title = document.createElement("h2");
    title.className = "test-iq__title";
    title.textContent = titleText;

    const image = document.createElement("img");
    image.className = "image-iq";
    image.src = imageUrl;

    const testChoice = document.createElement("div");
    testChoice.className = "test-iq__choice";

    radioOptions.forEach((option) => {
      const container = document.createElement("div");
      container.className = "container";

      const inputGroup = document.createElement("div");
      inputGroup.className = "input-group";
      const radioInput = document.createElement("input");
      radioInput.className = "radio";
      radioInput.type = "radio";
      radioInput.id = option.id;
      radioInput.name = "check";
      const label = document.createElement("label");
      label.className = "label";
      label.setAttribute("for", option.id);
      label.textContent = option.label;
      container.append(radioInput);
      container.append(label);

      inputGroup.append(container);
      testChoice.append(inputGroup);

      radioInput.addEventListener("change", () =>
        handleRadioChange(inputGroup)
      );
    });

    const btn = document.createElement("button");
    btn.className = "next-btn iq-btn";
    btn.textContent = "ДАЛЕЕ";
    btn.disabled = true;

    function handleRadioChange(selectedInputGroup) {
      const radioButtons = Array.from(
        testChoice.querySelectorAll('input[type="radio"]')
      );

      radioButtons.forEach((radio) => {
        const parentInputGroup = radio.closest(".input-group");
        if (parentInputGroup) {
          parentInputGroup.classList.remove("checked");
        }
      });

      selectedInputGroup.classList.add("checked");

      const anyChecked = radioButtons.some((input) => input.checked);
      btn.disabled = !anyChecked;
    }

    test.innerHTML = "";
    test.append(title);
    test.append(image);
    test.append(testChoice);
    test.append(btn);

    btn.addEventListener("click", nextPageFunction);

    addFill(fillPercent);
  }

  function createTest() {
    const test = document.createElement("div");
    test.className = "test-iq iq-content";
    main.append(test);
    createPage1();
  }

  function createPage1() {
    const radioOptions = [
      { id: "male", label: "Мужчина" },
      { id: "female", label: "Женщина" },
    ];
    testPage("Ваш пол:", radioOptions, createPage2, 9);
  }

  function createPage2() {
    const radioOptions = [
      { id: "1", label: "До 18" },
      { id: "2", label: "От 18 до 28" },
      { id: "3", label: "От 29 до 35" },
      { id: "4", label: "От 36" },
    ];
    testPage("укажите ваш возраст:", radioOptions, createPage3, 9);
  }

  function createPage3() {
    const radioOptions = [
      { id: "1", label: "Дом" },
      { id: "2", label: "Шалаш" },
      { id: "3", label: "Бунгало" },
      { id: "4", label: "Скамейка" },
      { id: "5", label: "Хижина" },
    ];
    testPage("Выберите лишнее:", radioOptions, createPage4, 9);
  }

  function createPage4() {
    const radioOptions = [
      { id: "1", label: "62" },
      { id: "2", label: "48" },
      { id: "3", label: "74" },
      { id: "4", label: "57" },
      { id: "5", label: "60" },
      { id: "6", label: "77" },
    ];
    testPage(
      "Продолжите числовой ряд: 18  20  24  32",
      radioOptions,
      createPage5,
      9
    );
  }

  function createPage5() {
    createPageColor(
      "Выберите цвет, который сейчас наиболее Вам приятен:",
      colors,
      () => {
        createPage6();
      },
      9
    );
  }
  function createPage6() {
    createPageColor(
      "Отдохните пару секунд, еще раз Выберите цвет, который сейчас наиболее Вам приятен:",
      colors,
      () => {
        createPage7();
      },
      9
    );
  }
  function createPage7() {
    const radioOptions = [
      { id: "1", label: "Вашингтон" },
      { id: "2", label: "Лондон" },
      { id: "3", label: "Париж" },
      { id: "4", label: "Нью-Йорк" },
      { id: "5", label: "Москва" },
      { id: "6", label: "Оттава" },
    ];
    testPage("Какой из городов лишний?", radioOptions, createPage8, 9);
  }

  function createPage8() {
    const buttonOptions = [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "3", value: "4" },
    ];

    createTestImage(
      "Выберите правильную фигуру из четырёх пронумерованных.",
      "./image/iq-img-1.png",
      buttonOptions,
      () => {
        createPage9();
      },
      9
    );
  }

  function createPage9() {
    const radioOptions = [
      { id: "1", label: "Наслаждаться каждой минутой проведенного времени" },
      { id: "2", label: "Быть устремленными мыслями в будущее" },
      { id: "3", label: "Учитывать в ежедневной практике прошлый опыт" },
    ];
    testPage("Вам привычнее и важнее:", radioOptions, createPage10, 9);
  }

  function createPage10() {
    const radioOptions = [
      { id: "1", label: "Оно остроконечное" },
      { id: "2", label: "Оно устойчиво" },
      { id: "3", label: "оно-находится в состоянии равновесия" },
    ];
    testPage(
      "Какое определение, по-Вашему, больше подходит к этому геометрическому изображению: ",
      radioOptions,
      createPage11,
      9,
      "./image/iq-img-2.png"
    );
  }

  function createPage11() {
    const buttonOptions = [
      { label: "1", value: "34" },
      { label: "2", value: "36" },
      { label: "3", value: "53" },
      { label: "4", value: "44" },
      { label: "5", value: "66" },
      { label: "6", value: "42" },
    ];

    createTestImage(
      "Вставьте подходящее число",
      "./image/iq-img-3.png",
      buttonOptions,
      () => {
        createLoadingTest(createResultedTest, 9);
      },
      9
    );
  }

  function createLoadingTest(nextPageFunction, fillPercent) {
    const test = document.querySelector(".test-iq");
    const title = document.createElement("h2");
    title.className = "test-load__title";
    title.textContent = "Обработка результатов";

    const image = document.createElement("img");
    image.className = "image-iq load-image";
    image.src = "./image/load.png";

    const subtitle = document.createElement("h2");
    subtitle.className = "test-load__subtitle";
    subtitle.textContent = "Определение стиля мышления...........";

    const container = document.createElement("div");
    container.className = "container";

    test.innerHTML = "";
    test.append(title);
    test.append(image);
    test.append(subtitle);

    setTimeout(() => {
      nextPageFunction();
    }, 3000);

    addFill(fillPercent);
  }

  async function getUser() {
    const response = await fetch("https://swapi.dev/api/people/1");
    const data = await response.json();
    return data;
  }

  function createResultedTest() {
    const container = document.createElement("div");
    container.className = "container";

    const resultContent = document.createElement("div");
    resultContent.className = "iq-content";

    const title = document.createElement("h2");
    title.className = "test-result__title";
    title.textContent = "Ваш результат рассчитан:";

    const subtitle = document.createElement("p");
    subtitle.className = "test-result__subtitle";
    subtitle.textContent =
      "вы относитесь к 3% респондентов, чей уровень интеллекта более чем на 15 пунктов отличается от среднего в большую или меньшую сторону! ";

    const text = document.createElement("p");
    text.className = "test-result__text";
    text.textContent = "СКОРЕЕ ПОЛУЧИТЕ СВОЙ РЕЗУЛЬТАТ!";

    const textBlock = document.createElement("div");
    textBlock.className = "test-result__block";

    const blockText = document.createElement("p");
    blockText.className = "test-result__block-text";
    blockText.textContent =
      "В целях защиты персональных данных результат теста, их подробная интерпретация и рекомендации доступны в виде голосового сообщения по звонку с вашего мобильного телефона";

    const timerText = document.createElement("p");
    timerText.className = "test-result__timer-text";
    timerText.textContent = "Звоните скорее, запись доступна всего 5 минут";

    textBlock.append(blockText);

    const resultBtn = document.createElement("button");
    resultBtn.className = "test-result__btn";
    resultBtn.textContent = "позвонить и прослушать результат ";

    const image = document.createElement("img");
    image.className = "image-iq call-image";
    image.src = "./image/call.png";

    resultBtn.append(image);

    resultBtn.addEventListener("click", () => {
      getUser().then((data) => {
        const name = data.name;

        const resultName = document.createElement("p");
        resultName.textContent = name;
        resultName.className = "test-result__result-name";

        resultContent.append(resultName);
      });
    });

    main.innerHTML = "";
    resultContent.append(title);
    resultContent.append(subtitle);
    resultContent.append(text);
    resultContent.append(textBlock);
    resultContent.append(timerText);
    resultContent.append(resultBtn);
    container.append(resultContent);
    main.append(container);

    startTimer(timerText, 10 * 60);
  }

  function startTimer(element, duration) {
    let timer = duration,
      minutes,
      seconds;
    const intervalId = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      element.textContent = `Звоните скорее, запись доступна всего ${minutes}:${seconds} минут`;

      if (--timer < 0) {
        clearInterval(intervalId);
        element.textContent = "Время истекло!";
      }
    }, 1000);
  }

  function createPageColor(titleText, colors, nextPageFunction, fillPercent) {
    const test = document.querySelector(".test-iq");
    const title = document.createElement("h2");
    title.className = "test-iq__title";
    title.textContent = titleText;

    const testChoice = document.createElement("div");
    testChoice.className = "test-iq__choice";

    const container = document.createElement("div");
    container.className = "container color-container";

    colors.forEach((color, index) => {
      const colorBox = document.createElement("div");
      colorBox.className = "color-box";
      colorBox.style.backgroundColor = color;
      colorBox.dataset.color = color;
      colorBox.dataset.index = index;

      container.append(colorBox);
      testChoice.append(container);

      colorBox.addEventListener("click", () => handleColorChange(colorBox));
    });

    const btn = document.createElement("button");
    btn.className = "next-btn iq-btn";
    btn.textContent = "ДАЛЕЕ";
    btn.disabled = true;

    function handleColorChange(selectedColorBox) {
      const colorBoxes = Array.from(testChoice.querySelectorAll(".color-box"));

      colorBoxes.forEach((box) => {
        box.classList.remove("selected");
      });

      selectedColorBox.classList.add("selected");

      btn.disabled = false;
    }

    test.innerHTML = "";
    test.append(title);
    test.append(testChoice);
    test.append(btn);

    btn.addEventListener("click", nextPageFunction);

    addFill(fillPercent);
  }

  function createTestImage(
    titleText,
    imageUrl,
    buttonOptions,
    nextPageFunction,
    fillPercent
  ) {
    const test = document.querySelector(".test-iq");
    const title = document.createElement("h2");
    title.className = "test-iq__title";
    title.textContent = titleText;

    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    const image = document.createElement("img");
    image.className = "image-iq";
    image.src = imageUrl;
    imageContainer.append(image);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    buttonOptions.forEach((option) => {
      const button = document.createElement("button");
      button.className = "button-iq";
      button.textContent = option.label;
      button.dataset.value = option.value;

      button.addEventListener("click", () => handleButtonClick(button));

      buttonContainer.append(button);
    });

    const btn = document.createElement("button");
    btn.className = "next-btn iq-btn";
    btn.textContent = "ДАЛЕЕ";
    btn.disabled = true;

    function handleButtonClick(selectedButton) {
      const buttons = Array.from(buttonContainer.querySelectorAll(".button"));

      buttons.forEach((button) => {
        button.classList.remove("selected");
      });

      selectedButton.classList.add("selected");
      btn.disabled = false;
    }

    test.innerHTML = "";
    test.append(title);
    test.append(imageContainer);
    test.append(buttonContainer);
    test.append(btn);

    btn.addEventListener("click", nextPageFunction);

    addFill(fillPercent);
  }

  const headerBrain = document.querySelector(".header-test__iq");

  qibtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      main.innerHTML = "";
      headerBrain.style.display = "flex";
      sidebar();
      createTest();
    });
  });

  document.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("header-btn")) {
      if (target.textContent === "ГЛАВНАЯ") {
        main.innerHTML = "";
        main.append(mainContent);
        headerBrain.style.display = "none";
      } else if (target.textContent === "ИНФОРМАЦИЯ О ТЕСТЕ") {
        main.innerHTML = "";
        main.append(mainContent);
        headerBrain.style.display = "none";
      } else if (target.textContent === "ПРОЙТИ ТЕСТ") {
        main.innerHTML = "";
        headerBrain.style.display = "flex";
        sidebar();
        createTest();
      }
    }
  });
});
