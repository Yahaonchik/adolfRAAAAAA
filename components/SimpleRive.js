import { useEffect, useRef, useState } from 'react';
import { Rive, Layout, Fit, Alignment } from '@rive-app/canvas';

const problemsData = {
  21: {
    title: "🚪 Дверца не открывается",
    description: "Дверца заблокирована и не открывается после стирки",
    color: "from-red-600 to-red-800",
    repairs: [
      { probability: 40, issue: "Сломалась ручка люка", price: "от 640", service: "Замена или ремонт ручки" },
      { probability: 40, issue: "Вышел из строя замок блокировки", price: "от 800", service: "Замена замка" },
      { probability: 15, issue: "Нарушение работы электроцепи замка", price: "от 640", service: "Диагностика и восстановление работоспособности" },
      { probability: 5, issue: "Сбо�� в работе модуля управления", price: "от 1200", service: "Ремонт или перепрошивка модуля" }
    ]
  },
  22: {
    title: "💧 Не набирает воду",
    description: "Машинка не набирает воду в начале цикла стирки",
    color: "from-blue-600 to-blue-800",
    repairs: [
      { probability: 5, issue: "Нет холодной воды", price: "Самостоятельно", service: "Проверить наличие холодной воды в системе водоснабжения" },
      { probability: 40, issue: "Неисправен датчик уровня воды", price: "от 360", service: "Замена датчика уровня воды" },
      { probability: 25, issue: "Неисправность системы залива воды", price: "от 640", service: "Ремонт системы залива воды" },
      { probability: 10, issue: "Вышел из строя модуль управления", price: "от 1200", service: "Ремонт или перепрошивка модуля управления" },
      { probability: 20, issue: "Засор в системе подачи воды", price: "от 400", service: "Ч��стка системы подачи воды" }
    ]
  },
  23: {
    title: "💨 Не отжимает",
    description: "Белье остается мокрым после завершения программы",
    color: "from-cyan-600 to-cyan-800",
    repairs: [
      { probability: 35, issue: "Поломка двигателя", price: "от 960", service: "Ремонт (переборка) двигателя, замена щет��к" },
      { probability: 45, issue: "Износ приводного ремня", price: "от 400", service: "Замена приводного ремня" },
      { probability: 15, issue: "Износ подшипникового узла", price: "от 1520", service: "Замена узла (подшипники, сальники)" },
      { probability: 5, issue: "Сбой в работе модуля управления", price: "от 1200", service: "Ремонт или перепрошивка модуля управления" }
    ]
  },
  24: {
    title: "⏸️ Зависает на программе",
    description: "Стиральная машина останавливается в процессе стирки",
    color: "from-yellow-600 to-yellow-800",
    repairs: [
      { probability: 100, issue: "Не��справность модуля управления", price: "от 1200", service: "Ремонт модуля управления" }
    ]
  },
  25: {
    title: "🌊 Вода не сливается",
    description: "После стирки в барабане остается вода",
    color: "from-teal-600 to-teal-800",
    repairs: [
      { probability: 45, issue: "Неисправность помпы (сливного насоса)", price: "от 640", service: "Замена помпы (сливного насоса)" },
      { probability: 50, issue: "Засорение сливной системы", price: "от 400", service: "Прочистка системы (фильтра и патрубков)" },
      { probability: 5, issue: "Сбой в работе модуля управления", price: "от 1200", service: "Ремонт или перепрошивка модуля управления" }
    ]
  },
  26: {
    title: "🥁 Не крутит барабан",
    description: "Барабан не вращается во время стирки",
    color: "from-gray-600 to-gray-800",
    repairs: [
      { probability: 35, issue: "Поломка двигателя", price: "от 960", service: "Ремонт (переборка) двигателя, замена щеток" },
      { probability: 45, issue: "Износился или соскочил приводной ремень", price: "от 400", service: "Замена или установка приводного ремня" },
      { probability: 15, issue: "Износ подшипникового узла", price: "от 1520", service: "Замена узла (подшипники, сальники)" },
      { probability: 5, issue: "Неисправность модуля управления", price: "от 1200", service: "Ремонт модуля управления" }
    ]
  },
  27: {
    title: "🔥 Не нагревает воду",
    description: "Вода остается холодной во время стирки",
    color: "from-orange-600 to-orange-800",
    repairs: [
      { probability: 60, issue: "Перегорел ТЭН (нагреватель)", price: "от 600", service: "Установка нового ТЭНа (нагревателя)" },
      { probability: 25, issue: "Нарушение в работе датчика температуры", price: "от 400", service: "Замена датчика температуры" },
      { probability: 15, issue: "Окисление контактов ТЭНа (нет контакта)", price: "от 320", service: "Чистка контактов и переподключение" }
    ]
  },
  28: {
    title: "💦 Протекает",
    description: "Из машинки вытекает вода на пол",
    color: "from-blue-700 to-blue-900",
    repairs: [
      { probability: 5, issue: "Течь в бункере дозатора", price: "от 400", service: "Замена или ремонт бункера дозатора порошка" },
      { probability: 15, issue: "Порвался один из патрубков", price: "от 480", service: "Замена вышедшего из строя патрубка на новый" },
      { probability: 25, issue: "Засорение системы", price: "от 440", service: "Прочистка системы, герметизация соединений" },
      { probability: 15, issue: "Повреждение манжеты люка", price: "от 800", service: "Установка новой манжеты, либо ремонт старой" },
      { probability: 40, issue: "Соскочил патрубок подачи воды", price: "от 240", service: "Закрепление патрубка" }
    ]
  },
  29: {
    title: "🔊 ��умит при отжиме",
    description: "Во время отжима машинка издает громкие звуки",
    color: "from-purple-700 to-purple-900",
    repairs: [
      { probability: 40, issue: "Вышел из строя амортизатор", price: "от 360", service: "Замена амортизатора" },
      { probability: 10, issue: "Износ подшипникового узла", price: "от 1520", service: "Замена узла (подшипники, сальники)" },
      { probability: 40, issue: "Противовес плохо закреплен", price: "от 400", service: "Регулировка противовеса" },
      { probability: 10, issue: "Неверная установка машины относительно пола", price: "от 360", service: "Переустановка стиральной машины" }
    ]
  },
  30: {
    title: "⚡ Не включается",
    description: "Стиральная машина не реагирует на нажатие кнопок",
    color: "from-red-700 to-red-900",
    repairs: [
      { probability: 60, issue: "Неисправность модуля управления", price: "от 1200", service: "Ремонт или переп��ошивка модуля управления" },
      { probability: 25, issue: "Проблемы с электропитанием", price: "от 400", service: "Диагностика и ремонт электрических соединений" },
      { probability: 15, issue: "Неисправность кнопки включения", price: "от 360", service: "Замена кнопки включения" }
    ]
  }
};

export default function SimpleRive() {
  const canvasRef = useRef(null);
  const riveInstanceRef = useRef(null);
  const [selectedProblem, setSelectedProblem] = useState(null);

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

    const problemData = problemsData[problemId];
    if (problemData) {
      const repairsHtml = problemData.repairs.map(repair => `
        <div style="
          display: flex;
          align-items: center;
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          background: #f8f9fa;
          border-radius: 0.5rem;
          border-left: 4px solid #ec9d65;
        ">
          <div style="
            background: #ec9d65;
            color: white;
            border-radius: 50%;
            width: 2.5rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.875rem;
            margin-right: 1rem;
            flex-shrink: 0;
          ">${repair.probability}%</div>
          <div style="flex-grow: 1;">
            <div style="font-weight: 600; color: #333; margin-bottom: 0.25rem;">${repair.issue}</div>
            <div style="color: #666; font-size: 0.875rem; line-height: 1.4;">${repair.service}</div>
          </div>
          <div style="
            background: #28a745;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-weight: 600;
            font-size: 0.875rem;
            margin-left: 1rem;
            flex-shrink: 0;
          ">${repair.price} грн</div>
        </div>
      `).join('');

      modal.innerHTML = `
        <div style="
          background: white;
          padding: 0;
          border-radius: 1rem;
          max-width: 700px;
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
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
              cursor: pointer;
              font-size: 1.25rem;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: background 0.2s;
            " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
            <h2 style="margin: 0; font-size: 1.5rem; font-weight: 600;">${problemData.title}</h2>
            <p style="margin: 0.5rem 0 0 0; opacity: 0.9; font-size: 1rem;">${problemData.description}</p>
          </div>

          <!-- Content -->
          <div style="padding: 1.5rem; max-height: 60vh; overflow-y: auto;">
            <h3 style="
              margin: 0 0 1rem 0;
              color: #333;
              font-size: 1.125rem;
              font-weight: 600;
              border-bottom: 2px solid #ec9d65;
              padding-bottom: 0.5rem;
            ">Возможные причины и стоимость ремонта:</h3>

            ${repairsHtml}

            <div style="
              background: #e7f3ff;
              border: 1px solid #b3d9ff;
              border-radius: 0.5rem;
              padding: 1rem;
              margin-top: 1rem;
            ">
              <div style="color: #0066cc; font-weight: 600; margin-bottom: 0.5rem;">💡 Важная информация:</div>
              <div style="color: #0066cc; font-size: 0.875rem; line-height: 1.4;">
                Точную стоимость ремонта мастер определит после диагностики.
                Выезд мастера и диагностика - <strong>бесплатно</strong>!
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
              background: linear-gradient(135deg, #ec9d65, #d68545);
              color: white;
              border: none;
              padding: 0.875rem 2rem;
              border-radius: 2rem;
              cursor: pointer;
              font-size: 1rem;
              font-weight: 600;
              transition: transform 0.2s, box-shadow 0.2s;
              box-shadow: 0 4px 12px rgba(236, 157, 101, 0.3);
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(236, 157, 101, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(236, 157, 101, 0.3)'">
              📞 Вызвать мастера бесплатно
            </button>
            <div style="margin-top: 0.75rem; color: #666; font-size: 0.875rem;">
              Работаем ежедневно с 8:00 до 22:00
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

  const closePriceFrame = () => {
    setSelectedProblem(null);
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
        console.log('🎯 Rive загружен с high-DPI support');
      },
      onLoadError: (error) => {
        console.error('❌ Ошибка загрузки Rive:', error);
      },
    });

    riveInstanceRef.current = riveInstance;

    // Handle state changes for timeline events
    riveInstance.on('statechange', (event) => {
      console.log('🚨 RIVE STATECHANGE EVENT:', event);

      const eventStrings = [];
      if (event?.name) eventStrings.push(String(event.name));
      if (event?.stateName) eventStrings.push(String(event.stateName));
      if (event?.state) eventStrings.push(String(event.state));

      // Handle event.data as array
      if (event?.data && Array.isArray(event.data)) {
        console.log('🎯 Processing event.data array:', event.data);
        event.data.forEach(item => {
          if (typeof item === 'string') {
            eventStrings.push(item);
            console.log('🎯 Added from data:', item);
          }
        });
      }

      if (Array.isArray(event)) {
        event.forEach(item => {
          if (item?.name) eventStrings.push(String(item.name));
          if (item?.stateName) eventStrings.push(String(item.stateName));
        });
      }

      console.log('🔍 All event strings:', eventStrings);

      // Look for Timeline events (Timeline 21-30 for modal windows)
      eventStrings.forEach(str => {
        if (str.includes('Timeline')) {
          console.log('🎯 TIMELINE FOUND:', str);

          // Timeline 21-30 for modal windows
          if (str === 'Timeline 21') {
            console.log('🚪 Timeline 21 - Opening problem 21!');
            openProblemOverlay(21);
          } else if (str === 'Timeline 22') {
            console.log('💧 Timeline 22 - Opening problem 22!');
            openProblemOverlay(22);
          } else if (str === 'Timeline 23') {
            console.log('💨 Timeline 23 - Opening problem 23!');
            openProblemOverlay(23);
          } else if (str === 'Timeline 24') {
            console.log('⏸️ Timeline 24 - Opening problem 24!');
            openProblemOverlay(24);
          } else if (str === 'Timeline 25') {
            console.log('🌊 Timeline 25 - Opening problem 25!');
            openProblemOverlay(25);
          } else if (str === 'Timeline 26') {
            console.log('🥁 Timeline 26 - Opening problem 26!');
            openProblemOverlay(26);
          } else if (str === 'Timeline 27') {
            console.log('🔥 Timeline 27 - Opening problem 27!');
            openProblemOverlay(27);
          } else if (str === 'Timeline 28') {
            console.log('💦 Timeline 28 - Opening problem 28!');
            openProblemOverlay(28);
          } else if (str === 'Timeline 29') {
            console.log('🔊 Timeline 29 - Opening problem 29!');
            openProblemOverlay(29);
          } else if (str === 'Timeline 30') {
            console.log('⚡ Timeline 30 - Opening problem 30!');
            openProblemOverlay(30);
          } else {
            console.log('📊 Other Timeline (ignored):', str);
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
        width={796}
        height={369}
      />
    </div>
  );
}
