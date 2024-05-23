"use client";
import { useState } from "react";
import Link from "next/link";
import LangDropdown from "./Select";
import { Slider } from "@nextui-org/react";
import sortIcon from "../public/images/sort.png";
const SortContent = [
  { id: 1, img: sortIcon, name: "Wipe Time" },
  { id: 2, img: sortIcon, name: "Rank" },
  { id: 3, img: sortIcon, name: "AVG Players" },
];
const LanguageAndCountrySelector = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleFilterToggle = () => {
    setToggleMenu(!toggleMenu);
    console.log("clicked");
  };

  return (
    <main>
      <div
        className={`${
          toggleMenu ? "fixed" : "hidden"
        }  inset-0 bg-black/50 z-[2] h-full w-full`}
        id="overlay"
        onClick={() => {
          setToggleMenu(false);
        }}
      ></div>
      <section className="py-5 lg:pt-0 lg:pb-24 lg:mt-[-30px]">
        <div className="container">
          <div className="grid lg:grid-cols-[340px_auto] grid-flow-row-dense  gap-4">
            <div
              className={`${
                toggleMenu ? "active" : ""
              } filter-sidebar  lg:h-max lg:mt-[67px] relative space-y-4 max-w-[340px] flex-shrink-0 bg-black-700/80 rounded-lg p-5 text-white md:block `}
              id="collapsible-content"
            >
              <div className="">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-primary">Filters</h2>
                  <div
                    className="max-lg:block hidden close "
                    id="close"
                    onClick={() => {
                      setToggleMenu(false);
                    }}
                  >
                    <img
                      className="brightness-[10] h-full"
                      src="./images/cancel.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="h-[calc(100%_-_90px)] lg:h-auto overflow-y-auto lg:overflow-visible space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="space-x-1">
                    <span className="inline-block">
                      <img src="./images/cancel.png" alt="" />
                    </span>
                    <span className="inline-block font-bold">Duo</span>
                    <span className="inline-block text-primary italic">
                      (Team Limit)
                    </span>
                  </div>
                  <div className="space-x-1">
                    <span className="inline-block">
                      <img src="./images/cancel.png" alt="" />
                    </span>
                    <span className="font-bold">Europe </span>
                    <span className="text-primary italic">(Region)</span>
                  </div>
                  <div className="space-x-1">
                    <span className="inline-block">
                      <img src="./images/cancel.png" alt="" />
                    </span>
                    <span className="font-bold">20-100 </span>
                    <span className="text-primary italic">
                      (Average Population)
                    </span>
                  </div>
                  <div className="space-x-1">
                    <span className="inline-block">
                      <img src="./images/cancel.png" alt="" />
                    </span>
                    <span className="font-bold">3500-5000</span>
                    <span className="text-primary italic">(Map Size)</span>
                  </div>
                  <button className="text-primary self-start  italic">
                    (reset filters)
                  </button>
                </div>
                <div className="space-y-4 ">
                  <div className="">
                    <label className="block text-xl border-b border-primary pb-2 mb-2">
                      Average population
                    </label>
                    <div className="relative py-3 px-6">
                      <Slider
                        step={30}
                        maxValue={90}
                        minValue={30}
                        defaultValue={[20, 50]}
                        marks={[
                          {
                            value: 30,
                            label: "30",
                          },
                          {
                            value: 60,
                            label: "60",
                          },
                          {
                            value: 90,
                            label: "100",
                          },
                        ]}
                        showSteps={true}
                        showTooltip={true}
                        showOutline={true}
                        disableThumbScale={true}
                        classNames={{
                          base: "max-w-md",
                          filler: "bg-primary",
                          labelWrapper: "mb-2",
                          label: "font-medium text-default-700 text-medium",
                          value: "font-medium text-default-500 text-small",
                          thumb: [
                            "transition-size",
                            "bg-primary h-4 w-4 after:h-3 after:w-3 after:bg-primary ring-primary",
                            "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                            "data-[dragging=true]:w-4 data-[dragging=true]:h-4 data-[dragging=true]:after:h-3 data-[dragging=true]:after:w-3",
                          ],
                          step: "data-[in-range=true]:bg-white dark:data-[in-range=true]:bg-white/50",
                        }}
                        tooltipProps={{
                          offset: 10,
                          placement: "bottom",
                          classNames: {
                            base: [ 
                              "bg-primary",
                            ],
                            content: [
                              "py-2 shadow-xl",
                              "text-white bg-primary",
                            ],
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xl border-b border-primary pb-2 mb-2">
                      Next Wipe
                    </label>
                    <div className="relative py-3 px-6">
                      <Slider
                        step={20}
                        maxValue={50}
                        minValue={10}
                        showSteps={true}
                        showTooltip={true}
                        showOutline={true}
                        disableThumbScale={true}
                        marks={[
                          {
                            value: 10,
                            label: "10min",
                          },
                          {
                            value: 30,
                            label: "20min",
                          },
                          {
                            value: 50,
                            label: "30min",
                          },
                        ]}
                        classNames={{
                          base: "max-w-md",
                          filler: "bg-primary h-3",
                          labelWrapper: "mb-2",
                          label: "font-medium text-default-700 text-medium",
                          value: "font-medium text-default-500 text-small",
                          thumb: [
                            "transition-size",
                            "bg-primary ring-primary after:bg-primary after:shadow-none w-4 h-4 after:h-3 after:w-3",
                            "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                            "data-[dragging=true]:!w-4 data-[dragging=true]:!h-4 data-[dragging=true]:after:!h-2 data-[dragging=true]:after:!w-2",
                          ],
                          step: "data-[in-range=true]:bg-white dark:data-[in-range=true]:bg-white/30",
                        }}
                        tooltipProps={{
                          offset: 10,
                          placement: "bottom",
                          classNames: {
                            base: [
                              // arrow color
                              "bg-primary rounded-lg",
                            ],
                            content: ["py-2 shadow-xl", "bg-primary"],
                          },
                        }}
                      />
                      <div className="slider-range absolute z-10 h-2 bg-primary rounded-lg"></div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xl border-b border-primary pb-2 mb-2">
                      Map Size
                    </label>
                    <div className="relative py-3 px-6">
                      <Slider
                        step={500}
                        maxValue={5000}
                        minValue={3000}
                        defaultValue={[3500, 4500]}
                        marks={[
                          {
                            value: 3000,
                            label: "3000",
                          },
                          {
                            value: 3500,
                            label: "3500",
                          },
                          {
                            value: 4000,
                            label: "4000",
                          },
                          {
                            value: 4500,
                            label: "4500",
                          },
                           {
                            value: 5000,
                            label: "5000",
                          },
                        ]}
                        showSteps={true}
                        showTooltip={true}
                        showOutline={true}
                        disableThumbScale={true}
                        classNames={{
                          base: "max-w-md",
                          filler: "bg-primary",
                          labelWrapper: "mb-2",
                          label: "font-medium text-default-700 text-medium",
                          value: "font-medium text-default-500 text-small",
                          thumb: [
                            "transition-size",
                            "bg-primary h-4 w-4 after:h-3 after:w-3 after:bg-primary ring-primary",
                            "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                            "data-[dragging=true]:w-4 data-[dragging=true]:h-4 data-[dragging=true]:after:h-3 data-[dragging=true]:after:w-3",
                          ],
                          step: "data-[in-range=true]:bg-white dark:data-[in-range=true]:bg-white/50",
                        }}
                        tooltipProps={{
                          offset: 10,
                          placement: "bottom",
                          classNames: {
                            base: [ 
                              "bg-primary rounded-lg",
                            ],
                            content: [
                              "py-2 shadow-xl",
                              "text-white bg-primary",
                            ],
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-3 relative">
                  <div className="region-selector mt-3">
                    <label className="block text-xl border-b border-primary pb-2 mb-2">
                      Region
                    </label>
                    <div className="flex flex-col space-y-2 pl-1">
                      <div className="group checkbox-container">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
                          id="North-America"
                        />
                        <label htmlFor="North-America" className="ml-2">
                          North America
                        </label>
                      </div>
                      <div className="group checkbox-container">
                        <input
                          type="checkbox"
                          id="South-America"
                          className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
                        />
                        <label htmlFor="South-America" className="ml-2">
                          South America
                        </label>
                      </div>
                      <div className="group checkbox-container">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
                          id="Europe"
                        />
                        <label htmlFor="Europe" className="ml-2">
                          Europe
                        </label>
                      </div>
                      <div className="group checkbox-container">
                        <input
                          type="checkbox"
                          id="West-Asia"
                          className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
                        />
                        <label htmlFor="West-Asia" className="ml-2">
                          West Asia
                        </label>
                      </div>
                      <div className="group checkbox-container">
                        <input
                          type="checkbox"
                          id="East-Asia"
                          className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
                        />
                        <label htmlFor="East-Asia" className="ml-2">
                          East Asia
                        </label>
                      </div>
                      <div className="group checkbox-container">
                        <input
                          id="Oceania"
                          type="checkbox"
                          className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
                        />
                        <label htmlFor="Oceania" className="ml-2">
                          Oceania
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="Team-limit">
                      <label className="block text-xl border-b border-primary pb-2 mb-2">
                        Team Limit
                      </label>
                      <div className="flex flex-col space-y-1 pl-1">
                        <div className="group checkbox-container">
                          <input
                            id="solo"
                            type="checkbox"
                            className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
                          />
                          <label htmlFor="solo" className="ml-2">
                            Solo
                          </label>
                        </div>
                        <div className="group checkbox-container">
                          <input
                            id="Duo"
                            type="checkbox"
                            className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
                          />
                          <label htmlFor="Duo" className="ml-2">
                            Duo
                          </label>
                        </div>
                        <div className="group checkbox-container">
                          <input
                            id="Trio"
                            type="checkbox"
                            className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
                          />
                          <label htmlFor="Trio" className="ml-2">
                            Trio
                          </label>
                        </div>
                        <div className="group checkbox-container">
                          <input
                            id="Squad"
                            type="checkbox"
                            className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
                          />
                          <label htmlFor="Squad" className="ml-2">
                            Squad
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2"></div>
                  <div className="Team-UI">
                    <label className="block text-xl border-b border-primary pb-2 mb-2">
                      Team UI
                    </label>
                    <div className="flex flex-col space-y-1 pl-1">
                      <div className="group checkbox-container">
                        <input
                          id="4"
                          type="checkbox"
                          className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
                        />
                        <label htmlFor="4" className="ml-2">
                          4
                        </label>
                      </div>
                      <div className="group checkbox-container">
                        <input
                          type="checkbox"
                          id="8"
                          className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
                        />
                        <label htmlFor="8" className="ml-2">
                          8
                        </label>
                      </div>
                      <div className="group checkbox-container">
                        <input
                          id="16"
                          type="checkbox"
                          className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
                        />
                        <label htmlFor="16" className="ml-2">
                          16
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <button className="w-full  bg-primary rounded-lg p-2 close lg:hidden">
                  Apply
                </button>
              </div>
            </div>

            <div className="">
              <div className="text-right flex justify-center gap-2 relative z-[1] mx-auto lg:max-w-none lg:mx-0">
                <div className="flex-1 filter inline-block lg:hidden ">
                  <div className="relative  text-left w-full">
                    <div className="inline-block w-full">
                      <button
                        className="w-full bg-black-700 text-white hover:bg-gray-800 flex items-center md:justify-[unset] justify-between gap-6 px-4 py-1.5 rounded-lg"
                        id="collapsible-trigger"
                        onClick={handleFilterToggle}
                      >
                        <span className="">Filter</span>
                        <span className="inline-block">
                          <img src="./images/settings-orange.png" alt="" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-1 sort">
                  <div className="inline-block text-right lg:w-[258px] w-full">
                    <LangDropdown
                      data={SortContent}
                      hasImage
                      placeholderIconOff
                      type="sort"
                      valueClass="!text-sm" 
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-5 mt-8">
                <div className="server-wrapper bg-black-700/80 flex md:gap-12 gap-4 items-center md:flex-row flex-col rounded-lg relative md:px-6 md:pe-12 hover:shadow-[5px_5px_20px_0px_#CE402A] transition duration-350 ease-in-out ">
                  <div className="flex max-sm:items-start max-md:p-6 max-md:pb-0 max-md:gap-2">
                    <div className="grid md:grid-cols-[100px_100px] place-content-center">
                      <svg
                        className="h-11 w-11 max-md:h-6 max-md:w-11 fill-none stroke-primary transition duration-300 ease-in-out hover:fill-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.515 7.125 7.485.688-5.421 5.277 1.421 7.323-6.5-3.412-6.5 3.412 1.421-7.323-5.421-5.277 7.485-.688z" />
                      </svg>
                      <img
                        className="md:block hidden self-center"
                        src="./images/england.png"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-lg max-md:text-sm text-white font-extrabold  text-center break-all">
                        RustReborn.gg EU - Bedwars | AimTrain | Creative | Arena
                        | FFA
                      </p>
                      <p className="text-sm text-white text-center max-md:hidden">
                        Rank: <span className="text-primary">1</span> | Type:
                        <span className="text-primary">Modded</span> | AVG
                        Players:
                        <span className="text-primary">450</span>
                      </p>
                    </div>
                  </div>
                  <div className="max-md:w-full flex-shrink-0">
                    <p className="text-sm text-white text-center md:hidden mb-2">
                      Rank: <span className="text-primary">1</span> | Type:
                      <span className="text-primary">Modded</span> | AVG
                      Players:
                      <span className="text-primary">450</span>
                    </p>
                    <div className="bg-primary hover:bg-primary px-2 py-4 max-md:py-1.5 text-white text-center font-medium text-xl  md:min-h-[142px] font-Rammetto flex items-center justify-between flex-col max-md:gap-1.5 max-md:mb-4">
                      <div className="flex flex-col max-md:flex-row">
                        <span>WIPE IN</span>
                        <span className="text-black"> 5h</span>
                      </div>

                      <div className="text-[11px] ">20/05 17:40</div>
                    </div>
                    <button className="bg-transparent h-full w-full md:hidden mb-4 text-white text-lg font-bold inline-block text-center">
                      Connect
                    </button>
                  </div>
                  <img
                    className="absolute right-2 top-2 hidden md:block"
                    src="./images/verified.png"
                    alt=""
                  />
                </div>

                <div className="server-wrapper bg-black-700/80 flex md:gap-12 gap-4 items-center md:flex-row flex-col rounded-lg relative md:px-6 md:pe-12 hover:shadow-[5px_5px_20px_0px_#CE402A] transition duration-350 ease-in-out ">
                  <div className="flex max-sm:items-start max-md:p-6 max-md:pb-0 max-md:gap-2">
                    <div className="grid md:grid-cols-[100px_100px] place-content-center">
                      <svg
                        className="h-11 w-11 max-md:h-6 max-md:w-11 fill-none stroke-primary transition duration-300 ease-in-out hover:fill-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.515 7.125 7.485.688-5.421 5.277 1.421 7.323-6.5-3.412-6.5 3.412 1.421-7.323-5.421-5.277 7.485-.688z" />
                      </svg>
                      <img
                        className="md:block hidden self-center"
                        src="./images/england.png"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-lg max-md:text-sm text-white font-extrabold  text-center break-all">
                        RustReborn.gg EU - Bedwars | AimTrain | Creative | Arena
                        | FFA
                      </p>
                      <p className="text-sm text-white text-center max-md:hidden">
                        Rank: <span className="text-primary">1</span> | Type:
                        <span className="text-primary">Modded</span> | AVG
                        Players:
                        <span className="text-primary">450</span>
                      </p>
                    </div>
                  </div>
                  <div className="max-md:w-full flex-shrink-0">
                    <p className="text-sm text-white text-center md:hidden mb-2">
                      Rank: <span className="text-primary">1</span> | Type:
                      <span className="text-primary">Modded</span> | AVG
                      Players:
                      <span className="text-primary">450</span>
                    </p>
                    <div className="bg-primary hover:bg-primary px-2 py-4 max-md:py-1.5 text-white text-center font-medium text-xl  md:min-h-[142px] font-Rammetto flex items-center justify-between flex-col max-md:gap-1.5 max-md:mb-4">
                      <div className="flex flex-col max-md:flex-row">
                        <span>WIPE IN</span>
                        <span className="text-black"> 5h</span>
                      </div>

                      <div className="text-[11px] ">20/05 17:40</div>
                    </div>
                    <button className="bg-transparent h-full w-full md:hidden mb-4 text-white text-lg font-bold inline-block text-center">
                      Connect
                    </button>
                  </div>
                </div>
                <div className="server-wrapper bg-black-700/80 flex md:gap-12 gap-4 items-center md:flex-row flex-col rounded-lg relative md:px-6 md:pe-12 hover:shadow-[5px_5px_20px_0px_#CE402A] transition duration-350 ease-in-out ">
                  <div className="flex max-sm:items-start max-md:p-6 max-md:pb-0 max-md:gap-2">
                    <div className="grid md:grid-cols-[100px_100px] place-content-center">
                      <svg
                        className="h-11 w-11 max-md:h-6 max-md:w-11 fill-none stroke-primary transition duration-300 ease-in-out hover:fill-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.515 7.125 7.485.688-5.421 5.277 1.421 7.323-6.5-3.412-6.5 3.412 1.421-7.323-5.421-5.277 7.485-.688z" />
                      </svg>
                      <img
                        className="md:block hidden self-center"
                        src="./images/england.png"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-lg max-md:text-sm text-white font-extrabold  text-center break-all">
                        RustReborn.gg EU - Bedwars | AimTrain | Creative | Arena
                        | FFA
                      </p>
                      <p className="text-sm text-white text-center max-md:hidden">
                        Rank: <span className="text-primary">1</span> | Type:
                        <span className="text-primary">Modded</span> | AVG
                        Players:
                        <span className="text-primary">450</span>
                      </p>
                    </div>
                  </div>
                  <div className="max-md:w-full flex-shrink-0">
                    <p className="text-sm text-white text-center md:hidden mb-2">
                      Rank: <span className="text-primary">1</span> | Type:
                      <span className="text-primary">Modded</span> | AVG
                      Players:
                      <span className="text-primary">450</span>
                    </p>
                    <div className="bg-primary hover:bg-primary px-2 py-4 max-md:py-1.5 text-white text-center font-medium text-xl  md:min-h-[142px] font-Rammetto flex items-center justify-between flex-col max-md:gap-1.5 max-md:mb-4">
                      <div className="flex flex-col max-md:flex-row">
                        <span>WIPE IN</span>
                        <span className="text-black"> 5h</span>
                      </div>

                      <div className="text-[11px] ">20/05 17:40</div>
                    </div>
                    <button className="bg-transparent h-full w-full md:hidden mb-4 text-white text-lg font-bold inline-block text-center">
                      Connect
                    </button>
                  </div>
                </div>
                <div className="server-wrapper bg-black-700/80 flex md:gap-12 gap-4 items-center md:flex-row flex-col rounded-lg relative md:px-6 md:pe-12 hover:shadow-[5px_5px_20px_0px_#CE402A] transition duration-350 ease-in-out ">
                  <div className="flex max-sm:items-start max-md:p-6 max-md:pb-0 max-md:gap-2">
                    <div className="grid md:grid-cols-[100px_100px] place-content-center">
                      <svg
                        className="h-11 w-11 max-md:h-6 max-md:w-11 fill-none stroke-primary transition duration-300 ease-in-out hover:fill-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.515 7.125 7.485.688-5.421 5.277 1.421 7.323-6.5-3.412-6.5 3.412 1.421-7.323-5.421-5.277 7.485-.688z" />
                      </svg>
                      <img
                        className="md:block hidden self-center"
                        src="./images/england.png"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-lg max-md:text-sm text-white font-extrabold  text-center break-all">
                        RustReborn.gg EU - Bedwars | AimTrain | Creative | Arena
                        | FFA
                      </p>
                      <p className="text-sm text-white text-center max-md:hidden">
                        Rank: <span className="text-primary">1</span> | Type:
                        <span className="text-primary">Modded</span> | AVG
                        Players:
                        <span className="text-primary">450</span>
                      </p>
                    </div>
                  </div>
                  <div className="max-md:w-full flex-shrink-0">
                    <p className="text-sm text-white text-center md:hidden mb-2">
                      Rank: <span className="text-primary">1</span> | Type:
                      <span className="text-primary">Modded</span> | AVG
                      Players:
                      <span className="text-primary">450</span>
                    </p>
                    <div className="bg-primary hover:bg-primary px-2 py-4 max-md:py-1.5 text-white text-center font-medium text-xl  md:min-h-[142px] font-Rammetto flex items-center justify-between flex-col max-md:gap-1.5 max-md:mb-4">
                      <div className="flex flex-col max-md:flex-row">
                        <span>WIPE IN</span>
                        <span className="text-black"> 5h</span>
                      </div>

                      <div className="text-[11px] ">20/05 17:40</div>
                    </div>
                    <button className="bg-transparent h-full w-full md:hidden mb-4 text-white text-lg font-bold inline-block text-center">
                      Connect
                    </button>
                  </div>
                </div>
                <div className="server-wrapper bg-black-700/80 flex md:gap-12 gap-4 items-center md:flex-row flex-col rounded-lg relative md:px-6 md:pe-12 hover:shadow-[5px_5px_20px_0px_#CE402A] transition duration-350 ease-in-out ">
                  <div className="flex max-sm:items-start max-md:p-6 max-md:pb-0 max-md:gap-2">
                    <div className="grid md:grid-cols-[100px_100px] place-content-center">
                      <svg
                        className="h-11 w-11 max-md:h-6 max-md:w-11 fill-none stroke-primary transition duration-300 ease-in-out hover:fill-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.515 7.125 7.485.688-5.421 5.277 1.421 7.323-6.5-3.412-6.5 3.412 1.421-7.323-5.421-5.277 7.485-.688z" />
                      </svg>
                      <img
                        className="md:block hidden self-center"
                        src="./images/england.png"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-lg max-md:text-sm text-white font-extrabold  text-center break-all">
                        RustReborn.gg EU - Bedwars | AimTrain | Creative | Arena
                        | FFA
                      </p>
                      <p className="text-sm text-white text-center max-md:hidden">
                        Rank: <span className="text-primary">1</span> | Type:
                        <span className="text-primary">Modded</span> | AVG
                        Players:
                        <span className="text-primary">450</span>
                      </p>
                    </div>
                  </div>
                  <div className="max-md:w-full flex-shrink-0">
                    <p className="text-sm text-white text-center md:hidden mb-2">
                      Rank: <span className="text-primary">1</span> | Type:
                      <span className="text-primary">Modded</span> | AVG
                      Players:
                      <span className="text-primary">450</span>
                    </p>
                    <div className="bg-primary hover:bg-primary px-2 py-4 max-md:py-1.5 text-white text-center font-medium text-xl  md:min-h-[142px] font-Rammetto flex items-center justify-between flex-col max-md:gap-1.5 max-md:mb-4">
                      <div className="flex flex-col max-md:flex-row">
                        <span>WIPE IN</span>
                        <span className="text-black"> 5h</span>
                      </div>

                      <div className="text-[11px] ">20/05 17:40</div>
                    </div>
                    <button className="bg-transparent h-full w-full md:hidden mb-4 text-white text-lg font-bold inline-block text-center">
                      Connect
                    </button>
                  </div>
                </div>
                <div className="server-wrapper bg-black-700/80 flex md:gap-12 gap-4 items-center md:flex-row flex-col rounded-lg relative md:px-6 md:pe-12 hover:shadow-[5px_5px_20px_0px_#CE402A] transition duration-350 ease-in-out ">
                  <div className="flex max-sm:items-start max-md:p-6 max-md:pb-0 max-md:gap-2">
                    <div className="grid md:grid-cols-[100px_100px] place-content-center">
                      <svg
                        className="h-11 w-11 max-md:h-6 max-md:w-11 fill-none stroke-primary transition duration-300 ease-in-out hover:fill-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.515 7.125 7.485.688-5.421 5.277 1.421 7.323-6.5-3.412-6.5 3.412 1.421-7.323-5.421-5.277 7.485-.688z" />
                      </svg>
                      <img
                        className="md:block hidden self-center"
                        src="./images/england.png"
                        alt=""
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-lg max-md:text-sm text-white font-extrabold  text-center break-all">
                        RustReborn.gg EU - Bedwars | AimTrain | Creative | Arena
                        | FFA
                      </p>
                      <p className="text-sm text-white text-center max-md:hidden">
                        Rank: <span className="text-primary">1</span> | Type:
                        <span className="text-primary">Modded</span> | AVG
                        Players:
                        <span className="text-primary">450</span>
                      </p>
                    </div>
                  </div>
                  <div className="max-md:w-full flex-shrink-0">
                    <p className="text-sm text-white text-center md:hidden mb-2">
                      Rank: <span className="text-primary">1</span> | Type:
                      <span className="text-primary">Modded</span> | AVG
                      Players:
                      <span className="text-primary">450</span>
                    </p>
                    <div className="bg-primary hover:bg-primary px-2 py-4 max-md:py-1.5 text-white text-center font-medium text-xl  md:min-h-[142px] font-Rammetto flex items-center justify-between flex-col max-md:gap-1.5 max-md:mb-4">
                      <div className="flex flex-col max-md:flex-row">
                        <span>WIPE IN</span>
                        <span className="text-black"> 5h</span>
                      </div>

                      <div className="text-[11px] ">20/05 17:40</div>
                    </div>
                    <button className="bg-transparent h-full w-full md:hidden mb-4 text-white text-lg font-bold inline-block text-center">
                      Connect
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 !mt-24 max-md:hidden">
                  <Link
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-white hover:bg-primary  rotate-180 bg-black-700 rounded-lg focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Prev</span>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    aria-current="page"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white  bg-primary rounded focus:z-20 focus:outline-offset-0"
                  >
                    1
                  </Link>
                  <Link
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white  hover:bg-primary bg-black-700 rounded focus:z-20 focus:outline-offset-0"
                  >
                    2
                  </Link>
                  <Link
                    href="#"
                    className="relative  items-center px-4 py-2 text-sm font-semibold text-white  hover:bg-primary bg-black-700 rounded focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    3
                  </Link>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white hover:bg-primary bg-black-700 rounded focus:z-20 focus:outline-offset-0">
                    4
                  </span>
                  <Link
                    href="#"
                    className="relative  items-center px-4 py-2 text-sm font-semibold text-white  hover:bg-primary  bg-black-700 rounded focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    5
                  </Link>

                  <Link
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-white hover:bg-primary  bg-black-700 rounded focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LanguageAndCountrySelector;
