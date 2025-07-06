import { useEffect, useRef } from "react"

const DatePicker = ({ onSelect, onClose, currentSelection }) => {
  const ref = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const options = [
    { value: "past-week", label: "Past week" },
    { value: "past-month", label: "Past month" },
    { value: "past-3-months", label: "Past 3 months" },
    { value: "past-6-months", label: "Past 6 months" },
    { value: "past-year", label: "Past year" },
    { value: "past-2-years", label: "Past 2 years" },
  ]

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
    >
      <div className="py-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700${
              currentSelection === option.value 
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DatePicker
