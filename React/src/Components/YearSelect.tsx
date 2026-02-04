import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

interface Year {
  value: string;
  label?: string;
}

interface YearSelectProps {
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const YearSelect: React.FC<YearSelectProps> = ({
  onValueChange,
  defaultValue,
  placeholder = "Selecione um Ano",
  disabled = false,
}) => {
  const years: Year[] = [
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
    { value: '2028', label: '2028' },
    { value: '2029', label: '2029' },
    { value: '2030', label: '2030' },
    { value: '2031', label: '2031' },
    { value: '2032', label: '2032' },
    { value: '2033', label: '2033' }
  ];

  return (
    <Select.Root 
      onValueChange={onValueChange} 
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <Select.Trigger className="flex items-center justify-between w-36 px-4 py-2 text-sm font-medium border border-zinc-700 bg-zinc-900 text-zinc-100 rounded-md shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md shadow-lg border border-zinc-700 bg-zinc-900 animate-fade-in">
          <Select.ScrollUpButton className="flex items-center justify-center h-6 text-zinc-400 cursor-default">
            <ChevronUp className="w-4 h-4" />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            {years.map((ano) => (
              <Select.Item
                key={ano.value}
                value={ano.value}
                className="relative flex items-center h-8 px-6 py-2 text-sm rounded-md select-none hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none data-[highlighted]:bg-blue-600 data-[highlighted]:text-white transition-colors cursor-pointer"
              >
                <Select.ItemText>{ano.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-1 inline-flex items-center">
                  <Check className="w-4 h-4 text-blue-400" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-6 text-zinc-400 cursor-default">
            <ChevronDown className="w-4 h-4" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};


