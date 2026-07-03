import { useState, useEffect, useRef } from "react";

/**
 * useIntersectionObserver — Hook personalizado para detectar cuando un
 * elemento entra al viewport del usuario.
 *
 * Principios aplicados:
 *  - Single Responsibility: solo se encarga de observar intersecciones.
 *  - Reutilizable: puede usarse en cualquier componente que necesite
 *    animaciones on-scroll o lazy loading.
 *
 * @param {IntersectionObserverInit} options - Opciones del IntersectionObserver
 * @returns {[React.RefObject, boolean]} - [ref del elemento, si está visible]
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Una vez visible, dejamos de observar (optimización de performance)
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options },
    );

    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup: desconectamos el observer al desmontar el componente
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};
