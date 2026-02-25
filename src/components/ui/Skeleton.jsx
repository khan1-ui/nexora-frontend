import React from 'react';
const Skeleton = ({ className }) => {
  return (
    <div
      className={`bg-gray-200 dark:bg-slate-800 animate-pulse rounded-xl ${className}`}
    />
  );
};

export default Skeleton;
