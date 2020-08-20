import React from 'react';
import './GridContainer.css';

const GridContainer = ({ children }) => {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return (
        <div className="row">
          <div className="four wide column">
            {child}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="grid-container">
      <div className="ui middle aligned center aligned grid">
        {renderChildren()}
      </div>
    </div>
  );
};

export default GridContainer;
