//* IMPORT
import axios from "axios";
import React from "react";

//* LIB
import { INDEX } from "@/commons/constants";
import { generateElasticsearchAuth } from "@/commons/helpers";
import useDebounce from "@/hooks/useDebounce";

const CarPage = () => {
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [count, setCount] = React.useState(0);

  const searchInputRef = React.useRef(null);
  const debouncedQuery = useDebounce(search, 300);

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClickOutside = (event) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target)
    ) {
      setOpen(false);
      setItems([]);
      setCount(0);
    }
  };

  const fetchData = async (query) => {
    try {
      const { authorizationHeader } = generateElasticsearchAuth({
        index: INDEX.CAR_INFO,
      });
      const url = `http://localhost:9200/${INDEX.CAR_INFO}/_search`;
      const response = await axios.post(url, query, {
        headers: { Authorization: authorizationHeader },
      });

      const data = response?.data?.hits;
      setItems(data.hits);
      setCount(data.total?.value);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    setOpen(true);
    const query =
      debouncedQuery.trim() === ""
        ? { query: { match_all: {} } }
        : { query: { match: { model: search } } };
    fetchData(query);
  }, [debouncedQuery, search]);

  return (
    <div className="min-h-screen bg-slate-500-50 py-6 flex flex-col items-center justify-center relative overflow-hidden sm:py-12">
      <div className="text-center mb-16">
        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          Redis Search Count: <span className="text-red-600">{count}</span>
        </h3>
      </div>
      <input
        onClick={handleToggle}
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Here..."
        className="py-3 px-4 w-1/2 rounded shadow font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-200 duration-100 shadow-gray-100"
        ref={searchInputRef}
      />

      <ul style={{ display: open ? "block" : "none" }} className="w-1/2">
        {!items?.length ? (
          <li className="w-full text-red-700 p-4 mt-2 bg-red flex flex-col gap-2 ">
            <p className="text-lg">Not have data</p>
          </li>
        ) : (
          <>
            {items?.map((item) => {
              return (
                <li
                  key={item._id} // Use a unique identifier as the key
                  className="w-full text-gray-700 p-4 mt-2 bg-white flex flex-col gap-2 "
                >
                  <div className="flex">
                    <img
                      src={item?._source?.image}
                      alt="Siacoin Icon"
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <p className="text-lg">
                      {item?._source?.make} - {item?._source?.model}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg">{item?._source?.description}</p>
                  </div>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
};

export default CarPage;
