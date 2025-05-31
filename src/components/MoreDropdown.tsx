import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface MoreDropdownProps {
  iconClass?: string;
  dropdownClass?: string;
  buttonClass?: string;
  menuClass?: string;
  children?: ReactNode;
}

const MoreDropdown: React.FC<MoreDropdownProps> = ({
  iconClass = "bi bi-three-dots-vertical",
  dropdownClass = "",
  buttonClass = "",
  menuClass = "",
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={`relative w-fit ${dropdownClass}`} ref={dropdownRef}>
      <button
        className={`border w-9 h-9 cursor-pointer hover:bg-white hover:text-black flex items-center justify-center rounded-lg ${buttonClass}`}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <i className={iconClass}></i>
      </button>

      {isOpen && (
        <div
          className={`absolute top-[88%] mt-2 z-40 right-0 overflow-hidden shadow-md shadow-gray-900 rounded-md ${menuClass}`}
        >
          {children ? (
            <div className="">{children}</div>
          ) : (
            <div className="px-4 py-2 text-gray-500">No content available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoreDropdown;