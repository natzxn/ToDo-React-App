import React, { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className='Main'>
      {children}
    </main>
  );
}

export default Main;
