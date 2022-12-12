import styled from "../../components/Styled";
import Logo from "../(navigation)/Logo";
import { HTMLAttributes } from "react";

const FooterContainer = styled(
  "bg-black text-white p-16 gap-8 grid md:grid-flow-col"
);

const FooterLogo = () => {
  return (
    <div className="text-center">
      <Logo />
    </div>
  );
};

const FooterSection = (
  props: { title: string } & HTMLAttributes<HTMLDivElement>
) => {
  return (
    <div className={`${props.className}`} {...props}>
      <h1 className="uppercase font-light tracking-wide mb-4">{props.title}</h1>
      {props.children}
    </div>
  );
};

const Footer = () => (
  <FooterContainer>
    <FooterLogo />
    <FooterSection title="disclaimer">
      The information provided on see-skin is not medical advice and purely for
      informational purposes only. Seek a doctor for medical concerns.{" "}
    </FooterSection>
    <FooterSection title="general">
      About Terms of Use Privacy Policy Guides
    </FooterSection>
    <FooterSection title="connect">
      Send us feedback, feature suggestions or any questions you might have
      about the site:
    </FooterSection>
  </FooterContainer>
);

export default Footer;
