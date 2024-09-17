import { Slider } from "@nextui-org/react";
import React from "react";

export default function RangeSlider() {
  return (
    <Slider
      label="Price Range"
      step={100}
      maxValue={100}
      minValue={20}
      defaultValue={[0, 8400]}
      showSteps
      showTooltip
      disableThumbScale
      formatOptions={{ style: "currency", currency: "USD" }}
      tooltipValueFormatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
      classNames={{
        base: "max-w-md",
        filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
        labelWrapper: "mb-2",
        label: "font-medium text-default-700",
        value: "font-medium text-default-500",
        thumb: "transition-size bg-gradient-to-r from-secondary-400 to-primary-500 data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20 data-[dragging=true]:w-7 data-[dragging=true]:h-7",
        step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
      }}
      tooltipProps={{
        offset: 10,
        placement: "bottom",
        classNames: {
          base: "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
          content: "py-2 shadow-xl text-white bg-gradient-to-r from-secondary-400 to-primary-500",
        },
      }}
    />
  );
}
