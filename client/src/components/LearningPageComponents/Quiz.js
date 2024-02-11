import React from 'react';

const Quiz = ({ url }) => {
  return (
    <div>
      <iframe src={url} title="Quiz" width="100%" height="500" />
    </div>
  );
};

export default Quiz;
