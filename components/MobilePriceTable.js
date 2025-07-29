import { useState } from 'react';

const priceData = [
  {
    id: 1,
    service: "Виклик майстра та діагностика (без ремонту)*",
    price: "150 грн. 70 грн.",
    highlight: false
  },
  {
    id: 2,
    service: "Виклик майстра та діагностика (у разі ремонту)",
    price: "безкоштовно",
    highlight: true
  },
  {
    id: 3,
    service: "Заміна / чистка фільтра",
    price: "від 280",
    highlight: false
  },
  {
    id: 4,
    service: "Усунення засмічення (чистка всіх патрубків, шлангів)",
    price: "від 350",
    highlight: false
  },
  {
    id: 5,
    service: "Заміна насоса (не зливає воду)",
    price: "від 350",
    highlight: false
  },
  {
    id: 6,
    service: "Заміна ТЕНа (не гріє воду)",
    price: "від 320",
    highlight: false
  },
  {
    id: 7,
    service: "Заміна манжети люка (порвався ущільнювач)",
    price: "від 300",
    highlight: false
  },
  {
    id: 8,
    service: "Заміна електро-замка блокування люка (не відкриваються дверцята)",
    price: "від 250",
    highlight: false
  },
  {
    id: 9,
    service: "Заміна підшипників (гримить під час віджиму)",
    price: "від 700",
    highlight: false
  },
  {
    id: 10,
    service: "Ремонт електронного модуля (плати управління)",
    price: "від 600",
    highlight: false
  },
  {
    id: 11,
    service: "Установка та підключення пральної машини",
    price: "450 грн.",
    highlight: false
  }
];

export default function MobilePriceTable() {
  return (
    <div className="mobile-price-container">
      <div className="mobile-price-table">
        {/* Header */}
        <div className="mobile-price-header">
          <h2>Ціни на ремонт пральних машин:</h2>
        </div>
        
        {/* Table Header */}
        <div className="mobile-table-header">
          <div className="mobile-header-cell mobile-header-number">№</div>
          <div className="mobile-header-cell mobile-header-service">Найменування робіт / Тип несправності</div>
          <div className="mobile-header-cell mobile-header-price">Ціна грн.</div>
        </div>
        
        {/* Table Body */}
        <div className="mobile-table-body">
          {priceData.map((item) => (
            <div 
              key={item.id} 
              className={`mobile-table-row ${item.highlight ? 'mobile-table-row-highlight' : ''}`}
            >
              <div className="mobile-table-cell mobile-cell-number">{item.id}</div>
              <div className="mobile-table-cell mobile-cell-service">{item.service}</div>
              <div className={`mobile-table-cell mobile-cell-price ${item.highlight ? 'mobile-price-highlight' : ''}`}>
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
