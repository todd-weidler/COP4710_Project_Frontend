import { useState, useEffect } from "react";

export default function useTableSearch(dataSource, filterBy, searchBarId) {
  const [filteredData, setFilteredData] = useState(dataSource);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setFilteredData(dataSource.filter(filterBy(searchText)));
  }, [dataSource, filterBy, searchText]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleOnEnter = (e) => {
    if (e.key === "Enter") {
      document.getElementById(searchBarId).blur();
      // e.target.stopPropagation();
    }
  };

  return [filteredData, searchText, handleSearchTextChange, handleOnEnter];
}
