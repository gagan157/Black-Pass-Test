import { CloseIcon } from "assets";
import useBlur from "hooks/useBlur";
import { useEffect, useState } from "react";

interface Option {
  value?: string;
  label?: string;
  valueProps?: any[];
  placeHolder?: string;
  onChange: (value: string) => void;
  onBlur?: any;
  classNameOfOuter?: string;
  classNameOfInput?: string;
  classNameOfIcon?: string;
  classNameOflabeltext?: string;
  classNameOfListBox?: string;
  classNameOfListSelected?: string;
  styleOfOuter?: object;
  styleOfInput?: object;
  styleOfIcon?: object;
  styleOflabeltext?: object;
  styleOfListSelected?: object;
  className?: string;
  name?: string;
  enableSearch?: boolean;
  onSearchChange?: (query: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  editAvatar?: boolean;
}

export const DropdownSelect = ({
  name = "",
  value = "",
  label,
  placeHolder = "PlaceHolder",
  valueProps,
  onChange,
  onBlur,
  classNameOfOuter,
  classNameOfInput,
  classNameOfIcon,
  classNameOflabeltext,
  classNameOfListBox,
  classNameOfListSelected,
  styleOfOuter,
  styleOfInput,
  styleOfIcon,
  styleOflabeltext,
  styleOfListSelected,
  className,
  enableSearch,
  onSearchChange,
  onClear,
  disabled = false,
  editAvatar = false,
  ...props
}: Option) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(value);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [query, setQuery] = useState("")

  const ref = useBlur(() => setShowOptions(false));

  useEffect(()=> {
    if (enableSearch && onSearchChange) {
      onSearchChange(query)
    }
  }, [query])

  const handleOptionChange = (value: any) => {
    setSelectedOption(value.value);
    setShowOptions(!showOptions);
    onChange(value);
    setQuery("")
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

//   const selectedOptionLabel =
//     valueProps?.find((option: any) => option.value === selectedOption)?.label ||
//     "";
const selectedOptionLabel =
valueProps?.find((option: any) => option.value === selectedOption) ||
"";

// const selectedOptionData = valueProps?.find((option: any) => option.value === selectedOption);
// const selectedOptionLabel = selectedOptionData?.label || "";
// const selectedOptionImgSrc = selectedOptionData?.imgSrc || "";


  const classesDefault =
    "border-dark-secondary-200 border hover:border-dark-primary-100 max-sm:w-auto";

  // const classesDefault = clsx(
  //   "border-dark-secondary-200 border hover:border-dark-primary-100",
  //   selectedOption === "" ? "border-light-gray-100" : " border-danger-500"
  // );

  const classesOnOpen =
    "border-2 border-dark-primary-500 rounded-br-none rounded-bl-none border-b-0 max-sm:w-auto";

  const downIcon = (
    <svg
      width="14"
      height="9"
      viewBox="0 0 14 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 7.5L7 1.25L13.25 7.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const onClearInput = () => {
    onClear && onClear();
    setSelectedOption(null);
    setQuery('');
  };

  return (
    <div className="relative w-full flex gap-3"  ref={ref}>
      
      <div
        style={{ ...styleOfOuter }}
        className={`${classNameOfOuter} flex h-11 min-h-full w-full items-center justify-between rounded-md bg-[#F9F9F9] px-2 outline-0 ring-offset-0 max-sm:w-[192px] ${
          showOptions ? classesOnOpen : classesDefault
        }`}
      >
        {selectedOptionLabel?.imgSrc && <img src={selectedOptionLabel.imgSrc} alt={selectedOptionLabel.label} className="mr-2 h-6 w-6" />}
        <input
          disabled={disabled}
          name={selectedOptionLabel.value}
          value={enableSearch && showOptions ? query : selectedOptionLabel.value}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          placeholder={value === "" ? placeHolder : value}
          readOnly={!enableSearch}
          onClick={toggleOptions}
          onBlur={onBlur}
          className={`${classNameOfInput} flex w-full items-center justify-between rounded-md border-solid bg-[#F9F9F9] text-base text-light-gray-200 outline-none max-md:w-[62%] max-sm:w-full`}
          style={{ ...styleOfInput }}
        />

        {value && onClear && <button onClick={onClearInput}>
          <CloseIcon />
        </button>}
        <div
          className={` ${classNameOfIcon} cursor-pointer p-2 ${
            showOptions ? "" : "rotate-180 duration-300 ease-in"
          }`}
          onClick={!disabled? toggleOptions: () => {}}
          style={{ ...styleOfIcon }}
        >
          {downIcon}
        </div>
      </div>

      {showOptions && (
        <div className="absolute z-[999] w-full max-h-40 overflow-y-auto rounded-bl-md rounded-br-md border-b-2 border-l-2 border-r-2 border-dark-primary-500 bg-white duration-500 ease-in">
          {valueProps?.map((option: any) => (
            <div
              className={`${
                selectedOption === option.value
                  ? `${classNameOfListSelected} bg-dark-primary-500 text-black`
                  : `  ${classNameOfListBox} hover:bg-dark-secondary-100 cursor-pointer bg-white py-2 hover:bg-dark-primary-50 hover:text-[#00338D]`
              }`}
              key={option.value}
              onClick={() => handleOptionChange(option)}
              style={{ ...styleOfListSelected }}
            >
              <button
                type="button"
                style={{ ...styleOflabeltext }}
                className={`${classNameOflabeltext} cursor-pointer py-2 pl-4 text-sm flex flex-row`}
              >
                {<img src={option.imgSrc} alt={option.label} className="mr-2 h-6 w-6" />}
                {option.label}
              </button>
            </div>
          ))}
        </div>
      )}

      {editAvatar &&
      <div className="flex justify-center w-11 h-11 rounded-full shrink">
        <img src={ selectedOptionLabel ? selectedOptionLabel.imgSrc : value} alt='avatar' className="rounded-full w-[44px]"/>
      </div>
      }
    </div>
  );
};
