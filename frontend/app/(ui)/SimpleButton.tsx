import { HTMLAttributes } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

interface Props extends HTMLAttributes<HTMLDivElement> {
  onButtonClick: () => void;
  text: string;
  icon?: IconProp;
  active?: boolean;
  iconDisabled?: string;
  textDisabled?: string;
  loading?: boolean;
  size?: "md" | "lg" | "icon-md" | "icon-sm" | "icon";
}

export default function Button({ size = "md", ...props }: Props): JSX.Element {
  // Check if the button show always be 'active' - then true;
  // or if it should switch between 'active' and 'disabled' - then give the status
  const activityStatus =
    props.active || (props.text != "" && props.textDisabled == undefined);

  const styleButton = classNames(
    "group m-auto md:m-0 inline-block rounded-md duration-200",

    // Setting background colors and hover modes
    props.color == "mineshaft" &&
      activityStatus &&
      "bg-mineshaft-700 hover:bg-primary",
    props.color == "mineshaft" && !activityStatus && "bg-mineshaft",
    (props.color == "primary" || !props.color) &&
      activityStatus &&
      "bg-primary hover:opacity-80",
    (props.color == "primary" || !props.color) &&
      !activityStatus &&
      "bg-primary",
    props.color == "red" && "bg-red",

    // Changing the opacity when active vs when not
    activityStatus ? "opacity-100 cursor-pointer" : "opacity-40",

    // Setting the button sizes
    size == "md" && "h-10 w-full px-2 md:px-4",
    size == "lg" && "h-12 w-full px-2 md:px-8",
    !size && "md:py-1 px-3 md:px-8",
    size == "icon-md" && "h-10 w-10 flex items-center justify-center",
    size == "icon-sm" && "h-9 w-9 flex items-center justify-center"
  );

  const styleMainDiv = classNames(
    "relative font-medium flex items-center",

    // Setting the text color for the text and icon
    props.color == "mineshaft" && "text-gray-400",
    props.color != "mineshaft" && props.color != "red" && "text-black",
    props.color == "red" && "text-gray-200",
    activityStatus && props.color != "red" ? "group-hover:text-black" : "",

    size == "icon" && "flex items-center justify-center"
  );

  const textStyle = classNames(
    "relative duration-200",

    // Show the loading sign if the loading indicator is on
    props.loading ? "opacity-0" : "opacity-100",
    size == "md" && "text-sm",
    size == "lg" && "text-lg"
  );

  return (
    <button
      disabled={!activityStatus}
      onClick={props.onButtonClick}
      className={styleButton}
    >
      <div className={styleMainDiv}>
        <div
          className={`${
            props.loading == true ? "opacity-100" : "opacity-0"
          } absolute flex items-center px-2 duration-200`}
        >
          <Image
            src="/images/loading/loadingblack.gif"
            height={25}
            width={42}
            alt="loading animation"
            className={`rounded-xl`}
          ></Image>
        </div>
        {props.icon && (
          <FontAwesomeIcon
            icon={props.icon}
            className={`flex my-auto font-extrabold ${
              size == "icon-sm" ? "text-sm" : "text-md"
            } ${(props.text || props.textDisabled) && "mr-2"}`}
          />
        )}
        {props.iconDisabled && (
          <FontAwesomeIcon
            icon={props.iconDisabled as IconProp}
            className={`flex my-auto font-extrabold ${
              size == "icon-sm" ? "text-sm" : "text-md"
            } ${(props.text || props.textDisabled) && "mr-2"}`}
          />
        )}
        {(props.text || props.textDisabled) && (
          <p className={textStyle}>
            {activityStatus ? props.text : props.textDisabled}
          </p>
        )}
      </div>
    </button>
  );
}
