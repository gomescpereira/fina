import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

interface Month {
  value: string;
  label?: string;
}

interface MonthSelectProps {
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const MonthSelect: React.FC<MonthSelectProps> = ({
  onValueChange,
  defaultValue,
  placeholder = "Selecione um mês",
  disabled = false,
}) => {
  const months: Month[] = [
    { value: '01', label: 'Jan' },
    { value: '02', label: 'Fev' },
    { value: '03', label: 'Mar' },
    { value: '04', label: 'Abr' },
    { value: '05', label: 'Mai' },
    { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' },
    { value: '08', label: 'Ago' },
    { value: '09', label: 'Set' },
    { value: '10', label: 'Out' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dez' }
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
            {months.map((month) => (
              <Select.Item
                key={month.value}
                value={month.value}
                className="relative flex items-center h-8 px-6 py-2 text-sm rounded-md select-none hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none data-[highlighted]:bg-blue-600 data-[highlighted]:text-white transition-colors cursor-pointer"
              >
                <Select.ItemText>{month.label}</Select.ItemText>
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


