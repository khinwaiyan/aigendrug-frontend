import { Button } from "./Button";
type HeaderProps = {
  headerLabel: string;
  btnText: string;
  onClick: () => void;
};
export const Header = ({ headerLabel, btnText, onClick }: HeaderProps) => {
  return (
    <div className="bg-cus_navy text-cus_gray_light flex items-center justify-between px-20 py-4">
      <div className="text-2xl font-bold text-cus_white">{headerLabel}</div>
      <Button onClick={onClick} variant="secondary">
        {btnText}
      </Button>
    </div>
  );
};
