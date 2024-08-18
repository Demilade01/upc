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

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

interface Server {
  next_wipe: string;
  name: string;
  rank: number;
  server_type: string;
  max_population_last_wipe: number;
  country_code: string;
}

const getTimeUntilWipe = (wipeDate: Date) => {
  const now = new Date();
  const timeDiff = wipeDate.getTime() - now.getTime();

  if (timeDiff <= 0) {
    return "Wiped";
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
};

interface ServerListProps {
  searchQuery?: string;
  serverType?: string;
}

const ServerList: React.FC<ServerListProps> = ({ searchQuery, serverType }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleFilterToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  const [groupLimits, setgroupLimits] = useState([]);
  const [teamUILimits, setTeamUILimits] = useState([]);
  const [regions, setRegions] = useState([]);
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("wipe_time");
  const [totalServers, setTotalServers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSortChange = (value: string) => {
    const sortMap: { [key: string]: string } = {
      "1": "wipe_time",
      "2": "rank",
      "3": "avg_players"
    };
    setSortOption(sortMap[value] || "wipe_time");
    setCurrentPage(1);
  };

  const [filters, setFilters] = useState({
    maximumPopulation: [],
    nextWipe: [],
    mapSize: [],
    regions: [],
    groupLimit: [],
    teamUILimit: [],
    rank: [0, 1000]
  });

  const [rankSlider, setRankSlider] = useState({
    minValue: 0,
    maxValue: 1000,
    defaultValue: [0, 1000],
    marks: [
      { value: 0, label: '0' },
      { value: 200, label: '200' },
      { value: 400, label: '400' },
      { value: 600, label: '600' },
      { value: 800, label: '800' },
      { value: 1000, label: '1000' }
    ],
    step: 200
  });

  const [maximumPopulationSlider, setMaximumPopulationSlider] = useState({
    minValue: 0,
    maxValue: 1000,
    defaultValue: [0, 1000],
    marks: [
      { value: 0, label: '0' },
      { value: 200, label: '200' },
      { value: 400, label: '400' },
      { value: 600, label: '600' },
      { value: 800, label: '800' },
      { value: 1000, label: '1000' }
    ],
    step: 200
  });

  const [mapSizeSlider, setMapSizeSlider] = useState({
    minValue: 1000,
    maxValue: 5000,
    defaultValue: [1000, 5000],
    marks: [
      { value: 1000, label: '1000' },
      { value: 2000, label: '2000' },
      { value: 3000, label: '3000' },
      { value: 4000, label: '4000' },
      { value: 5000, label: '5000' }
    ],
    step: 1000
  });

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    setCurrentPage(1);
  };

  const fetchServers = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        sort: sortOption,
      });

      if (searchQuery) {
        queryParams.append('searchQuery', searchQuery);
      }

      if (serverType && serverType !== 'all') {
        queryParams.append('serverType', serverType);
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          value.forEach(item => queryParams.append(key, item.toString()));
        } else if (value !== null && value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/wipes?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setServers(data.data);
      setTotalServers(data.total);
    } catch (error) {
      console.error('Failed to fetch servers:', error);
    } finally {
      setLoading(false);
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
  }, [filters, searchQuery, sortOption, serverType, currentPage]);

  useEffect(() => {
    fetchRegions();
    fetchGroupLimits();
    fetchTeamUILimits();
  }, []);

  const totalPages = Math.ceil(totalServers / itemsPerPage);

  const generatePageNumbers = () => {
    let startPage: number, endPage: number;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
  };

  const MobilePagination = () => (
    <div className="flex items-center justify-center gap-2 mt-6 md:hidden">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 text-white bg-black-700 rounded-lg hover:bg-primary disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-white">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-white bg-black-700 rounded-lg hover:bg-primary disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );

  return (
    <main>
      <div
        className={`${toggleMenu ? "fixed" : "hidden"} inset-0 bg-black/50 z-[2] h-full w-full`}
        id="overlay"
        onClick={() => {
          setToggleMenu(false);
        }}
      ></div>
      <section className="py-5 lg:pt-0 lg:pb-24 lg:mt-[-30px]">
        <div className="container">
          <div className="grid lg:grid-cols-[340px_auto] grid-flow-row-dense gap-4">
            <div
              className={`${toggleMenu ? "active" : ""} filter-sidebar lg:h-max lg:mt-[67px] relative space-y-4 max-w-[340px] flex-shrink-0 bg-black-700/80 rounded-lg p-5 text-white md:block`}
              id="collapsible-content"
            >
              <div className="">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-primary">Filters</h2>
                  <div
                    className="max-lg:block hidden close"
                    id="close"
                    onClick={() => {
                      setToggleMenu(false);
                    }}
                  >
                    <img
                      className="brightness-[10] h-full"
                      src="./images/cancel.png"
                      alt="Close Filters"
                    />
                  </div>
                </div>
              </div>
              <div className="h-[calc(100%_-_90px)] lg:h-auto overflow-y-auto lg:overflow-visible space-y-4">
                <div className="space-y-4">
                  <div className="">
                    <label className="block text-xl border-b border-primary pb-2 mb-2">
                      Average population on wipe day
                    </label>
                    <div className="relative py-3 px-6">
                      {maximumPopulationSlider.maxValue > maximumPopulationSlider.minValue && (
                        <Slider
                          key={`max-pop-${maximumPopulationSlider.defaultValue.join('-')}`}
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
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xl border-b border-primary pb-2 mb-2">
                      Rank
                    </label>
                    <div className="relative py-3 px-6">
                      <Slider
                        key={rankSlider.defaultValue.join('-')}
                        step={rankSlider.step}
                        maxValue={rankSlider.maxValue}
                        minValue={rankSlider.minValue}
                        defaultValue={rankSlider.defaultValue}
                        marks={rankSlider.marks}
                        showSteps={true}
                        showTooltip={true}
                        showOutline={true}
                        disableThumbScale={true}
                        onChange={(value) => handleFilterChange("rank", value)}
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
                        key={mapSizeSlider.defaultValue.join('-')}
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
                            className="w-4 h-4 rounded bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary cursor-pointer"
                            id={region}
                            onChange={(e) => handleFilterChange(
                              "regions",
                              e.target.checked ? [...filters.regions, region] : filters.regions.filter(r => r !== region)
                            )}
                          />
                          <label htmlFor={region} className="ml-2 cursor-pointer">
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
                              className="w-4 h-4 rounded bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary cursor-pointer"
                              onChange={(e) => handleFilterChange(
                                "groupLimit",
                                e.target.checked ? [...filters.groupLimit, limit] : filters.groupLimit.filter(l => l !== limit)
                              )}
                            />
                            <label htmlFor={limit} className="ml-2 cursor-pointer">
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
                            className="w-4 h-4 rounded bg-transparent border-2 border-primary focus:ring-0 focus:ring-offset-0 focus:outline-offset-0 ring-0 focus:shadow-none focus-visible:border-0 text-primary cursor-pointer"
                            id={`teamUILimit-${limit}`}
                            onChange={(e) => handleFilterChange(
                              "teamUILimit",
                              e.target.checked ? [...filters.teamUILimit, limit] : filters.teamUILimit.filter(l => l !== limit)
                            )}
                          />
                          <label htmlFor={`teamUILimit-${limit}`} className="ml-2 cursor-pointer">
                            {limit}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="text-right flex justify-center gap-2 relative z-[1] mx-auto lg:max-w-none lg:mx-0">
                <div className="flex-1 filter inline-block lg:hidden ">
                  <div className="relative text-left w-full">
                    <div className="inline-block w-full">
                      <button
                        className="w-full bg-black-700 text-white hover:bg-gray-800 flex items-center md:justify-[unset] justify-between gap-6 px-4 py-1.5 rounded-lg"
                        id="collapsible-trigger"
                        onClick={handleFilterToggle}
                      >
                        <span className="">Filter</span>
                        <span className="inline-block">
                          <img src="./images/settings-orange.png" alt="Filter Settings" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-1 sort">
                  <div className="inline-block text-right lg:w-[258px] w-full mt-0 lg:mt-4">
                    <LangDropdown
                      data={SortContent.map(content => ({
                        ...content,
                        img: content.img.src
                      }))}
                      hasImage
                      placeholderIconOff
                      type="sort"
                      valueClass="!text-sm"
                      defaultValue="Wipe Time"
                      onChange={handleSortChange}
                    />
                  </div>
                </div>
              </div>
              {!loading && (
                <div className="space-y-5 mt-8">
                  {servers.map((server: Server, index: number) => {
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
                    const timeUntilWipe = getTimeUntilWipe(wipeDate);

                    return (
                      <div className="server-wrapper bg-black-700/80 flex md:gap-12 gap-4 md:flex-row flex-col justify-between rounded-lg relative md:px-6 md:pe-12 hover:shadow-[5px_5px_20px_0px_#CE402A] transition duration-350 ease-in-out " key={index}>
                        <div className="flex max-sm:items-start max-md:p-6 max-md:pb-0 max-md:gap-2 md:pl-0 md:p-8">
                          <div className="grid md:grid-cols-[100px_100px] grid-cols-[auto_auto] gap-2 place-content-center">
                            <svg
                              className="h-11 w-11 max-md:h-6 max-md:w-11 fill-none stroke-primary transition duration-300 ease-in-out hover:fill-primary"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 .587l3.515 7.125 7.485.688-5.421 5.277 1.421 7.323-6.5-3.412-6.5 3.412 1.421-7.323-5.421-5.277 7.485-.688z" />
                            </svg>
                            <div className="w-[36px] h-[27px] flex items-center justify-center overflow-hidden">
                              <img
                                className="w-full h-full object-cover"
                                src={`https://flagcdn.com/36x27/${server.country_code.toLowerCase()}.png`}
                                alt="Server Region Flag"
                                width={36}
                                height={27}
                              />
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-lg max-md:text-sm text-white font-extrabold text-center break-all">
                              {server.name}
                            </p>
                            <p className="text-sm text-white text-center max-md:hidden">
                              Rank:{" "}
                              <span className="text-primary">{server.rank}</span> |
                              Type:
                              <span className="text-primary"> {server.server_type ? capitalizeFirstLetter(server.server_type) : "Unknown"}</span> | AVG
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
                            <span className="text-primary"> {server.server_type ? capitalizeFirstLetter(server.server_type) : "Unknown"}</span> | AVG
                            Players:
                            <span className="text-primary">
                              {" "}
                              {server.max_population_last_wipe}
                            </span>
                          </p>
                          <div className="bg-primary hover:bg-primary px-2 py-4 max-md:py-1.5 text-white text-center font-medium text-xl md:min-h-[142px] h-full font-Rammetto flex items-center justify-between flex-col max-md:gap-1.5 max-md:mb-4">
                            <div className="flex flex-col max-md:flex-row">
                              <span className="mr-2">WIPE IN</span>
                              <span className="text-black">{timeUntilWipe}</span>
                            </div>

                            <div className="text-[11px]">{formattedWipeDate}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Desktop Pagination */}
                  <div className="flex items-center justify-center gap-1 !mt-24 max-md:hidden">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-white hover:bg-primary bg-black-700 rounded-lg focus:z-20 focus:outline-offset-0 rotate-180"
                    >
                      <span className="sr-only">Prev</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {generatePageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ${page === currentPage ? "bg-primary" : "hover:bg-primary bg-black-700"} rounded focus:z-20 focus:outline-offset-0`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-white hover:bg-primary bg-black-700 rounded focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {/* Mobile Pagination */}
                  <MobilePagination />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServerList;