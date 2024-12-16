type NumBulletProps = {
  label: string;
  className?: string;
};

export const NumBullet = ({ label, className = "" }: NumBulletProps) => {
  return (
    <div
      className={`flex items-center justify-center w-12 h-12 rounded-full bg-cus_yellow text-cus_gray_light font-bold shadow shadow-cus_navy ${className} `}
    >
      {label}
    </div>
  );
};
