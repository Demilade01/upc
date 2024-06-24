"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import LangDropdown from "./Select";
import { Slider } from "@nextui-org/react";
import sortIcon from "../public/images/sort.png";

const SortContent = [
  { id: 1, img: sortIcon, name: "Wipe Time" },
  { id: 2, img: sortIcon, name: "Rank" },
  { id: 3, img: sortIcon, name: "AVG Players" },
];

const ServerList = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleFilterToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  const [groupLimits, setgroupLimits] = useState([]);
  const [teamUILimits, setTeamUILimits] = useState([]);
  const [regions, setRegions] = useState([]);
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    maximumPopulation: [],
    nextWipe: [],
    mapSize: [],
    regions: [],
    groupLimit: [],
    teamUILimit: []
  });

  const [maximumPopulationSlider, setMaximumPopulationSlider] = useState({
    minValue: 0,
    maxValue: 100,
    defaultValue: [0, 100],
    marks: [],
    step: 1
  });

  const [mapSizeSlider, setMapSizeSlider] = useState({
    minValue: 0,
    maxValue: 0,
    defaultValue: [0, 0],
    marks: [
      { value: 0, label: '0' },
      { value: 0, label: '0' },
      { value: 0, label: '0' },
      { value: 0, label: '0' },
      { value: 0, label: '0' }
    ],
    step: 500
  });


  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const fetchServers = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/wipes?${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setServers(data.data);
    } catch (error) {
      console.error('Failed to fetch servers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMaximumPopulationSlider = async () => {
    try {
      const response = await fetch('/api/maximum_population_range');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const { minPopulation, maxPopulation, marks, step } = data.data;
      setMaximumPopulationSlider({
        minValue: minPopulation,
        maxValue: maxPopulation,
        defaultValue: [minPopulation, maxPopulation],
        marks,
        step
      });
    } catch (error) {
      console.error('Failed to fetch slider config:', error);
    }
  };

  const fetchMapSizeSlider = async () => {
    try {
      const response = await fetch('/api/map_size_range');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const { minSize, maxSize, marks, step } = data.data;
      setMapSizeSlider({
        minValue: minSize,
        maxValue: maxSize,
        defaultValue: [minSize, maxSize],
        marks,
        step
      });
    } catch (error) {
      console.error('Failed to fetch slider config:', error);
    }
  };
  
  const fetchRegions = async () => {
    try {
      const response = await fetch('/api/regions');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRegions(data.data);
    } catch (error) {
      console.error('Failed to fetch regions:', error);
    }
  };

  const fetchGroupLimits = async () => {
    try {
      const response = await fetch('/api/group_limits');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setgroupLimits(data.data);
    } catch (error) {
      console.error('Failed to fetch team limits:', error);
    }
  };

  const fetchTeamUILimits = async () => {
    try {
      const response = await fetch('/api/team_ui_limits');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTeamUILimits(data.data);
    } catch (error) {
      console.error('Failed to fetch team UI limits:', error);
    }
  };

  useEffect(() => {
    fetchServers();
    fetchMaximumPopulationSlider();
    fetchMapSizeSlider();
    fetchRegions();
    fetchGroupLimits();
    fetchTeamUILimits();
  }, [filters]);

  return (
    <main>
      <div
        className={`${toggleMenu ? "fixed" : "hidden"
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
              className={`${toggleMenu ? "active" : ""
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
                <div className="space-y-4 ">
                  <div className="">
                    <label className="block text-xl border-b border-primary pb-2 mb-2">
                      Maximum population on wipe day
                    </label>
                    <div className="relative py-3 px-6">
                      <Slider
                        key={maximumPopulationSlider.defaultValue.join('-')} // Use key to force re-render
                        step={maximumPopulationSlider.step}
                        maxValue={maximumPopulationSlider.maxValue}
                        minValue={maximumPopulationSlider.minValue}
                        defaultValue={maximumPopulationSlider.defaultValue}
                        marks={maximumPopulationSlider.marks}
                        showSteps={true}
                        showTooltip={true}
                        showOutline={true}
                        disableThumbScale={true}
                        onChange={(value) => handleFilterChange("maximumPopulation", value)}
                        classNames={{
                          base: "max-w-md",
                          filler: "bg-primary",
                          labelWrapper: "mb-2",
                          label: "font-medium text-default-700 text-medium",
                          value: "font-medium text-default-500 text-small",
                          thumb: [
                            "transition-size",
                            "bg-primary h-5 w-5 after:h-4 after:w-4 after:bg-primary ring-primary",
                            "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                            "data-[dragging=true]:w-5 data-[dragging=true]:h-5 data-[dragging=true]:after:h-4 data-[dragging=true]:after:w-4",
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
                  <div>
                    <label className="block text-xl border-b border-primary pb-2 mb-2">
                      Map Size
                    </label>
                    <div className="relative py-3 px-6">
                      <Slider
                        key={mapSizeSlider.defaultValue.join('-')} // Use key to force re-render
                        step={mapSizeSlider.step}
                        maxValue={mapSizeSlider.maxValue}
                        minValue={mapSizeSlider.minValue}
                        defaultValue={mapSizeSlider.defaultValue}
                        marks={mapSizeSlider.marks}
                        showSteps={true}
                        showTooltip={true}
                        showOutline={true}
                        disableThumbScale={true}
                        onChange={(value) => handleFilterChange("mapSize", value)}
                        classNames={{
                          base: "max-w-md",
                          filler: "bg-primary",
                          labelWrapper: "mb-2",
                          label: "font-medium text-default-700 text-medium",
                          value: "font-medium text-default-500 text-small",
                          thumb: [
                            "transition-size",
                            "bg-primary h-5 w-5 after:h-4 after:w-4 after:bg-primary ring-primary",
                            "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                            "data-[dragging=true]:w-5 data-[dragging=true]:h-5 data-[dragging=true]:after:h-4 data-[dragging=true]:after:w-4",
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
                    {regions.map((region) => (
      <div className="group checkbox-container" key={region}>
        <input
          type="checkbox"
          className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
          id={region}
          onChange={(e) => handleFilterChange(
            "regions",
            e.target.checked ? [...filters.regions, region] : filters.regions.filter(r => r !== region)
          )}
        />
        <label htmlFor={region} className="ml-2">
          {region}
        </label>
      </div>
    ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="Team-limit">
                      <label className="block text-xl border-b border-primary pb-2 mb-2">
                        Group Limit
                      </label>
                      <div className="flex flex-col space-y-1 pl-1">
                      {groupLimits.map((limit) => (
        <div className="group checkbox-container" key={limit}>
          <input
            id={limit}
            type="checkbox"
            className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
            onChange={(e) => handleFilterChange(
              "groupLimit",
              e.target.checked ? [...filters.groupLimit, limit] : filters.groupLimit.filter(l => l !== limit)
            )}
          />
          <label htmlFor={limit} className="ml-2">
            {limit}
          </label>
        </div>
      ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2"></div>
                  <div className="Team-UI">
                    <label className="block text-xl border-b border-primary pb-2 mb-2">
                      Team UI
                    </label>
                    <div className="flex flex-col space-y-1 pl-1">
                    {teamUILimits.map((limit) => (
      <div className="group checkbox-container" key={limit}>
        <input
          type="checkbox"
          className="w-4 h-4 rounded group-hover:bg-primary bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary"
          id={`teamUILimit-${limit}`}
          onChange={(e) => handleFilterChange(
            "teamUILimit",
            e.target.checked ? [...filters.teamUILimit, limit] : filters.teamUILimit.filter(l => l !== limit)
          )}
        />
        <label htmlFor={`teamUILimit-${limit}`} className="ml-2">
          {limit}
        </label>
      </div>
    ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <button className="w-full  bg-primary rounded-lg p-2 close lg:hidden" onClick={fetchServers}>
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
                {servers.map((server, index) => {
                  const wipeDate = new Date(server.next_wipe);

                  const formattedDate = new Intl.DateTimeFormat('default', {
                    day: '2-digit',
                    month: '2-digit'
                  }).format(wipeDate);

                  const formattedTime = new Intl.DateTimeFormat('default', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  }).format(wipeDate);

                  const formattedWipeDate = `${formattedDate} ${formattedTime}`;

                  return (
                    <div className="server-wrapper bg-black-700/80 flex md:gap-12 gap-4 md:flex-row flex-col justify-between rounded-lg relative md:px-6 md:pe-12 hover:shadow-[5px_5px_20px_0px_#CE402A] transition duration-350 ease-in-out " key={index}>
                      <div className="flex max-sm:items-start max-md:p-6 max-md:pb-0 max-md:gap-2 md:pl-0 md:p-8">
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
                            {server.name}
                          </p>
                          <p className="text-sm text-white text-center max-md:hidden">
                            Rank:{" "}
                            <span className="text-primary">{server.rank}</span> |
                            Type:
                            <span className="text-primary"> Modded</span> | AVG
                            Players:
                            <span className="text-primary">
                              {" "}
                              {server.max_population_last_wipe}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="max-md:w-full flex-shrink-0">
                        <p className="text-sm text-white text-center md:hidden mb-2">
                          Rank:{" "}
                          <span className="text-primary">{server.rank}</span> |
                          Type:
                          <span className="text-primary"> Modded</span> | AVG
                          Players:
                          <span className="text-primary">
                            {" "}
                            {server.max_population_last_wipe}
                          </span>
                        </p>
                        <div className="bg-primary hover:bg-primary px-2 py-4 max-md:py-1.5 text-white text-center font-medium text-xl  md:min-h-[142px] h-full font-Rammetto flex items-center justify-between flex-col max-md:gap-1.5 max-md:mb-4">
                          <div className="flex flex-col max-md:flex-row">
                            <span>WIPE IN</span>
                            <span className="text-black"> 5h</span>
                          </div>

                          <div className="text-[11px] ">{formattedWipeDate}</div>
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
                  );
                })}

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

export default ServerList;