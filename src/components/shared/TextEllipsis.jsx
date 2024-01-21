import Regular12 from "#/components/shared/fonts/Regular12.jsx";

const TextEllipsis = ({ text, rows = 1 }) => {
  return (
    <Regular12 className={`text-ellipsis overflow-hidden whitespace-nowrap overflow-ellipsis h-${rows * 1.5}em w-full`}>
      {text}
    </Regular12>
  )
}

export default TextEllipsis