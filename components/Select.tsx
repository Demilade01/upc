import React from 'react';
import { Select, SelectItem, SelectProps, SelectedItems } from "@nextui-org/react";
import Image from "next/image";

interface DataItem {
  id: string | number;
  name: string;
  img?: string;
}

interface LangDropdownProps {
  data: DataItem[];
  type?: "sort" | "";
  customClass?: string;
  valueClass?: string;
  hasImage?: boolean;
  placeholderIconOff?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function LangDropdown({
  data,
  type = "",
  customClass,
  valueClass,
  hasImage,
  placeholderIconOff,
  defaultValue,
  onChange,
}: LangDropdownProps) {
  const defaultItem = data.find((item) => item.name === defaultValue) || data[0];

  const renderPlaceholder = (item: DataItem) => (
    <div className={`flex items-center ${type === "sort" ? "justify-center" : ""} gap-2`}>
      {!placeholderIconOff && hasImage && item.img && (
        <Image
          className="flex-shrink-0 max-w-5 h-auto"
          src={item.img}
          alt={item.name}
          height={9}
          width={14}
        />
      )}
      <p className="text-white">
        {type === "sort" ? "Sort By" : item.name}
      </p>
    </div>
  );

  const renderValue = (items: SelectedItems<DataItem>) => {
    return items.map((item) => (
      <div
        key={item.key}
        className={`flex items-center ${type === "sort" ? "justify-center flex-row-reverse" : ""} gap-2`}
      >
        {hasImage && item.data?.img && (
          <Image
            className={`flex-shrink-0 max-w-5 h-auto ${type === "sort" ? "ml-auto" : ""}`}
            src={item.data.img}
            alt={item.data.name}
            height={9}
            width={14}
          />
        )}
        <p className={type === "sort" ? "ml-auto" : ""}>{item?.data?.name}</p>
      </div>
    ));
  };

  const selectClassNames: SelectProps["classNames"] = {
    selectorIcon: "!relative right-[unset] flex-shrink-0",
    label: "group-data-[filled=true]:-translate-y-5",
    trigger: [
      `!text-white bg-black-700 hover:bg-gray-800 font-medium rounded-lg !h-[unset] !min-h-[unset] ${valueClass} text-xs ${customClass || "px-4 py-2"}`,
      "data-[hover=true]:bg-gray-800",
      type === "sort" ? "flex-row-reverse" : "",
    ],
    listboxWrapper: "max-h-[200px]",
    listbox: "p-0 item-divider",
    innerWrapper: "!w-full !h-[unset] !min-h-[unset]",
    value: `${valueClass} !overflow-visible !text-white !w-full`,
  };

  return (
    <div className="">
      <Select
        aria-label="Select option"
        items={data}
        defaultSelectedKeys={[defaultItem.id.toString()]}
        className="font-medium"
        classNames={selectClassNames}
        listboxProps={{
          itemClasses: {
            base: [
              "!outline-none",
              "cursor-pointer focus:!bg-transparent",
              "!rounded-none",
              "!text-white",
              "transition-opacity",
              "data-[hover=true]:!bg-primary",
              "data-[selectable=true]:!text-white",
              "data-[pressed=true]:bg-primary",
              "data-[focus-visible=true]:!outline-0",
              "px-4 py-2",
            ],
            wrapper: ["data-[hover=true]:!bg-primary"],
            title: "!overflow-visible !text-center sort-filter",
            selectedIcon: "!relative hidden",
          },
        }}
        popoverProps={{
          classNames: {
            base: "",
            trigger: "!flex !gap-10",
            content: [
              "!w-full mt-2 origin-top-right bg-black-700/95 rounded-lg px-4 py-2 !text-white overflow-hidden text-sm data-[hover=true]:bg-primary",
              "data-[selectable=true]:!w-full",
              "p-0",
            ],
          },
        }}
        onChange={(e) => onChange && onChange(e.target.value)}
        renderValue={renderValue}
      >
        {(item) => (
          <SelectItem key={item.id} textValue={item.name}>
            <div className={`flex gap-2 items-center justify-between`}>
              <p className={type === "sort" ? "ml-auto" : ""}>{item.name}</p>
              {hasImage && item.img && (
                <Image
                  className={`flex-shrink-0 max-w-5 h-auto ${type === "sort" ? "ml-auto" : ""}`}
                  src={item.img}
                  alt={item.name}
                  height={9}
                  width={14}
                />
              )}
            </div>
          </SelectItem>
        )}
      </Select>
    </div>
  );
}