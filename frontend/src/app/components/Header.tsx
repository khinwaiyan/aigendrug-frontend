type HeaderProps = {
  labelL: string;
  labelR: string;
};
export const Header = ({ labelL, labelR }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between px-10 py-2">
      <div className="text-2xl font-bold">{labelL}</div>
      <div className="text-2xl font-bold">{labelR}</div>
    </div>
  );
};
