"use client";

const filterList = [
  { label: "Remote", value: "remote" },
  { label: "React / Next.js", value: "react" },
  { label: "Full Time", value: "full-time" },
  { label: "Senior Engineer", value: "senior" },
];

export default function JobFilter({ filter,  onFilterChange}: {filter:string , onFilterChange:(value: string) => void}) {
 
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 px-2 my-5">
      <span className="font-semibold text-slate-700 dark:text-slate-300">
        Popular:
      </span>

      {filterList.map((item) => {
        const isActive = filter === item.value
        return <button
          type="button"
          onClick={() => onFilterChange(item.value)}
          className={`transition-colors ${ isActive ? "font-semibold text-indigo-600 dark:text-indigo-400" : "hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          key={item.label}
        >
          {item.label}
        </button>
      }
      )}
    </div>
  );
}
