import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

interface Month {
  value: string;
  label: string;
}

interface MonthSelectProps {
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
}

const MonthSelect: React.FC<MonthSelectProps> = ({
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
      <Select.Trigger className="flex items-center justify-between w-32 px-4 py-2 text-sm border rounded-md shadow-sm bg-white border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200">
          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
            <ChevronUp className="w-4 h-4" />
          </Select.ScrollUpButton>
          
          <Select.Viewport className="p-1">
            {months.map((month) => (
              <Select.Item
                key={month.value}
                value={month.value}
                className="relative flex items-center h-8 px-6 py-2 text-sm rounded-md select-none hover:bg-blue-100 focus:bg-blue-100 focus:outline-none data-[highlighted]:bg-blue-100 data-[highlighted]:text-blue-900"
              >
                <Select.ItemText>{month.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-1 inline-flex items-center">
                  <Check className="w-4 h-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          
          <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
            <ChevronDown className="w-4 h-4" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default MonthSelect;
