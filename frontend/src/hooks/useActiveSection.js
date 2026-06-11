import { useEffect, useRef, useState } from "react";

export function useActiveSection(sectionIds, offset = 140) {
  const [active, setActive] = useState(sectionIds[0] ?? "#home");
  const elementsRef = useRef(new Map());

  useEffect(() => {
    elementsRef.current.clear();
    sectionIds.forEach((id) => {
      const el = document.querySelector(id);
      if (el) elementsRef.current.set(id, el);
    });

    const updateActive = () => {
      const scrollPos = window.scrollY + offset;
      let current = sectionIds[0];

      for (const [id, el] of elementsRef.current) {
        if (el.offsetTop <= scrollPos) {
          current = id;
        }
      }

      setActive(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActive);
      elementsRef.current.clear();
    };
  }, [sectionIds, offset]);

  return active;
}
