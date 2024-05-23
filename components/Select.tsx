import { Select, SelectItem, Avatar, SelectSection } from "@nextui-org/react";
import Image from "next/image";
import arrow from "../public/images/arrow.svg";
export default function LangDropdown({
  data,
  type = "",
  customClass,
  valueClass,
  hasImage,
  placeholderIconOff,
}: any) {
  return (
    <div className="">
      <Select
        aria-label="Select language"
        items={data}
        placeholder={
          <div
            className={`flex items-center ${
              type === "sort" && "justify-center"
            }  gap-2`}
          >
            {placeholderIconOff
              ? null
              : hasImage && (
                  <Image
                    className="flex-shrink-0 max-w-5 h-auto"
                    src={data[0].img}
                    alt={data[0].name}
                    height={9}
                    width={14}
                  />
                )}
            <p className="text-white">
              {type === "sort" ? "Sort By" : data[0].name}
            </p>
          </div>
        }
        className="font-medium"
        classNames={{
          selectorIcon: "!relative right-[unset] flex-shrink-0",
          label: "group-data-[filled=true]:-translate-y-5",
          trigger: [
            `!text-white bg-black-700 hover:bg-gray-800 font-medium rounded-lg !h-[unset] !min-h-[unset] ${valueClass} text-xs ${
              customClass ? customClass : " px-4 py-2"
            } `,
            "data-[hover=true]:bg-gray-800",
            `${type === "sort" ? "flex-row-reverse" : ""}`,
          ],
          listboxWrapper: "max-h-[200px]",
          listbox: "p-0 item-divider",
          innerWrapper: "!w-full !h-[unset] !min-h-[unset]",
          value: `${valueClass} !overflow-visible !text-white !w-full `,
        }}
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
        renderValue={(items) => {
          return items.map((item) => (
            <div
              key={item.key}
              className={`flex items-center  ${
                type === "sort" && "justify-center flex-row-reverse"
              } gap-2`}
            >
              {hasImage && (
                <Image
                  className={`flex-shrink-0 max-w-5 h-auto ${
                    type === "sort" && "ml-auto"
                  }`}
                  src={item.data.img}
                  alt={item.data.name}
                  height={9}
                  width={14}
                />
              )}
              <p className={`${type === "sort" && "ml-auto"}`}>
                {item.data.name}
              </p>
            </div>
          ));
        }}
      >
        {(user) => (
          <SelectItem key={user.id} textValue={user.name}>
            <div className={`flex gap-2 items-center justify-between`}>
              <p className={`${type === "sort" && "ml-auto"}`}>{user.name}</p>
              {hasImage && (
                <Image
                  className={`flex-shrink-0 max-w-5 h-auto ${type === "sort" && "ml-auto"}`}
                  src={user.img}
                  alt={user.name}
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
