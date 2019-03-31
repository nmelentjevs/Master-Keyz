import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectList = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectList.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectList;
