type HeaderProps = {
  label: string;
};
export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between px-10 py-2">
      <div className="text-2xl font-bold">{label}</div>
    </div>
  );
};
