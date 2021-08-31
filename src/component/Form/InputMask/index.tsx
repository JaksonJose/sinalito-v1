import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import InputMask from 'react-input-mask';

type InputType = {
    name: string,
    mask: string,
    label: string
}

export default function Mask({name, label, ...rest}: InputType){
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
      <InputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
    </div>
    
  );
  
}