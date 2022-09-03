import React from 'react';
import Queries from './savedQueries';
import Calculator from './calculator';

// Concatenates the calculator and savedQueries components to single page for routing purposes
function QueryPage() {
  return (
    <div>
      <Calculator />
      <Queries />
    </div>
  );
}

export default QueryPage;