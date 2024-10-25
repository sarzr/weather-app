import React from "react";

export const InputForm: React.FC = () => {
  const [value, setValue] = React.useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSumitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={onSumitHandler}>
      <div className="relative w-full">
        <input
          type="search"
          id="location-search"
          className="block p-2.5 outline-none w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search for city or address"
          required
          value={value}
          onChange={onChangeHandler}
        />
        <button
          type="submit"
          className="absolute top-0 end-0 h-full outline-none p-2.5 px-4 text-sm font-medium text-white bg-blue-700 rounded-e border border-blue-700 hover:bg-blue-800 "
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
};
