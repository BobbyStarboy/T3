import clsx from "clsx";

const variants = {
  gray:   "bg-gray-400/10 text-gray-600 ring-gray-400/20",
  red:    "bg-red-400/10 text-red-600 ring-red-400/20",
  yellow: "bg-yellow-400/10 text-yellow-600 ring-yellow-400/20",
  green:  "bg-green-400/10 text-green-600 ring-green-500/20",
  blue:   "bg-blue-400/10 text-blue-600 ring-blue-400/30",
  indigo: "bg-indigo-400/10 text-indigo-600 ring-indigo-400/30",
  purple: "bg-purple-400/10 text-purple-700 ring-purple-400/30",
  pink:   "bg-pink-400/10 text-pink-600 ring-pink-400/20",
};

export default function Badge({
  children,
  color = "purple",
  pill = false,
  dot = false,
  className,
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center ring-1 ring-inset px-3 h-8 text-sm font-extrabold",
        pill ? "rounded-full" : "rounded-md",
        variants[color],
        className
      )}
    >
      {dot && <span className="mr-2 inline-block size-2.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
