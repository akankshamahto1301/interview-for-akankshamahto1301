const BASE_URL = "https://api.spacexdata.com/v4"

export const fetchLaunches = async () => {
  try {
    const response = await fetch(`${BASE_URL}/launches`)
    if (!response.ok) {
      throw new Error("Failed to fetch launches")
    }
    const launches = await response.json()


    const launchesWithDetails = await Promise.all(
      launches.map(async (launch) => {
        try {
          let rocket = null
          if (launch.rocket) {
            const rocketResponse = await fetch(`${BASE_URL}/rockets/${launch.rocket}`)
            if (rocketResponse.ok) {
              rocket = await rocketResponse.json()
            }
          }


          let launchpad = null
          if (launch.launchpad) {
            const launchpadResponse = await fetch(`${BASE_URL}/launchpads/${launch.launchpad}`)
            if (launchpadResponse.ok) {
              launchpad = await launchpadResponse.json()
            }
          }


          let payloads = []
          if (launch.payloads && launch.payloads.length > 0) {
            const payloadPromises = launch.payloads.map(async (payloadId) => {
              try {
                const payloadResponse = await fetch(`${BASE_URL}/payloads/${payloadId}`)
                if (payloadResponse.ok) {
                  return await payloadResponse.json()
                }
              } catch (error) {
                console.error("Error fetching payload:", error)
              }
              return null
            })
            payloads = (await Promise.all(payloadPromises)).filter(Boolean)
          }

          return {
            ...launch,
            rocket,
            launchpad,
            payloads,
          }
        } catch (error) {
          console.error("Error fetching launch details:", error)
          return launch
        }
      }),
    )

    return launchesWithDetails.sort((a, b) => new Date(b.date_utc) - new Date(a.date_utc))
  } catch (error) {
    console.error("Error fetching launches:", error)
    throw error
  }
}
