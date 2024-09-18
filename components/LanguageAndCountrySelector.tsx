import { useState, useEffect, SetStateAction } from "react";


const LanguageAndCountrySelector = () => {
  const [isCountryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Portugal");
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");

  // Toggle dropdown visibility
  const toggleDropdown = (type: string) => {
    if (type === "country") {
      setCountryDropdownOpen(!isCountryDropdownOpen);
      setLanguageDropdownOpen(false); // Close other dropdown
    } else {
      setLanguageDropdownOpen(!isLanguageDropdownOpen);
      setCountryDropdownOpen(false); // Close other dropdown
    }
  };

  // Select item and close dropdown
  const selectItem = (type: string, value: SetStateAction<string>) => {
    if (type === "country") {
      setSelectedCountry(value);
      setCountryDropdownOpen(false);
    } else {
      setSelectedLanguage(value);
      setLanguageDropdownOpen(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleWindowClick = (event: any) => {
      if (!event.target.closest(".dropdown-button")) {
        setCountryDropdownOpen(false);
        setLanguageDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);
  
  
  return (
    <div className="top-cta">
      <div className="container">
        <div className="flex justify-end items-center py-5 space-x-5 relative z-[1] max-lg:hidden">
          {/* <div className="relative flex items-center">
            <div className=" text-white text-sm">Country:</div>
            <div className=" ml-3 w-full">
              <LangDropdown valueClass="!text-xs" data={CountryContent} />
            </div>
          </div>

          <div className="relative flex items-center">
            <div className=" text-white text-sm">Language:</div>
            <div className="ml-3 w-full">
              <LangDropdown valueClass="!text-xs" data={LangContent} hasImage />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LanguageAndCountrySelector;
