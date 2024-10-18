import { IoCloudUploadOutline } from "react-icons/io5";

type InputBoxProps = {
  label: string;
};
export const InputBox = ({ label }: InputBoxProps) => {
  return (
    <label className="w-[302px] h-[55px] border-4 border-dashed border-cus_yellow text-cus_gray_light flex items-center justify-center cursor-pointer break-words transition duration-300">
      <div className="flex items-center space-x-2">
        <IoCloudUploadOutline size={33} color="{{ cus_gray_light }}" />
        <span>{label}</span>
      </div>
      <input type="file" className="hidden" />
    </label>
  );
};
