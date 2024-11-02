type HeaderProps = {
  label: string;
  labelR?: string;
};
export const Header = ({ label, labelR }: HeaderProps) => {
  return (
    <div className="flex items-center px-10 py-2">
      <div className="text-2xl font-bold">{label}</div>
      {labelR && (
        <>
          {/* Divider */}
          <div className="h-6 w-px bg-gray-300 mx-4"></div>
          {/* Right Label */}
          <div className="text-2xl font-bold">{labelR}</div>
        </>
      )}
    </div>
  );
};
