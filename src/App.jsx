import { useState, useEffect } from "react"
import Header from "./components/Header"
import FilterBar from "./components/FilterBar"
import LaunchTable from "./components/LaunchTable"
import LaunchModal from "./components/LaunchModal"
import Pagination from "./components/Pagination"
import LoadingSpinner from "./components/LoadingSpinner"
import EmptyState from "./components/EmptyState"
import { fetchLaunches } from "./services/spacexApi"

function App() {
  const [launches, setLaunches] = useState([])
  const [filteredLaunches, setFilteredLaunches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedLaunch, setSelectedLaunch] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    dateRange: "past-6-months/",
    launchStatus: "all-launches",
  })

  const itemsPerPage = 15

  useEffect(() => {
    loadLaunches()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [launches, filters])

  const loadLaunches = async () => {
    try {
      setLoading(true)
      const data = await fetchLaunches()
      setLaunches(data)
    } catch (err) {
      setError("Failed to load launches")
      console.error("Error loading launches:", err)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...launches]


    const now = new Date()
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())

    if (filters.dateRange === "past-6-months") {
      filtered = filtered.filter((launch) => {
        const launchDate = new Date(launch.date_utc)
        return launchDate >= sixMonthsAgo && launchDate <= now
      })
    }

    if (filters.launchStatus === "upcoming-launches") {
      filtered = filtered.filter((launch) => launch.upcoming)
    } else if (filters.launchStatus === "successful-launches") {
      filtered = filtered.filter((launch) => launch.success === true)
    } else if (filters.launchStatus === "failed-launches") {
      filtered = filtered.filter((launch) => launch.success === false)
    }

    setFilteredLaunches(filtered)
    setCurrentPage(1)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleLaunchClick = (launch) => {
    setSelectedLaunch(launch)
  }

  const handleCloseModal = () => {
    setSelectedLaunch(null)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }


  const totalPages = Math.ceil(filteredLaunches.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentLaunches = filteredLaunches.slice(startIndex, endIndex)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      

        {/* Filters and table moved to bottom */}
        <div className="mt-auto">
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />

          {currentLaunches.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <LaunchTable launches={currentLaunches} onLaunchClick={handleLaunchClick} startIndex={startIndex} />
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </div>

      {selectedLaunch && <LaunchModal launch={selectedLaunch} onClose={handleCloseModal} />}
    </div>
  )
}

export default App
