import React from 'react';
import classNames from 'classnames';

const Cell = ({ x, y, children }) => {
  const blackBg = (x % 2 !== 0 && y % 2 === 0) || (x % 2 === 0 && y % 2 !== 0);

  return <div className={classNames('box', { 'black-bg': blackBg })}>{children}</div>;
};

export default Cell;
