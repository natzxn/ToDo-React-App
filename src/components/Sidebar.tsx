import React, { ReactElement, ReactNode, useEffect, useRef, useContext } from 'react';
import { TodoContext } from '../context';

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps): ReactElement => {
  // CONTEXT
  const contextValue = useContext(TodoContext);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contextValue) {
      return; // TERMINATE EFFECT IF contextVale doesn't exist
    }

    //HANDLE CLICK
    const handleClick = (e: MouseEvent) => {
      if (e.target === sidebarRef.current || sidebarRef.current?.contains(e.target as Node)) {
        contextValue.setSelectedTodo(undefined);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [contextValue]);


  return (
    <div className='Sidebar' ref={sidebarRef}>
      {children}
    </div>
  );
};

export default Sidebar;
