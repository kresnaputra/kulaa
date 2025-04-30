import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface CardTitleProps {
  title: string;
  children: React.ReactNode;
}

// Generalized scroll function - adjusted type to accept null
const scrollContainer = (
  ref: React.RefObject<HTMLDivElement | null>,
  direction: "left" | "right"
) => {
  if (ref.current) {
    const scrollAmount = 300; // Adjust scroll amount as needed
    const currentScroll = ref.current.scrollLeft;
    const newScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;
    ref.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  }
};

const checkScrollBounds = (
  ref: React.RefObject<HTMLDivElement | null>,
  setAtStart: React.Dispatch<React.SetStateAction<boolean>>,
  setAtEnd: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (ref.current) {
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    const tolerance = 1; // Tolerance for floating point inaccuracies
    // Use requestAnimationFrame to ensure state updates after DOM reflow
    requestAnimationFrame(() => {
      setAtStart(scrollLeft <= tolerance);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - tolerance);
    });
  }
};

export default function ContainerSection({
  title,
  children,
}: CardTitleProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;

    const handleRestaurantsScroll = () =>
      checkScrollBounds(
        scrollRef,
        setIsAtStart,
        setIsAtEnd
      );

    const handleResize = () => {
      handleRestaurantsScroll();
    };

    // Initial check
    handleResize();

    // Add listeners
    container?.addEventListener("scroll", handleRestaurantsScroll);
    window.addEventListener("resize", handleResize);

    // Cleanup listeners on unmount
    return () => {
      container?.removeEventListener(
        "scroll",
        handleRestaurantsScroll
      );
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          {/* Conditionally render Left button */}
          {!isAtStart && (
            <button
              onClick={() => scrollContainer(scrollRef, "left")}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {/* Conditionally render Right button */}
          {!isAtEnd && (
            <button
              onClick={() => scrollContainer(scrollRef, "right")}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-200"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
      {/* Add ref and hide scrollbar */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
      >
        {children}
      </div>
    </section>
  );
}
