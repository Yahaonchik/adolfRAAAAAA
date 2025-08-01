import { useState } from 'react';

const faqData = [
  {
    id: 1,
    question: "Сколько времени занимает ремонт?",
    answer: "Обычно ремонт занимает от 30 минут до 2 часов, в зависимости от сложности проблемы. Простые неисправности устраняем сразу, для замены сложных деталей может потребоваться дополнительное время."
  },
  {
    id: 2,
    question: "Какую гарантию вы предоставляете?",
    answer: "Мы предоставляем гарантию до 24 месяцев на выполненные работы и установленные детал��. Гарантийные обязательства прописываются в договоре на оказание услуг."
  },
  {
    id: 3,
    question: "Сколько стоит диагностика?",
    answer: "Диагностика бесплатная при выезде мастера. Мы определяем причину неисправности и называем точную стоимость ремонта."
  },
  {
    id: 4,
    question: "Будет ли у мастера детали для моей техники?",
    answer: "У нас есть склад оригинальных запчастей для всех популярных брендов. Редкие детали можем заказать и получить в течение 1-2 дней."
  },
  {
    id: 5,
    question: "Как проблемы с отжимом влияют на стирку?",
    answer: "Проблемы с отжимом могут привести к некачественной стирке и долгой сушке вещей. Исправляем любые неисправности двигателя и механизма отжима."
  }
];

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="faq-section-container">
      {/* Top decorative line */}
      <div className="faq-top-line">
        <svg width="277" height="65" viewBox="0 0 285 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="topGradient" x1="0" y1="326" x2="346" y2="329.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#606060"/>
              <stop offset="1" stopColor="#ED9E65"/>
            </linearGradient>
          </defs>
          <path d="M277 73.9388V75.4388H278.5V73.9388H277ZM269 8C269 12.4183 272.582 16 277 16C281.418 16 285 12.4183 285 8C285 3.58172 281.418 0 277 0C272.582 0 269 3.58172 269 8ZM0 73.9388L0 75.4388H3.4625L3.4625 73.9388V72.4388H0L0 73.9388ZM10.3875 73.9388V75.4388H17.3125V73.9388L17.3125 72.4388H10.3875V73.9388ZM24.2375 73.9388V75.4388L31.1625 75.4388V73.9388L31.1625 72.4388L24.2375 72.4388L24.2375 73.9388ZM38.0875 73.9388V75.4388H45.0125V73.9388V72.4388H38.0875V73.9388ZM51.9375 73.9388V75.4388H58.8625V73.9388V72.4388H51.9375V73.9388ZM65.7875 73.9388V75.4388H72.7125V73.9388V72.4388H65.7875V73.9388ZM79.6375 73.9388V75.4388H86.5625V73.9388V72.4388H79.6375V73.9388ZM93.4875 73.9388V75.4388H100.413V73.9388V72.4388H93.4875V73.9388ZM107.338 73.9388V75.4388H114.263V73.9388V72.4388H107.338V73.9388ZM121.188 73.9388V75.4388H128.113V73.9388V72.4388H121.188V73.9388ZM135.038 73.9388V75.4388H141.963V73.9388V72.4388H135.038V73.9388ZM148.888 73.9388V75.4388H155.813V73.9388V72.4388H148.888V73.9388ZM162.738 73.9388V75.4388H169.663V73.9388V72.4388H162.738V73.9388ZM176.588 73.9388V75.4388H183.513V73.9388V72.4388H176.588V73.9388ZM190.438 73.9388V75.4388H197.363V73.9388V72.4388H190.438V73.9388ZM204.288 73.9388V75.4388H211.213V73.9388V72.4388H204.288V73.9388ZM218.138 73.9388V75.4388H225.063V73.9388V72.4388H218.138V73.9388ZM231.988 73.9388V75.4388H238.913V73.9388V72.4388H231.988V73.9388ZM245.838 73.9388V75.4388H252.763V73.9388V72.4388H245.838V73.9388ZM259.688 73.9388V75.4388L266.613 75.4388V73.9388V72.4388L259.688 72.4388V73.9388ZM273.538 73.9388V75.4388H277V73.9388V72.4388H273.538V73.9388ZM277 73.9388H278.5V70.6418H277L275.5 70.6418V73.9388H277ZM277 64.0479H278.5V57.4541H277L275.5 57.4541V64.0479L277 64.0479ZM277 50.8602H278.5V44.2663H277L275.5 44.2663V50.8602L277 50.8602ZM277 37.6724H278.5V31.0786H277H275.5V37.6724H277ZM277 24.4847H278.5V17.8908H277H275.5V24.4847H277ZM277 11.2969H278.5V8L277 8H275.5V11.2969H277Z" fill="url(#topGradient)"/>
        </svg>
      </div>

      {/* Main FAQ content */}
      <div className="faq-main-content">
        {/* Left decorative line */}
        <div className="faq-left-line">
          <svg width="4" viewBox="0 0 4 586" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="middleGradient" x1="2" y1="253" x2="348" y2="256.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#606060"/>
                <stop offset="1" stopColor="#ED9E65"/>
              </linearGradient>
            </defs>
            <path fill="url(#middleGradient)" d="M2 0.9375L0.5 0.9375L0.5 4.41728H2H3.5L3.5 0.9375L2 0.9375ZM2 11.3768H0.5L0.5 18.3364H2H3.5L3.5 11.3768H2ZM2 25.296H0.5L0.5 32.2555H2H3.5L3.5 25.296H2ZM2 39.2151H0.5L0.5 46.1747H2H3.5L3.5 39.2151H2ZM2 53.1342H0.5L0.5 60.0938H2H3.5L3.5 53.1342H2ZM2 67.0534H0.5L0.5 74.0129H2H3.5L3.5 67.0534H2ZM2 80.9725H0.5L0.5 87.932H2H3.5L3.5 80.9725H2ZM2 94.8916H0.5L0.5 101.851H2H3.5L3.5 94.8916H2ZM2 108.811H0.5L0.5 115.77H2H3.5L3.5 108.811H2ZM2 122.73H0.5L0.5 129.689H2H3.5L3.5 122.73H2ZM2 136.649H0.5L0.5 143.609H2H3.5L3.5 136.649H2ZM2 150.568H0.5L0.5 157.528H2H3.5L3.5 150.568H2ZM2 164.487H0.5L0.5 171.447H2H3.5L3.5 164.487H2ZM2 178.406H0.5L0.5 185.366H2H3.5L3.5 178.406H2ZM2 192.325H0.5L0.5 199.285H2H3.5L3.5 192.325H2ZM2 206.245H0.5L0.5 213.204H2H3.5L3.5 206.245H2ZM2 220.164H0.5L0.5 227.123H2H3.5L3.5 220.164H2ZM2 234.083H0.5L0.5 241.042H2H3.5L3.5 234.083H2ZM2 248.002H0.5L0.5 254.962H2H3.5L3.5 248.002H2ZM2 261.921H0.5L0.5 268.881H2H3.5L3.5 261.921H2ZM2 275.84H0.5L0.5 282.8H2H3.5L3.5 275.84H2ZM2 289.759H0.5L0.5 296.719H2H3.5L3.5 289.759H2ZM2 303.679H0.5L0.5 310.638H2H3.5L3.5 303.679H2ZM2 317.598H0.5L0.5 324.557H2H3.5L3.5 317.598H2ZM2 331.517H0.5L0.5 338.476H2H3.5L3.5 331.517H2ZM2 345.436H0.5L0.5 352.395H2H3.5L3.5 345.436H2ZM2 359.355H0.5L0.5 366.315H2H3.5L3.5 359.355H2ZM2 373.274H0.5L0.5 380.234H2H3.5L3.5 373.274H2ZM2 387.193H0.5L0.5 394.153H2H3.5L3.5 387.193H2ZM2 401.112H0.5L0.5 408.072H2H3.5L3.5 401.112H2ZM2 415.032H0.5L0.5 421.991H2H3.5L3.5 415.032H2ZM2 428.951H0.5L0.5 435.91H2H3.5L3.5 428.951H2ZM2 442.87H0.5L0.5 449.829H2H3.5L3.5 442.87H2ZM2 456.789H0.5L0.5 463.749H2H3.5L3.5 456.789H2ZM2 470.708H0.5L0.5 477.668H2H3.5L3.5 470.708H2ZM2 484.627H0.5L0.5 491.587H2H3.5L3.5 484.627H2ZM2 498.546H0.5L0.5 505.506H2H3.5L3.5 498.546H2ZM2 512.465H0.5L0.5 519.425H2H3.5L3.5 512.465H2ZM2 526.385H0.5L0.5 533.344H2H3.5L3.5 526.385H2ZM2 540.304H0.5L0.5 547.263H2H3.5L3.5 540.304H2ZM2 554.223H0.5L0.5 561.182H2H3.5L3.5 554.223H2ZM2 568.142H0.5L0.5 575.101H2H3.5L3.5 568.142H2Z"/>
          </svg>
        </div>

        {/* FAQ Content */}
        <div className="faq-content">
          <h2 className="faq-title">Ответы на часто задаваемые вопросы!</h2>
          
          <div className="faq-items">
            {faqData.map((item) => (
              <div key={item.id} className="faq-item">
                <div 
                  className="faq-question"
                  onClick={() => toggleFAQ(item.id)}
                >
                  <div className="faq-question-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style={{
                        transform: openFAQ === item.id ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        color: '#ED9E65'
                      }}
                    >
                      <path
                        d="M12 5v14m-7-7h14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="faq-question-text">{item.question}</span>
                </div>
                
                <div 
                  className="faq-answer"
                  style={{
                    maxHeight: openFAQ === item.id ? '200px' : '0px',
                    opacity: openFAQ === item.id ? 1 : 0,
                    paddingTop: openFAQ === item.id ? '10px' : '0px',
                  }}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="faq-bottom-line">
        <svg width="277" height="122" viewBox="0 0 248 138" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bottomGradient" x1="8" y1="-323.584" x2="240.013" y2="-322.006" gradientUnits="userSpaceOnUse">
              <stop stopColor="#606060"/>
              <stop offset="1" stopColor="#ED9E65"/>
            </linearGradient>
          </defs>
          <path d="M0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8ZM240 8H241.5V6.5H240V8ZM232 167C232 171.418 235.582 175 240 175C244.418 175 248 171.418 248 167C248 162.582 244.418 159 240 159C235.582 159 232 162.582 232 167ZM8 8V9.5H11.4118V8V6.5L8 6.5V8ZM18.2353 8V9.5L25.0588 9.5V8V6.5L18.2353 6.5V8ZM31.8824 8V9.5L38.7059 9.5V8V6.5L31.8824 6.5V8ZM45.5294 8V9.5L52.3529 9.5V8V6.5L45.5294 6.5V8ZM59.1765 8V9.5L66 9.5V8V6.5L59.1765 6.5V8ZM72.8235 8V9.5L79.6471 9.5V8V6.5L72.8235 6.5V8ZM86.4706 8V9.5L93.2941 9.5V8V6.5L86.4706 6.5V8ZM100.118 8V9.5L106.941 9.5V8V6.5L100.118 6.5V8ZM113.765 8V9.5L120.588 9.5V8V6.5L113.765 6.5V8ZM127.412 8V9.5L134.235 9.5V8V6.5L127.412 6.5V8ZM141.059 8V9.5L147.882 9.5V8V6.5L141.059 6.5V8ZM154.706 8V9.5L161.529 9.5V8V6.5L154.706 6.5V8ZM168.353 8V9.5L175.176 9.5V8V6.5L168.353 6.5V8ZM182 8V9.5L188.824 9.5V8V6.5L182 6.5V8ZM195.647 8V9.5L202.471 9.5V8V6.5L195.647 6.5V8ZM209.294 8V9.5L216.118 9.5V8V6.5L209.294 6.5V8ZM222.941 8V9.5L229.765 9.5V8V6.5L222.941 6.5V8ZM236.588 8V9.5H240V8V6.5L236.588 6.5V8ZM240 8H238.5V11.6136H240H241.5V8H240ZM240 18.8409H238.5V26.0682H240H241.5V18.8409H240ZM240 33.2955H238.5V40.5227H240H241.5V33.2955H240ZM240 47.75H238.5V54.9773H240H241.5V47.75H240ZM240 62.2045H238.5L238.5 69.4318H240H241.5L241.5 62.2045H240ZM240 76.6591H238.5V83.8864H240H241.5V76.6591H240ZM240 91.1136H238.5V98.3409H240H241.5V91.1136H240ZM240 105.568H238.5V112.795H240H241.5V105.568H240ZM240 120.023H238.5V127.25H240H241.5V120.023H240ZM240 134.477H238.5V141.705H240H241.5V134.477H240ZM240 148.932H238.5V156.159H240H241.5V148.932H240ZM240 163.386H238.5V167H240H241.5V163.386H240Z" fill="url(#bottomGradient)"/>
        </svg>
      </div>
    </div>
  );
}
