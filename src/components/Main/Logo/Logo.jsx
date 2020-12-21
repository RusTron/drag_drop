import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image } from './Image';

type LogoProps = {
  setDragOver: (loading: boolean) => any
};

export const Logo = ({ setDragOver } :LogoProps):Object => {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const getUrl = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setLoading(false);
      setImageURL(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles, e): void => {
    setDragOver(false);
    setLoading(true);

    if (!(e.type === 'change')) return;
    const file = e.target.files[0];
    getUrl(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const dropElement = (e) => {
    setDragOver(false);
    setLoading(true);
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    getUrl(file);
  };

  return (
    <>
      <div
        className="container"
      >
        <div className="container__logo">
          <input
            {...getInputProps()}// eslint-disable-line
            onDrop={dropElement}
            className="container__logo--input"
            id="container-input"
          />
          <label
            htmlFor="container-input"
            onDrop={dropElement}
          >
            <Image url={imageURL} />
          </label>
          {loading && (
            <div className="container__logo--loader" />
          )}
        </div>
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
                <span
                  className="container--upload"
                  {...getRootProps()} // eslint-disable-line
                >
                  {imageURL
                    ? 'Select file to replace'
                    : 'Select file to upload'}
                </span>
              </p>
            </>
          ) : (
            <>
              <p>
                Loading
              </p>
              <span className="container--separator">- or -</span>
              <p>
                <span
                  className="container--upload"
                  {...getRootProps()} // eslint-disable-line
                >
                  Cancel
                </span>
              </p>
            </>
          )}
      </div>
    </>
  )
};
