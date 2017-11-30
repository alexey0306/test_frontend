/*
	Name: render_fields.js
	Purpose: File holds all Render Component functions for Redux forms
	Created: 23.10.2017
	Author: Alexey Zelenkin
*/

// Import section
import React from 'react';

// Render fields
export const renderField = ({input,label,placeholder,type,meta: {touched, error, warning}}) => (
	<div className={`form-group ${ touched && error ? 'has-error' : '' }`}>
		<label>{label}</label>
		<div>
			<input
				className="form-control" {...input} 
				placeholder={placeholder} 
				type={type}
			/>
			{touched && ((error && <div className="help-block">{error}</div>)) }
		</div>
	</div>
);

export const textAreaField = ({input,label,placeholder,type,meta: {touched, error, warning}}) => (
	<div className={`form-group ${ touched && error ? 'has-error' : '' }`}>
		<label>{label}</label>
		<div>
			<textarea 
				className="form-control" {...input} 
				placeholder={placeholder} 
				type={type}
			></textarea>
			{touched && ((error && <div className="help-block">{error}</div>)) }
		</div>
	</div>
);

export const textAreaField_lg = ({input,label,placeholder,type,meta: {touched, error, warning}}) => (
	<div className={`form-group ${ touched && error ? 'has-error' : '' }`}>
		<label>{label}</label>
		<div>
			<textarea rows="20"
				className="form-control" {...input} 
				placeholder={placeholder} 
				type={type}
			></textarea>
			{touched && ((error && <div className="help-block">{error}</div>)) }
		</div>
	</div>
);


export const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
  <div className={`form-group ${ touched && error ? 'has-error' : '' }`}>
    <label>{label}</label>
    <div>
      <select className="form-control" {...input}>
        {children}
      </select>
      {touched && ((error && <div className="help-block">{error}</div>)) }
    </div>
  </div>
)