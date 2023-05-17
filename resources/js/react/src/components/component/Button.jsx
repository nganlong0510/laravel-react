import { Link } from "react-router-dom";

export default function Button({
  color = "indigo",
  to = "",
  circle = false,
  href = "",
  link = false,
  target = "_blank",
  onClick = () => {},
  children,
}) {
  let classes = [
    "flex",
    "items-center",
    "justify-center",
    "whitespace-nowrap",
    "text-sm",
  ];

  if (link) {
    classes = [...classes, `text-${color}-500`, `focus:border-${color}-500`];
  } else {
    classes = [
      ...classes,
      "text-white",
      "focus:ring-2",
      "focus:ring-offset-2",
      `bg-${color}-600`,
      `hover:bg-${color}-700`,
      `focus:ring-${color}-500`,
    ];
  }

  if (circle) {
    classes = [...classes, "h-8", "w-8", "rounded-full"];
  } else {
    classes = [...classes, "p-0", "py-2", "px-4", "rounded-md"];
  }

  const buttonClasses = classes.join(" ");

  return (
    <>
      {href && (
        <a href={href} className={buttonClasses} target={target}>
          {children}
        </a>
      )}
      {to && (
        <Link to={to} className={buttonClasses}>
          {children}
        </Link>
      )}
      {!to && !href && (
        <button onClick={onClick} className={buttonClasses}>
          {children}
        </button>
      )}
    </>
  );
}
