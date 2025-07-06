const EmptyState = () => {
  return (
    <div className="bg-white rounded-lg shadow">
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
            <tr>
              <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                No results found for the specified filter
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmptyState
