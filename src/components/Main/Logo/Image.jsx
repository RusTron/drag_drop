import React from 'react';
import logo from '../../../images/logo.svg';

type ImageProps = {
  url: string | ArrayBuffer | null
};

export const Image = ({ url }:ImageProps):Object => (
  <img
    src={url || logo}
    alt=""
    className="container__logo--image"
  />
);
