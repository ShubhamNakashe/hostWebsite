
import React from 'react';
import loader from '../assets/loader.gif';

function Loader() {
  return (
    <div className="loading text-center">
      <h2>Cooking up your journey map like a travel-savvy chef with a sprinkle of wanderlust and a dash of spontaneity!</h2>
      <img
        src={loader}
        alt="Loading..."
        width="200px"
      />
    </div>
  );
}

export default Loader;
