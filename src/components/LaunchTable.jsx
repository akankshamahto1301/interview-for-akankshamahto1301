const LaunchTable = ({ launches, onLaunchClick, startIndex }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return (
      date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }) +
      " at " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    )
  }

  const getStatusBadge = (launch) => {
    if (launch.upcoming) {
      return <span className="status-upcoming">Upcoming</span>
    } else if (launch.success === true) {
      return <span className="status-success">Success</span>
    } else if (launch.success === false) {
      return <span className="status-failed">Failed</span>
    } else {
      return <span className="status-upcoming">Unknown</span>
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Launched (UTC)
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Mission
              </th>
              <th scope="col" className="px-6 py-3">
                Orbit
              </th>
              <th scope="col" className="px-6 py-3">
                Launch Status
              </th>
              <th scope="col" className="px-6 py-3">
                Rocket
              </th>
            </tr>
          </thead>
          <tbody>
            {launches.map((launch, index) => (
              <tr
                key={launch.id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => onLaunchClick(launch)}
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {String(startIndex + index + 1).padStart(2, "0")}
                </td>
                <td className="px-6 py-4">{formatDate(launch.date_utc)}</td>
                <td className="px-6 py-4">{launch.launchpad?.name || "Unknown"}</td>
                <td className="px-6 py-4">{launch.name}</td>
                <td className="px-6 py-4">{launch.payloads?.[0]?.orbit || "N/A"}</td>
                <td className="px-6 py-4">{getStatusBadge(launch)}</td>
                <td className="px-6 py-4">{launch.rocket?.name || "Unknown"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LaunchTable
