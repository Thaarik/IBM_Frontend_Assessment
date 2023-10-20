import React from "react";

// COmponent to display Input and Filter
const InputForm = ({
  setUrl,
  sort,
  prState,
  prjson,
  handleChangeFilter,
  handleSubmit,
  handlePRStateFilter,
}) => {
  return (
    <form
      className="w-11/12 flex flex-col justify-between group"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="m-2 w-full flex mobile: flex-col justify-evenly items-center">
        <input
          type="url"
          name="url"
          id="url"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          className="block w-3/4 mobile:w-full flex-1 border-2 bg-slate-200 dark:bg-[#0A0C10] p-3 rounded-md m-3 text-gray-900 placeholder:text-gray-400 focus:ring-0  mobile:text-sm mobile:p-2"
          placeholder="Enter your GitHub Repo link"
          required
        />
        <span className="m-5 text-center text-xs  dark:text-[#F0F3F6]">
          Format: https://github.com/OWNER/REPO (or)
          https://www.github.com/OWNER/REPO. No other formats are allowed
        </span>
        <button
          type="submit"
          className="bg-[#09B43A] w-1/6 mobile:w-1/4 h-12 mobile:h-10 text-center font-bold text-slate-100 rounded-md shadow-sm ring-1 ring-inset cursor-pointer ring-gray-300  hover:ring-[#09B43A] group-invalid:pointer-events-none group-invalid:opacity-30"
        >
          Search
        </button>
      </div>
      {Array.isArray(prjson) && prjson.length !== 0 && (
        <div className="m-2 w-full flex justify-evenly items-center mobile:flex-col mobile:p-3 mobile:justify-between mobile:items-center">
          <div className="flex items-center m-2 mobile:m-1">
            <label htmlFor="filter" className="dark:text-[#F0F3F6] mr-1">
              Sort:{" "}
            </label>
            <select
              name="sortfilter"
              value={sort}
              onChange={handleChangeFilter}
              className="rounded-lg mr-2 h-10 mobile:m-1 "
            >
              <option value="created">created</option>
              <option value="updated">updated</option>
              <option value="popularity">popularity</option>
              <option value="long-running">long-running</option>
            </select>
          </div>
          <div className="flex items-center m-2 mobile:m-1 ">
            <label htmlFor="filter" className="dark:text-[#F0F3F6] mr-1">
              Status:{" "}
            </label>
            <select
              name="sortfilter"
              value={prState}
              onChange={handlePRStateFilter}
              className="rounded-lg mr-2 h-10  mobile:m-1"
            >
              <option value="open">open</option>
              <option value="closed">closed</option>
              <option value="all">all</option>
            </select>
          </div>
        </div>
      )}
    </form>
  );
};

export default InputForm;
