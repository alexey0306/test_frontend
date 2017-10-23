/*
	Name: validate.js
	Purpose: File holds all Form validation functions
	Created: 23.10.2017
	Author: Alexey Zelenkin
*/

// Import section
import React from 'react';

// Validate functions
export function groupValidate(values){
	const errors = {};

	if (!values.name){
		errors.username = "Required";
	}
	else if (values.name.length > 64) {
    	errors.username = 'Must be 64 characters or less'
  	}
	return errors;
}
