import React, { useState } from 'react';

export function ComboBox() {

  //const SelectExample = () => {
  const [selectedOption, setSelectedOption] = useState('');   
  

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value)
 }

  return (
    <select value={selectedOption} onChange={handleChange}>
      <option value="">Selecione...</option>
      <option value="option1">Opção 1</option>
      <option value="option2">Opção 2</option>
      <option value="option3">Opção 3</option>
    </select>
  )


  
}