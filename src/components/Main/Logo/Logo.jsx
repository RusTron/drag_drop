import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image } from './Image';

type LogoProps = {
  setDragOver: (loading: boolean) => any
};

export const Logo = ({ setDragOver } :LogoProps):Object => {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [canNotBeLoaded, setCanNotBeLoaded] = useState(false);

  const getUrl = (file) => {
    if (!file || !(/(jpeg)/g.test(file.type) || /(png)/g.test(file.type))) {
      setCanNotBeLoaded(true);

      setTimeout(() => {
        setCanNotBeLoaded(false);
      }, 3000);

      return setLoading(false);
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setLoading(false);
      setImageURL(fileReader.result);
    };
    return fileReader.readAsDataURL(file);
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles, e): void => {
    setDragOver(false);
    setLoading(true);
    if (!(e.type === 'change')) return;
    const file = e.target.files[0];
    getUrl(file);
  }, [setDragOver]);

  const { getInputProps } = useDropzone({ onDrop });

  const dropElement = (e) => {
    setDragOver(false);
    setLoading(true);
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    getUrl(file);
  };

  return (
    <>
      <div className="container">
        <div
          className="container__logo"
        >
          <input
            {...getInputProps()}// eslint-disable-line
            className="container__logo--input"
            id="container-input"
          />
          <label
            onDrop={dropElement}
            htmlFor="container-input"
          >
            <Image url={imageURL} />
          </label>
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
              <p>
                Loading
              </p>
              <span className="container--separator">- or -</span>
              <p>
                <span>
                  Cancel
                </span>
              </p>
            </>
          )}
      </div>
    </>
  );
};
