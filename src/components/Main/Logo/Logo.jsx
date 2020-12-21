import React, { useState } from 'react';
import { LogoInput } from './LogoInput';

type LogoProps = {
  setDragOver: (loading: boolean) => any
};

export const Logo = ({ setDragOver } :LogoProps):Object => {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [canNotBeLoaded, setCanNotBeLoaded] = useState(false);

  const getUrl = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setLoading(false);
      setImageURL(fileReader.result);
    };
    return fileReader.readAsDataURL(file);
  };

  const stopLoading = () => {
    setCanNotBeLoaded(true);
    setTimeout(() => {
      setCanNotBeLoaded(false);
    }, 3000);
    return setLoading(false);
  };

  const dropElement = (e) => {
    setDragOver(false);
    setLoading(true);
    e.preventDefault();
    const file = e.type === 'change' ? e.target.files[0] : e.dataTransfer.files[0];
    return !file || !(/(jpeg)/g.test(file.type) || /(png)/g.test(file.type)) ? stopLoading() : getUrl(file);
  };

  return (
    <>
      <div className="container">
        <div className="container__logo">
          <LogoInput
            url={imageURL}
            onChange={dropElement}
          />
          {loading && (
            <div className="container__logo--loader" />
          )}
        </div>
        {canNotBeLoaded && (
          <span className="container--notification">Only for png or jpeg file format</span>
        )}
        {!loading
          ? (
            <>
              <p className="container--drop">
                {imageURL
                  ? 'Drag & drop here to replace'
                  : 'Drag & drop here'}
              </p>
              <span className="container--separator">- or -</span>
              <p>
                <label
                  htmlFor="container-input"
                  className="container--upload"
                >
                  {imageURL
                    ? 'Select file to replace'
                    : 'Select file to upload'}
                </label>
              </p>
            </>
          ) : (
            <>
              <p>Loading</p>
              <span className="container--separator">- or -</span>
              <p>
                <span>Cancel</span>
              </p>
            </>
          )}
      </div>
    </>
  );
};
