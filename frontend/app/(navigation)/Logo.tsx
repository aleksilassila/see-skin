import { HTMLAttributes } from "react";

interface Props {}

const Logo = ({ ...rest }: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...rest}
      className={`text-4xl font-bold overline decoration-4 font-['Josefin_Slab'] ${rest.className}`}
    >
      see-skin
    </div>
  );
};

export default Logo;
