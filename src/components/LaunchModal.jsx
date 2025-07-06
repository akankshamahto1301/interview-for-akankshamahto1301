import { useEffect } from "react"

const LaunchModal = ({ launch, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return (
      date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    )
  }

  const getStatusInfo = () => {
    if (launch.upcoming) {
      return { status: "Upcoming", className: "bg-yellow-100 text-yellow-800" }
    } else if (launch.success === true) {
      return { status: "Success", className: "bg-green-100 text-green-800" }
    } else if (launch.success === false) {
      return { status: "Failed", className: "bg-red-100 text-red-800" }
    } else {
      return { status: "Unknown", className: "bg-gray-100 text-gray-800" }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl">
        {/* Header with close button */}
        <div className="flex justify-end p-4 pb-0">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="px-10 pb-5">
          {/* Mission patch and basic info */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {launch.links?.patch?.small ? (
                <img
                  src={launch.links.patch.small || "/placeholder.svg"}
                  alt={`${launch.name} mission patch`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-spacex-blue flex items-center justify-center text-white font-bold text-lg">
                  {launch.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-gray-900">{launch.name}</h2>
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusInfo.className}`}>
                  {statusInfo.status}
                </span>
              </div>
              <p className="text-gray-600 font-medium">{launch.rocket?.name || "Unknown Rocket"}</p>

              {/* Social icons - only Wikipedia and video */}
              <div className="flex items-center gap-2 mt-3">
                {launch.links?.webcast && (
                  <a
                    href={launch.links.webcast}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
                    title="Watch Launch Video"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </a>
                )}
                {launch.links?.wikipedia && (
                  <a
                    href={launch.links.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
                    title="Wikipedia"
                  >
                    <span className="text-xs font-bold text-gray-600">W</span>
                  </a>
                )}
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {launch.details && (
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed text-sm">
                {launch.details}
                {launch.links?.wikipedia && (
                  <>
                    {" "}
                    <a
                      href={launch.links.wikipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Wikipedia
                    </a>
                  </>
                )}
              </p>
            </div>
          )}

          {/* Launch details */}
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Flight Number</span>
              <span className="text-gray-900">{launch.flight_number}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Mission Name</span>
              <span className="text-gray-900">{launch.name}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Rocket Type</span>
              <span className="text-gray-900">v1.0</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Rocket Name</span>
              <span className="text-gray-900">{launch.rocket?.name || "Unknown"}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Manufacturer</span>
              <span className="text-gray-900">SpaceX</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Nationality</span>
              <span className="text-gray-900">SpaceX</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Launch Date</span>
              <span className="text-gray-900">{formatDate(launch.date_utc)}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Payload Type</span>
              <span className="text-gray-900">{launch.payloads?.[0]?.type || "Dragon 1.0"}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Orbit</span>
              <span className="text-gray-900">{launch.payloads?.[0]?.orbit || "ISS"}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600 font-medium">Launch Site</span>
              <span className="text-gray-900">
                {launch.launchpad?.full_name || launch.launchpad?.name || "CCAFS SLC 40"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LaunchModal
