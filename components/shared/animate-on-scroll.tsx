"use client";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Temporarily disabled animations to debug render issue
export function AnimateOnScroll({ children, className = "" }: AnimateOnScrollProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
