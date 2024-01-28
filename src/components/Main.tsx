import React, { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <div className='Main'>
      {children}
    </div>
  );
}

export default Main;