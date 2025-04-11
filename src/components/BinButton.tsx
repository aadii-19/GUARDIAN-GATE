import React from 'react';

const BinButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="bin-button" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 7" className="bin-top">
        <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line>
        <line strokeWidth="3" stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1="12"></line>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 39" className="bin-bottom">
        <mask fill="white" id="path-1-inside-1_8_19">
          <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
        </mask>
        <path
          mask="url(#path-1-inside-1_8_19)"
          fill="white"
          d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35H0C0 37.2091 1.79086 39 4 39V43ZM29 43C33.4183 43 37 39.4183 37 35H33C33 37.2091 31.2091 39 29 39V43Z"
        ></path>
      </svg>
      <img
        className="garbage"
        src="https://cdn-icons-png.flaticon.com/512/679/679922.png"
        alt="trash"
      />
    </button>
  );
};

export default BinButton;
