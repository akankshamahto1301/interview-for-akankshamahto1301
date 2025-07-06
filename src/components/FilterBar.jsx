import { useState } from "react"
import DatePicker from "./DatePicker"

const FilterBar = ({ filters, onFilterChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleDateRangeChange = (dateRange) => {
    onFilterChange({ ...filters, dateRange })
    setShowDatePicker(false)
  }

  const handleLaunchStatusChange = (e) => {
    onFilterChange({ ...filters, launchStatus: e.target.value })
  }

  const getDateRangeLabel = () => {
    switch (filters.dateRange) {
      case "past-6-months":
        return "Past 6 Months"
      case "past-year":
        return "Past Year"
      case "past-2-years":
        return "Past 2 Years"
      default:
        return "Past 6 Months"
    }
  }

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-spacex-blue focus:border-spacex-blue"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {getDateRangeLabel()}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDatePicker && (
            <DatePicker
              onSelect={handleDateRangeChange}
              onClose={() => setShowDatePicker(false)}
              currentSelection={filters.dateRange}
            />
          )}
        </div>
      </div>

      <div className="relative">
        <select
          value={filters.launchStatus}
          onChange={handleLaunchStatusChange}
          className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-spacex-blue focus:border-spacex-blue"
        >
          <option value="all-launches">All Launches</option>
          <option value="upcoming-launches">Upcoming Launches</option>
          <option value="successful-launches">Successful Launches</option>
          <option value="failed-launches">Failed Launches</option>
        </select>
        <svg
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

export default FilterBar
