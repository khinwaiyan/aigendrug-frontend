import { IoCloudUploadOutline } from "react-icons/io5";

type InputBoxProps = {
  label: string;
  variant?: "file" | "text";
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange handler for controlled input
};

export const InputBox = ({
  label,
  variant = "file",
  className,
  value,
  onChange,
}: InputBoxProps) => {
  return variant === "file" ? (
    <label
      className={`${className} border-4 border-dashed border-cus_yellow flex items-center justify-center cursor-pointer p-2 rounded-md break-words transition duration-300`}
    >
      <div className="flex items-center space-x-2">
        <span>
          <IoCloudUploadOutline size={33} />
        </span>
        <span>{label}</span>
      </div>
      <input type="file" className="hidden" />
    </label>
  ) : (
    <div
      className={`${className} border-4 border-solid border-cus_yellow rounded-md p-3 text-center`}
    >
      <input
        type="text"
        placeholder={label}
        className="w-full text-center focus:outline-none bg-transparent"
        value={value} // Use value for controlled input
        onChange={onChange} // Trigger onChange
      />
    </div>
  );
};
