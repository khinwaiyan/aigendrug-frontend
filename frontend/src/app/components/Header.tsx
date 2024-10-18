import { Button } from "./Button";
type HeaderProps = {
  headerLabel: string;
  btnText: string;
  onClick: () => void;
};
export const Header = ({ headerLabel, btnText, onClick }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between px-10 py-2">
      <div className="text-2xl font-bold">{headerLabel}</div>
      <Button onClick={onClick} variant="secondary">
        {btnText}
      </Button>
    </div>
  );
};
