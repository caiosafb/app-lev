import { useState } from 'react';

const useCpf = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const formatCPF = (cpf) => {
    return cpf
      .replace(/\D/g, '') 
      .replace(/(\d{3})(\d)/, '$1.$2') 
      .replace(/(\d{3})(\d)/, '$1.$2') 
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
  };

  const handleChange = (e) => {
    setValue(formatCPF(e.target.value));
  };

  return [value, handleChange];
};

export default useCpf;
