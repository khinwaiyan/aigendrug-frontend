type NumBulletProps = {
  label: string;
};

export const NumBullet = ({ label }: NumBulletProps) => {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cus_yellow text-cus_gray_light shadow shadow-cus_navy">
      {label}
    </div>
  );
};
