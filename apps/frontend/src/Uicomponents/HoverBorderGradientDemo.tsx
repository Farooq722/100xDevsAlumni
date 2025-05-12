import { HoverBorderGradient } from "@repo/ui/uicomponents/hover-border-gradient";


interface spanText {
  text: string;
}

export function HoverBorderGradientDemo({ text }: spanText) {

  return (
    <div className="m-12 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-gradient-to-bl from-teal-100 to-pink-100 text-black dark:text-white flex items-center space-x-2 px-6"
      >
        <span>{text}</span>
      </HoverBorderGradient>
    </div>
  );
}
