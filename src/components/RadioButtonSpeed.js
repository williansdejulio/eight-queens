import React from 'react';

export default function RadioButtonSpeed({ speed, onChange, disabled }) {
  const onChangeEvent = e => {
    onChange(e.target.value);
  };

  return (
    <div className="row" style={{ justifyContent: 'center' }}>
      <div className="col-xs-3">
        <input
          type="radio"
          name="speed"
          id="slow"
          value="slow"
          checked={speed === 'slow'}
          onChange={onChangeEvent}
          disabled={disabled}
        />
        <label htmlFor="slow">Slow</label>
      </div>

      <div className="col-xs-3">
        <input
          type="radio"
          name="speed"
          id="fast"
          value="fast"
          checked={speed === 'fast'}
          onChange={onChangeEvent}
          disabled={disabled}
        />
        <label htmlFor="fast">Fast</label>
      </div>

      <div className="col-xs-5">
        <input
          type="radio"
          name="speed"
          id="superfast"
          value="superfast"
          checked={speed === 'superfast'}
          onChange={onChangeEvent}
          disabled={disabled}
        />
        <label htmlFor="superfast">Super Fast</label>
      </div>
    </div>
  );
}
