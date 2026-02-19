import React, { ReactNode } from 'react';
import '../index.css';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`container fade-in ${className}`} style={{ padding: '60px 20px' }}>
      {children}
    </section>
  );
};

export default SectionContainer;
