import { useEffect, useState, useRef } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref: elementRef, isVisible };
};

export const useMultipleScrollAnimations = (count: number, options: UseScrollAnimationOptions = {}) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setVisibleItems(prev => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(index);
                if (triggerOnce) {
                  observer.unobserve(entry.target);
                }
              } else if (!triggerOnce) {
                newSet.delete(index);
              }
              return newSet;
            });
          }
        });
      },
      { threshold, rootMargin }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [count, options]);

  const setRef = (index: number) => (ref: HTMLDivElement | null) => {
    refs.current[index] = ref;
  };

  return { setRef, visibleItems };
};