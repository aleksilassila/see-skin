import { Tab } from "@headlessui/react";
import { PropsWithChildren } from "react";

export function TabGroup(props: PropsWithChildren<any>) {
  return <Tab.Group>{props.children}</Tab.Group>;
}

export function TabList(props: PropsWithChildren<any>) {
  return <Tab.List>{props.children}</Tab.List>;
}

export function TabItem(props: PropsWithChildren<any>) {
  return <Tab>{props.children}</Tab>;
}

export function TabPanels(props: PropsWithChildren<any>) {
  return <Tab.Panels>{props.children}</Tab.Panels>;
}

export function TabPanel(props: PropsWithChildren<any>) {
  return <Tab.Panel>{props.children}</Tab.Panel>;
}
