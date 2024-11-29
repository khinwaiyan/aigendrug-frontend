import { IoCloudUploadOutline } from "react-icons/io5";

type InputBoxProps = {
  label: string;
  variant?: "file" | "text" | "number";
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
};

export const InputBox = ({
  label,
  variant = "file",
  className,
  value,
  onChange,
  hint,
}: InputBoxProps) => {
  return variant === "file" ? (
    <div className="relative">
      <label
        className={`${className} text-cus_gray_light border-4 border-dashed border-cus_yellow flex items-center justify-center cursor-pointer p-2 rounded-md break-words transition duration-300`}
      >
        <div className="flex items-center space-x-2">
          <span>
            <IoCloudUploadOutline size={33} />
          </span>
          <span>{label}</span>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".csv"
          onChange={onChange}
        />
      </label>
      {hint && (
        <span className="absolute top-0 right-0 mt-1 mr-2 text-xs font-bold text-red-500">
          {hint}
        </span>
      )}
    </div>
  ) : variant === "text" ? (
    <div className="relative">
      <div
        className={`${className} text-cus_gray_light border-4 border-solid border-cus_yellow rounded-md p-3 text-center`}
      >
        <input
          type="text"
          placeholder={label}
          className="w-full text-center focus:outline-none bg-transparent"
          value={value}
          onChange={onChange}
        />
      </div>
      {hint && (
        <span className="absolute top-0 right-0 mt-1 mr-4 font-bold text-red-500">
          {hint}
        </span>
      )}
    </div>
  ) : (
    <div className="relative">
      <div
        className={`${className} text-cus_gray_light border-4 border-solid border-cus_yellow rounded-md p-3 text-center`}
      >
        <input
          type="number"
          placeholder={label}
          className="w-full text-center focus:outline-none bg-transparent"
          value={value}
          onChange={onChange}
        />
      </div>
      {hint && (
        <span className="absolute top-0 right-0 mt-1 mr-4 font-bold text-red-500">
          {hint}
        </span>
      )}
    </div>
  );
};
