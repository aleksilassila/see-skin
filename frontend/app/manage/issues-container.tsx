interface Props {
  items: JSX.Element[];
  title: string;
}

export default function IssuesContainer(props: Props) {
  return (
    <div>
      <div className="text-2xl font-medium">{props.title}</div>
      <div className="flex flex-col divide-y">{props.items}</div>
    </div>
  );
}
