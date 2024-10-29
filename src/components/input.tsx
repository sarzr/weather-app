import React from "react";
import { Context } from "../pages/main";
import { useDebounce } from "../hooks/useDebounce";

export const InputForm: React.FC = () => {
  const [value, setValue] = React.useState<string>("");

  const debounceValue = useDebounce({ orgValue: value, timeout: 1000 });

  const { locationSubmitHandler } = React.useContext(Context);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  React.useEffect(() => {
    locationSubmitHandler(debounceValue);
  }, [debounceValue]);

  return (
    <form className="max-w-md mx-auto w-full">
      <div className="relative w-full px-5 sm:px-0">
        <input
          type="search"
          id="location-search"
          className="block shadow-sm p-2.5 outline-none w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300"
          placeholder="Search for city or address"
          required
          value={value}
          onChange={onChangeHandler}
        />
      </div>
    </form>
  );
};
