import { HTMLAttributes } from "react";
import Image from "next/image";
import LogoDark from "../../public/logos/logo-black.png";
import LogoLight from "../../public/logos/logo-white.png";

interface Props {
  dark?: boolean;
}

const Logo = ({
  dark = false,
  ...rest
}: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...rest}
      className={`text-4xl font-bold overline decoration-4 font-['Josefin_Slab'] ${rest.className}`}
    >
      see-skin
    </div>
  );

  if (dark) {
    return <Image src={LogoDark} alt="see-skin logo" className="h-8" />;
  } else {
    return <Image src={LogoLight} alt="see-skin logo" className="h-8" />;
  }
};

export default Logo;
