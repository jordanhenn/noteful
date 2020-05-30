import React from 'react';
import PropTypes from 'prop-types';

export default function ValidationError(props) {
  if(props.message) {
    return (
      <h5>{props.message}</h5>
    );
  }

  return <></>
}

ValidationError.propTypes = {
    message: PropTypes.string
};