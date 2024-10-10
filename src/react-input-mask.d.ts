// src/react-input-mask.d.ts
declare module 'react-input-mask' {
    import * as React from 'react';
  
    interface InputMaskProps {
      mask: string;
      value: string;
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
      placeholder?: string;
      maskChar?: string | null;
      [key: string]: any; // Allow other props
    }
  
    const InputMask: React.FC<InputMaskProps>;
  
    export default InputMask;
  }
  