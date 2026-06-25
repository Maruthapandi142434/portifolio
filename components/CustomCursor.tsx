'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animateCursor = () => {
      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${targetX}px`;
        cursorRef.current.style.top = `${targetY}px`;
      }

      rafId = requestAnimationFrame(animateCursor);
    };

    rafId = requestAnimationFrame(animateCursor);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');

    const handleElementHover = (isHovering: boolean) => {
      if (cursorInnerRef.current) {
        if (isHovering) {
          cursorInnerRef.current.style.width = '48px';
          cursorInnerRef.current.style.height = '48px';
        } else {
          cursorInnerRef.current.style.width = '32px';
          cursorInnerRef.current.style.height = '32px';
        }
      }
    };

    const hoverListeners: { element: Element; enter: () => void; leave: () => void }[] = [];

    interactiveElements.forEach((element) => {
      const enter = () => handleElementHover(true);
      const leave = () => handleElementHover(false);
      element.addEventListener('mouseenter', enter);
      element.addEventListener('mouseleave', leave);
      hoverListeners.push({ element, enter, leave });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);

      hoverListeners.forEach(({ element, enter, leave }) => {
        element.removeEventListener('mouseenter', enter);
        element.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 opacity-0 transition-opacity duration-300"
      style={{
        width: '32px',
        height: '32px',
        marginLeft: '-16px',
        marginTop: '-16px',
      }}
    >
      <div
        ref={cursorInnerRef}
        className="w-8 h-8 border border-white rounded-full transition-all duration-300"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
