import React, { useState, useMemo } from 'react';
import { Select, SelectItem, SelectProps, SelectedItems } from '@nextui-org/react';
import Image from 'next/image';

interface DataItem {
  id: string | number;
  name: string;
  img?: string;
}

interface LangDropdownProps {
  data: DataItem[];
  type?: 'sort' | '';
  customClass?: string;
  valueClass?: string;
  hasImage?: boolean;
  placeholderIconOff?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function LangDropdown({
  data,
  type = '',
  customClass = '',
  valueClass = '',
  hasImage = false,
  placeholderIconOff = false,
  defaultValue = '',
  onChange,
}: LangDropdownProps) {
  // Initialize the selected value with either the default or first data item
  const defaultItem = data.find((item) => item.name === defaultValue) || data[0];
  const [selectedValue, setSelectedValue] = useState(defaultItem.id.toString());

  // Find the currently selected item using useMemo for optimization
  const selectedItem = useMemo(() => data.find((item) => item.id.toString() === selectedValue), [data, selectedValue]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (onChange) onChange(value);
  };

  const renderValue = () => {
    if (!selectedItem) return null;

    return (
      <div className={`flex items-center ${type === 'sort' ? 'justify-center flex-row-reverse' : ''} gap-2`}>
        {hasImage && selectedItem.img && (
          <Image
            className="flex-shrink-0 max-w-5 h-auto"
            src={selectedItem.img}
            alt={selectedItem.name}
            height={9}
            width={14}
          />
        )}
        <p>{selectedItem.name}</p>
      </div>
    );
  };

  // Common styles for dropdown elements
  const selectClassNames: SelectProps['classNames'] = {
    selectorIcon: '!relative right-[unset] flex-shrink-0',
    label: 'group-data-[filled=true]:-translate-y-5',
    trigger: [
      `!text-white bg-black-700 hover:bg-gray-800 font-medium rounded-lg !h-[unset] !min-h-[unset] ${valueClass} text-xs ${customClass}`,
      'data-[hover=true]:bg-gray-800',
      type === 'sort' ? 'flex-row-reverse' : '',
    ],
    listboxWrapper: 'max-h-[200px]',
    listbox: 'p-0 item-divider',
    innerWrapper: '!w-full !h-[unset] !min-h-[unset]',
    value: `${valueClass} !overflow-visible !text-white !w-full`,
  };

  return (
    <div className="">
      <Select
        aria-label="Select option"
        items={data}
        selectedKeys={[selectedValue]}
        className="font-medium"
        classNames={selectClassNames}
        onChange={handleSelectionChange}
        renderValue={renderValue}
      >
        {data.map((item) => (
          <SelectItem key={item.id} textValue={item.name} className={item.id.toString() === selectedValue ? 'hidden' : ''}>
            <DropdownItem item={item} hasImage={hasImage} type={type} />
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

// Separate dropdown item rendering logic
interface DropdownItemProps {
  item: DataItem;
  hasImage: boolean;
  type: 'sort' | '';
}

const DropdownItem: React.FC<DropdownItemProps> = ({ item, hasImage, type }) => (
  <div className={`flex gap-2 items-center justify-between`}>
    <p className={type === 'sort' ? 'ml-auto' : ''}>{item.name}</p>
    {hasImage && item.img && (
      <Image
        className={`flex-shrink-0 max-w-5 h-auto ${type === 'sort' ? 'ml-auto' : ''}`}
        src={item.img}
        alt={item.name}
        height={9}
        width={14}
      />
    )}
  </div>
);
