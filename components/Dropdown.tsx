import { Color } from "../typings/Color";

export interface DropdownItem {
  label: string
  action?: () => void
  href?: string
}

interface DropdownProps {
  items: DropdownItem[]
  className: string
  label: string
}

export default function Dropdown({ label, items = [], className }: DropdownProps) {
  return (
      <div className={`${className} ${Color.blue} rounded-lg `}>
        <div className="dropdown inline-block relative w-full h-full">
          <button className={`font-medium inline-flex items-center justify-center w-full h-full`}>
            <span className="mr-1">{label}</span>
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
            </svg>
          </button>
          <ul className="dropdown-menu absolute hidden text-blue-500 w-full border bg-white dark:transparent">
            {items.map(item => (
              <li className="cursor-pointer" key={item.label}>
                <a
                  className="rounded-t hover:bg-blue-500 hover:text-white py-2 px-4 block whitespace-no-wrap"
                  onClick={item.action}
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
}
