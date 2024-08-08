type Props = {
  text: string;
};

export const Toast = ({ text }: Props): JSX.Element => {
  return (
    <div className=" bg-slate-200 absolute left-0 top-0 h-32 w-full">
      <p className="text-2xl">{text}</p>
    </div>
  );
};
