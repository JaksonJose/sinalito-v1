import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

type InputType = {
  name: string,
  type: string,
  label: string
}

export function Input({name, label, ...rest}: InputType){
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value' 
    })
  }, [fieldName, registerField]);

  return (
    <div>
      <label>{label}</label>
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />
    </div>
  )
}