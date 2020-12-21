import React, { useState } from 'react';
import { Logo } from './Logo';

export const Main = ():Object => {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      className="component"
      id="component"
    >
      <div className="component__header">
        <h2 className="component__header--title">Company Logo</h2>
        <p className="component__header--text">
          Logo should be square, 100px size and in png, jpeg file format.
        </p>
      </div>
      <div
        className="component__body"
        onDragOver={() => setDragOver(true)}
        onDragLeave={() => setDragOver(false)}
        onDrop={() => setDragOver(false)}
        style={{ backgroundColor: dragOver ? '#F5F9FF' : '#fff' }}
      >
        <Logo
          setDragOver={setDragOver}
        />
      </div>
    </div>
  );
};
