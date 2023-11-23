import Regular14 from "#/components/shared/fonts/Regular14";

export default function LabelSelected({ text }) {
  return (
    <Regular14 className="whitespace-nowrap overflow-hidden max-w-full overflow-ellipsis">
      {text}
    </Regular14>
  );
}
