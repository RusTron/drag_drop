import React from 'react';
import logo from '../../../images/logo.svg';

type LogoInputProps = {
  url: string | ArrayBuffer | null,
  onChange: func
};

export const LogoInput = ({ url, onChange }:LogoInputProps):Object => (
  <>
    <input
      type="file"
      onChange={onChange}
      className="container__logo--input"
      id="container-input"
    />
    <label
      onDrop={onChange}
      onDragOver={(e) => e.preventDefault()}
      htmlFor="container-input"
    >
      <img
        src={url || logo}
        alt=""
        className="container__logo--image"
      />
    </label>
  </>
);
