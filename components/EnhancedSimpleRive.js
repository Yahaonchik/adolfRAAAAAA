import { useEffect, useRef, useState } from 'react';
import { Rive, Layout, Fit, Alignment } from '@rive-app/canvas';

// Comprehensive problems database from adolf gitler project
const PROBLEMS_DATABASE = {
  21: [ // Дверца не открывается
    { id: '21_1', name: 'Неисправен замок дверцы (УБЛ)', description: 'Замена устройства блокировки люка', probability: 45, cost: 'от 1040грн', solution: '1. Диагностика замка дверцы\n2. Проверка электрических контактов\n3. Замена УБЛ на новый\n4. Тестирование блокировки' },
    { id: '21_2', name: 'Деформация дверцы', description: 'Регулировка или ремонт дверцы', probability: 25, cost: 'от 640грн', solution: '1. Осмотр петель и креплений\n2. Регулировка положения дверцы\n3. Замена поврежденных элементов\n4. Проверка плотности закрытия' },
    { id: '21_3', name: 'Проблема с ручкой дверцы', description: 'Ремонт механизма ручки', probability: 20, cost: 'от 480грн', solution: '1. Разборка механизма ручки\n2. Замена сломанных деталей\n3. Смазка подвижных частей\n4. Сборка и проверка работы' },
    { id: '21_4', name: 'Сбой программы управления', description: 'Сброс или ремонт модуля управления', probability: 10, cost: 'от 1600грн', solution: '1. Диагностика управляющего модуля\n2. Сброс к заводским настройкам\n3. Перепрошивка или замена платы\n4. Тестирование всех функций' }
  ],
  22: [ // Не набирает воду
    { id: '22_1', name: 'Нет холодной воды', description: 'Проверить наличие холодной воды в системе водоснабжения', probability: 25, cost: 'Самостоятельно', solution: '1. Проверьте подачу холодной воды в квартире\n2. Осмотрите входной кран\n3. Проверьте фильтр на входе\n4. Убедитесь что нет засора в шланге' },
    { id: '22_2', name: 'Неисправен датчик уровня воды', description: 'Замена датчика уровня воды', probability: 25, cost: 'от 1000грн', solution: '1. Диагностика датчика прессостата\n2. Проверка трубки датчика\n3. Замена датчика при необходимости\n4. Калибровка системы' },
    { id: '22_3', name: 'Неисправность системы залива воды', description: 'Ремонт системы залива воды', probability: 25, cost: 'от 1000грн', solution: '1. Проверка электромагнитных клапанов\n2. Осмотр системы залива\n3. Очистка или замена клапанов\n4. Проверка электрических соединений' },
    { id: '22_4', name: 'Засор в системе подачи воды', description: 'Чистка системы подачи воды', probability: 25, cost: 'от 1000грн', solution: '1. Очистка фильтра входного шланга\n2. Промывка системы подачи\n3. Проверка на засоры\n4. Замена фильтров при необходимости' }
  ],
  23: [ // Не отжимает
    { id: '23_1', name: 'Дисбаланс белья в барабане', description: 'Неравномерное распределение белья', probability: 35, cost: 'Са��остоятельно', solution: '1. Остановите машину и откройте дверцу\n2. Перераспределите белье равномерно\n3. Не загружайте слишком много или мало\n4. Запустите отжим повторно' },
    { id: '23_2', name: 'Износ подшипников барабана', description: 'Замена подшипников и сальников', probability: 25, cost: 'от 2000грн', solution: '1. Демонтаж барабана\n2. Замена подшипников и сальников\n3. Смазка новых подшипников\n4. Сборка и тестирование' },
    { id: '23_3', name: 'Ослабление ремня привода', description: 'Регулировка или замена ремня', probability: 20, cost: 'от 640грн', solution: '1. Снятие задней панели\n2. Проверка натяжения ремня\n3. Регулировка или замена ремня\n4. Проверка работы двигателя' },
    { id: '23_4', name: 'Неисправность двигателя', description: 'Ремонт или замена двигателя', probability: 20, cost: 'от 2400грн', solution: '1. Диагностика д��игателя\n2. Проверка обмоток и щеток\n3. Ремонт или замена двигателя\n4. Настройка и тестирование' }
  ],
  24: [ // Зависает на программе
    { id: '24_1', name: 'Сбой программного обеспечения', description: 'Сброс настроек до заводских', probability: 35, cost: 'от 640грн', solution: '1. Выполните сброс к заводским настройкам\n2. Отключите от сети на 15 минут\n3. Включите и запрограммируйте заново\n4. Проверьте работу всех программ' },
    { id: '24_2', name: 'Неисправность панели управления', description: 'Ремонт панели управления', probability: 25, cost: 'от 1600грн', solution: '1. Диагностика панели управления\n2. Замена неисправных кнопок или дисплея\n3. Проверка контактов\n4. Тестирование всех функций' },
    { id: '24_3', name: 'Проблема с блокировкой дверцы', description: 'Ремонт замка дверцы', probability: 25, cost: 'от 1040грн', solution: '1. Проверка механизма блокировки\n2. Очистка контактов замка\n3. Замена УБЛ при необходимости\n4. Настройка корректной работы' },
    { id: '24_4', name: 'Неисправность модуля управления', description: 'Замена управляющего модуля', probability: 15, cost: 'от 2800грн', solution: '1. Полная диагностика модуля\n2. Замена управляющей платы\n3. Программирование нового модуля\n4. Комплексное тестирование' }
  ],
  25: [ // Не сливает воду
    { id: '25_1', name: 'Засорен сливной фильтр', description: 'Очистка сливного фильтра от загрязнений', probability: 30, cost: 'от 640грн', solution: '1. Откройте люк внизу машины\n2. Выкрутите фильтр против часовой стрелки\n3. Очистите от мусора и промойте\n4. Установите обратно и закрутите' },
    { id: '25_2', name: 'Неисправен сливной насос', description: 'Замена сливного насоса', probability: 25, cost: 'от 1200грн', solution: '1. Диагностика помпы слива\n2. Проверка крыльчатки насоса\n3. Замена насоса при поломке\n4. Тестирование работы системы слива' },
    { id: '25_3', name: 'Засор сливного шланга', description: 'Прочистка сливного шланга', probability: 25, cost: 'от 720грн', solution: '1. Отсоедините сливной шланг\n2. Промойте под сильным напором\n3. Используйте трос для прочистки\n4. Подсоедините обратно и проверьте' },
    { id: '25_4', name: 'Проблема с датчиком воды', description: 'Замена датчика уровня воды', probability: 20, cost: 'от 960грн', solution: '1. Проверка прессостата\n2. Осмотр соединительной трубки\n3. Замена датчика\n4. Настройка уровней воды' }
  ],
  26: [ // Не крутит барабан
    { id: '26_1', name: 'Ослабление или разрыв ремня', description: 'Замена приводного ремня', probability: 40, cost: 'от 640грн', solution: '1. Снятие задней панел��\n2. Проверка состояния ремня\n3. Замена ремня на новый\n4. Регулировка натяжения' },
    { id: '26_2', name: 'Неисправность двигателя', description: 'Ремонт или замена мотора', probability: 30, cost: 'от 2400грн', solution: '1. Диагностика двигателя\n2. Проверка обмоток и щеток\n3. Ремонт или полная замена\n4. Тестирование работы' },
    { id: '26_3', name: 'Блокировка барабана', description: 'Устранение препятствий в барабане', probability: 20, cost: 'от 400грн', solution: '1. Проверка барабана на посторонние предметы\n2. Удаление застрявших вещей\n3. Проверка подшипников\n4. Смазка механизмов' },
    { id: '26_4', name: 'Проблема с управляющим модулем', description: 'Ремонт платы управления', probability: 10, cost: 'от 1760грн', solution: '1. Диагностика управляющего модуля\n2. Ремонт или замена платы\n3. Перепрошивка при необходимости\n4. Тест��рование всех функций' }
  ],
  27: [ // Не нагревает воду
    { id: '27_1', name: 'Неисправен ТЭН', description: 'Замена нагревательного элемента', probability: 45, cost: 'от 1440грн', solution: '1. Диагностика ТЭНа мультиметром\n2. Демонтаж старого ТЭНа\n3. Установка нового нагревателя\n4. Проверка герметичности и работы' },
    { id: '27_2', name: 'Накипь на ТЭНе', description: 'Очистка от накипи', probability: 30, cost: 'от 960грн', solution: '1. Демонтаж ТЭНа\n2. Очистка от накипи специальными средствами\n3. Промывка системы\n4. Установка обратно' },
    { id: '27_3', name: 'Неисправен датчик температуры', description: 'Замена термодатчика', probability: 15, cost: 'от 720грн', solution: '1. Локализация термодатчика\n2. Проверка сопротивления\n3. Замена неисправного датчика\n4. Калибровка температурных режимов' },
    { id: '27_4', name: 'Проблема с управля��щим модулем', description: 'Ремонт платы управления', probability: 10, cost: 'от 1760грн', solution: '1. Диагностика управляющего модуля\n2. Ремонт или замена платы\n3. Перепрошивка при необходимости\n4. Тестирование всех функций' }
  ],
  28: [ // Протекает
    { id: '28_1', name: 'Износ манжеты люка', description: 'Замена резинового уплотнителя', probability: 40, cost: 'от 1200грн', solution: '1. Демонтаж старой манжеты\n2. Очистка посадочного места\n3. Установка новой манжеты\n4. Проверка герметичности' },
    { id: '28_2', name: 'Повреждение шлангов', description: 'Замена поврежденных шлангов', probability: 25, cost: 'от 640грн', solution: '1. Определение места протечки\n2. Замена поврежденного шланга\n3. Проверка всех соединений\n4. Тестирование на герметичность' },
    { id: '28_3', name: 'Износ сальников подшипников', description: 'Замена сальнико��', probability: 20, cost: 'от 2000грн', solution: '1. Разборка барабана\n2. Замена изношенных сальников\n3. Установка новых подшипников\n4. Сборка и тестирование' },
    { id: '28_4', name: 'Повреждение бака', description: 'Ремонт или замена бака', probability: 15, cost: 'от 2800грн', solution: '1. Диагностика повреждений бака\n2. Заварка трещин или замена\n3. Проверка герметичности\n4. Финальное тестирование' }
  ],
  29: [ // Шумит при отжиме
    { id: '29_1', name: 'Посторонние предметы в барабане', description: 'Удаление посторонних предметов', probability: 40, cost: 'от 400грн', solution: '1. Осмотрите барабан на предмет монет, пуговиц\n2. Проверьте карманы перед стиркой\n3. Удалите найденные предметы\n4. Проверьте отсутствие повреждений' },
    { id: '29_2', name: 'Износ амортизаторов', description: 'Замена амортизаторов', probability: 25, cost: 'от 1440грн', solution: '1. Демонтаж старых амортизаторов\n2. Установка новых амортизаторов\n3. Проверка балансировки\n4. Тестирование на всех режимах' },
    { id: '29_3', name: 'Разбалансировка барабана', description: 'Балансировка барабана', probability: 20, cost: 'от 1200грн', solution: '1. Проверка креплений барабана\n2. Регулировка положения\n3. Добавление балансировочных грузов\n4. Финальное тестирование' },
    { id: '29_4', name: 'Износ подшипников', description: 'Замена подшипников', probability: 15, cost: 'от 2000грн', solution: '1. Полная разборка барабана\n2. Замена изношенных подшипников\n3. Установка новых сальников\n4. Сборка и настройка' }
  ],
  30: [ // Не включается
    { id: '30_1', name: 'Проблема с электропитанием', description: 'Проверка питания и розетки', probability: 35, cost: 'Самостоятельно', solution: '1. Проверьте напряжение в розетке\n2. Осмотрите сетевой шнур\n3. Проверьте автоматы в щитке\n4. Измерьте сопротивление в проводах' },
    { id: '30_2', name: 'Неисправность сетевого фильтра', description: 'Замена сетевого фильтра', probability: 25, cost: 'от 640грн', solution: '1. Диагностика сетевого фильтра\n2. Проверка конденсаторов\n3. Замена фильтра целиком\n4. Проверка заземления' },
    { id: '30_3', name: 'Неисправность кнопки включения', description: 'Замена кнопки питания', probability: 20, cost: 'от 960грн', solution: '1. Демонтаж панели управления\n2. Проверка контактов кнопки\n3. Замена неисправной кнопки\n4. Сборка и тестирование' },
    { id: '30_4', name: 'Неисправность модуля управления', description: 'Ремонт управляющей платы', probability: 20, cost: 'от 2400грн', solution: '1. Диагностика управляющего модуля\n2. Проверка микросхем и элементов\n3. Ремонт или замена платы\n4. Программирование и тестирование' }
  ]
};

const problemTitles = {
  21: "🚪 Дверца не открывается",
  22: "💧 Не набирает воду", 
  23: "💨 Не отжимает",
  24: "⏸️ Зависает на программе",
  25: "🌊 Вода не сливается",
  26: "🥁 Не крутит барабан",
  27: "🔥 Не нагревает воду",
  28: "💦 Протекает",
  29: "🔊 Шумит при отжиме",
  30: "⚡ Не включается"
};

const brands = [
  'Samsung', 'LG', 'Bosch', 'Indesit', 'Whirlpool', 'Ariston', 'Atlant', 'Candy', 'Другая марка'
];

const ages = [
  'Менее 1 года', '1-3 года', '3-5 лет', '5-10 лет', 'Более 10 лет'
];

export default function EnhancedSimpleRive() {
  const canvasRef = useRef(null);
  const riveInstanceRef = useRef(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedAge, setSelectedAge] = useState('');

  const openProblemOverlay = (problemId) => {
    console.log(`🔧 Opening problem ${problemId} overlay`);
    setSelectedProblem(problemId);
    
    // Create and show modal/overlay
    const modal = document.createElement('div');
    modal.className = 'rive-problem-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease;
      padding: 1rem;
      overflow-y: auto;
    `;
    
    const problems = PROBLEMS_DATABASE[problemId];
    if (problems) {
      const problemsHtml = problems.map((problem, index) => `
        <div style="
          background: #f8f9fa;
          border-radius: 0.75rem;
          padding: 1rem;
          margin-bottom: 1rem;
          border-left: 4px solid #ec9d65;
          position: relative;
        ">
          <div style="display: flex; align-items: flex-start; gap: 1rem;">
            <div style="
              background: linear-gradient(135deg, #ec9d65, #d68545);
              color: white;
              border-radius: 50%;
              width: 3rem;
              height: 3rem;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 0.875rem;
              flex-shrink: 0;
            ">${problem.probability}%</div>
            
            <div style="flex-grow: 1;">
              <h4 style="
                margin: 0 0 0.5rem 0;
                color: #333;
                font-size: 1rem;
                font-weight: 600;
              ">${problem.name}</h4>
              
              <p style="
                margin: 0 0 0.75rem 0;
                color: #666;
                font-size: 0.875rem;
                line-height: 1.4;
              ">${problem.description}</p>
              
              <div style="
                background: white;
                padding: 0.75rem;
                border-radius: 0.5rem;
                border: 1px solid #e9ecef;
                margin-bottom: 0.75rem;
              ">
                <div style="font-weight: 600; color: #333; font-size: 0.875rem; margin-bottom: 0.5rem;">🔧 Этапы решения:</div>
                <div style="color: #666; font-size: 0.8rem; line-height: 1.5; white-space: pre-line;">${problem.solution}</div>
              </div>
            </div>
            
            <div style="
              background: ${problem.cost.includes('Самостоятельно') ? '#28a745' : '#007bff'};
              color: white;
              padding: 0.5rem 1rem;
              border-radius: 1.5rem;
              font-weight: 600;
              font-size: 0.875rem;
              flex-shrink: 0;
              text-align: center;
            ">${problem.cost}</div>
          </div>
        </div>
      `).join('');

      modal.innerHTML = `
        <div style="
          background: white;
          padding: 0;
          border-radius: 1rem;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          margin: 1rem;
          animation: slideIn 0.3s ease;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          overflow: hidden;
        ">
          <!-- Header -->
          <div style="
            background: linear-gradient(135deg, #ec9d65, #d68545);
            padding: 1.5rem;
            color: white;
            position: relative;
          ">
            <button onclick="this.closest('.rive-problem-modal').remove()" style="
              position: absolute;
              top: 1rem;
              right: 1rem;
              background: rgba(255,255,255,0.2);
              border: none;
              color: white;
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 50%;
              cursor: pointer;
              font-size: 1.25rem;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: background 0.2s;
            " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
            
            <h2 style="margin: 0 3rem 0.5rem 0; font-size: 1.5rem; font-weight: 600;">${problemTitles[problemId]}</h2>
            <p style="margin: 0; opacity: 0.9; font-size: 1rem;">Детальная диагностика проблемы</p>
          </div>
          
          <!-- Filters -->
          <div style="
            background: #f8f9fa;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          ">
            <div style="flex: 1; min-width: 200px;">
              <label style="display: block; font-weight: 600; color: #333; margin-bottom: 0.5rem; font-size: 0.875rem;">Марка машины:</label>
              <select id="brandSelect" style="
                width: 100%;
                padding: 0.5rem;
                border: 1px solid #ddd;
                border-radius: 0.5rem;
                font-size: 0.875rem;
              ">
                <option value="">Выберите марку</option>
                ${brands.map(brand => `<option value="${brand}">${brand}</option>`).join('')}
              </select>
            </div>
            <div style="flex: 1; min-width: 200px;">
              <label style="display: block; font-weight: 600; color: #333; margin-bottom: 0.5rem; font-size: 0.875rem;">Возраст машины:</label>
              <select id="ageSelect" style="
                width: 100%;
                padding: 0.5rem;
                border: 1px solid #ddd;
                border-radius: 0.5rem;
                font-size: 0.875rem;
              ">
                <option value="">Выберите возраст</option>
                ${ages.map(age => `<option value="${age}">${age}</option>`).join('')}
              </select>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 1.5rem; max-height: 50vh; overflow-y: auto;">
            <h3 style="
              margin: 0 0 1rem 0;
              color: #333;
              font-size: 1.125rem;
              font-weight: 600;
              border-bottom: 2px solid #ec9d65;
              padding-bottom: 0.5rem;
            ">Возможные причины (отсортированы по вероятности):</h3>
            
            ${problemsHtml}
            
            <div style="
              background: #e7f3ff;
              border: 1px solid #b3d9ff;
              border-radius: 0.75rem;
              padding: 1.25rem;
              margin-top: 1.5rem;
            ">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                <span style="font-size: 1.5rem;">💡</span>
                <div style="color: #0066cc; font-weight: 600;">Важная информация:</div>
              </div>
              <div style="color: #0066cc; line-height: 1.5;">
                • Точную стоимость ремонта мастер определит после диагностики<br>
                • Выезд мастера и диагностика - <strong>бесплатно</strong>!<br>
                • Гарантия на работы до 24 месяцев<br>
                • Работаем с оригинальными запчастями
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="
            padding: 1.5rem;
            background: #f8f9fa;
            border-top: 1px solid #e9ecef;
            text-align: center;
          ">
            <button onclick="this.closest('.rive-problem-modal').remove()" style="
              background: linear-gradient(135deg, #28a745, #20c997);
              color: white;
              border: none;
              padding: 1rem 2.5rem;
              border-radius: 2rem;
              cursor: pointer;
              font-size: 1.1rem;
              font-weight: 600;
              transition: transform 0.2s, box-shadow 0.2s;
              box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
              margin-right: 1rem;
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(40, 167, 69, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(40, 167, 69, 0.3)'">
              📞 Вызвать мастера БЕСПЛАТНО
            </button>
            <button onclick="this.closest('.rive-problem-modal').remove()" style="
              background: linear-gradient(135deg, #007bff, #0056b3);
              color: white;
              border: none;
              padding: 1rem 2rem;
              border-radius: 2rem;
              cursor: pointer;
              font-size: 1rem;
              font-weight: 600;
              transition: transform 0.2s, box-shadow 0.2s;
              box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0, 123, 255, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0, 123, 255, 0.3)'">
              💬 Консультация
            </button>
            <div style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
              🕐 Работаем ежедневно с 8:00 до 22:00 | 📍 Выезд по всей Одессе
            </div>
          </div>
        </div>
      `;
    }
    
    // Add CSS animations
    if (!document.querySelector('#rive-modal-styles')) {
      const style = document.createElement('style');
      style.id = 'rive-modal-styles';
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .rive-problem-modal::-webkit-scrollbar {
          width: 8px;
        }
        .rive-problem-modal::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .rive-problem-modal::-webkit-scrollbar-thumb {
          background: rgba(236, 157, 101, 0.5);
          border-radius: 4px;
        }
        .rive-problem-modal::-webkit-scrollbar-thumb:hover {
          background: rgba(236, 157, 101, 0.7);
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set up high-DPI canvas for crisp text
    const devicePixelRatio = window.devicePixelRatio || 1;
    const displayWidth = 796;
    const displayHeight = 369;

    // Set actual canvas size in memory (scaled up for high DPI)
    canvas.width = displayWidth * devicePixelRatio;
    canvas.height = displayHeight * devicePixelRatio;

    // Scale down the canvas CSS size to display size
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';

    // Scale the drawing context so everything draws at the correct size
    ctx.scale(devicePixelRatio, devicePixelRatio);

    // Enable crisp text rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.textRenderingOptimization = 'optimizeQuality';

    const riveInstance = new Rive({
      src: '/untitled.riv',
      canvas: canvas,
      layout: new Layout({
        fit: Fit.Contain,
        alignment: Alignment.Center,
      }),
      autoplay: true,
      stateMachines: 'State Machine 1',
      onLoad: () => {
        console.log('🎯 Enhanced Rive ��агружен с high-DPI support');
      },
      onLoadError: (error) => {
        console.error('❌ Ошибка загрузки Rive:', error);
      },
    });

    riveInstanceRef.current = riveInstance;

    // Handle state changes for timeline events
    riveInstance.on('statechange', (event) => {
      console.log('🚨 ENHANCED RIVE STATECHANGE EVENT:', event);

      const eventStrings = [];
      if (event?.name) eventStrings.push(String(event.name));
      if (event?.stateName) eventStrings.push(String(event.stateName));
      if (event?.state) eventStrings.push(String(event.state));

      // Handle event.data as array
      if (event?.data && Array.isArray(event.data)) {
        event.data.forEach(item => {
          if (typeof item === 'string') {
            eventStrings.push(item);
          }
        });
      }

      if (Array.isArray(event)) {
        event.forEach(item => {
          if (item?.name) eventStrings.push(String(item.name));
          if (item?.stateName) eventStrings.push(String(item.stateName));
        });
      }

      // Look for Timeline events (Timeline 21-30 for modal windows)
      eventStrings.forEach(str => {
        if (str.includes('Timeline')) {
          const timelineNumber = parseInt(str.replace('Timeline ', ''));
          if (timelineNumber >= 21 && timelineNumber <= 30) {
            console.log(`🎯 TIMELINE FOUND: ${str} - Opening enhanced problem ${timelineNumber}!`);
            openProblemOverlay(timelineNumber);
          }
        }
      });
    });

    // Handle mouse movement for Rive interactivity
    const handleMouseMove = (event) => {
      if (!canvasRef.current || !riveInstanceRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const normalizedX = x / rect.width;
      const normalizedY = y / rect.height;

      const stateMachine = riveInstanceRef.current.stateMachineInputs('State Machine 1');
      if (stateMachine) {
        const mouseXInput = stateMachine.find(input => input.name === 'mouseX' || input.name === 'Mouse X');
        const mouseYInput = stateMachine.find(input => input.name === 'mouseY' || input.name === 'Mouse Y');

        if (mouseXInput) {
          mouseXInput.value = normalizedX;
        }
        if (mouseYInput) {
          mouseYInput.value = normalizedY;
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (riveInstanceRef.current) {
        riveInstanceRef.current.cleanup();
      }
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div className="simple-rive-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '796px',
          height: '369px',
          imageRendering: 'crisp-edges',
        }}
        width={1592}
        height={738}
      />
    </div>
  );
}
