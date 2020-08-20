import React from 'react';

/**
 * title: String containing the text in this header
 * logo: object containing 'src' and 'alt' attributes
 *    src is a URL to the image
 *    alt is a string with the alternative description of the image/logo
 */
const FormHeader = ({ title, logo }) => {
  const renderImgTag = () => {
    if (logo) {
      return (
        <img
          className="ui image"
          src={logo.src}
          alt={logo.alt}
        />
      );
    }
  };

  const renderClassname = () => {
    return `ui ${logo ? 'image ' : ''}header`;
  };

  return (
    <h2 className={renderClassname()}>
      {renderImgTag()}
      <div className="content">
        {title}
      </div>
    </h2>
  );
};

export default FormHeader;
