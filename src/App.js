import React, { useState, useEffect, useRef } from 'react';
import './style.css';

function BulletRow({ divs, activeIndex, onBulletClick }) {
  return (
    <div className="bullet-container">
      {divs.map((div, index) => (
        <div
          key={index}
          className={`bullet ${index === activeIndex ? 'active' : ''}`}
          onClick={() => onBulletClick(index)}
        />
      ))}
    </div>
  );
}

export default function App() {
  const containerRef = useRef(null);
  const scrollableRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const scrollable = scrollableRef.current;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const divs = Array.from(scrollable.children);
      let visibleIndex = 0;

      divs.forEach((div, index) => {
        if (scrollLeft >= div.offsetLeft && scrollLeft < div.offsetLeft + div.clientWidth) {
          visibleIndex = index;
        }
      });

      setActiveIndex(visibleIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const divs = [
    'algo', 'para', 'scrollar', 'ao', 'clicar', 'com', 'o', 'mouse', 'um', 'texto', 'muito', 'longo'
  ];

  const scrollToDiv = (index) => {
    const div = scrollableRef.current.children[index];
    containerRef.current.scrollLeft = div.offsetLeft;
  };

  return (
    <div className="App">
      <div className="container" ref={containerRef}>
        <div className="scrollable" ref={scrollableRef}>
          {divs.map((text, index) => (
            <div key={index}>{text}</div>
          ))}
        </div>
      </div>
      <BulletRow divs={divs} activeIndex={activeIndex} onBulletClick={scrollToDiv} />
    </div>
  );
}
