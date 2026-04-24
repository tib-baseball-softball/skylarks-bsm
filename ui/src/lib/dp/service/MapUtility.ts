export class MapUtility {
  public static buildGoogleMapsURL(placeName: string, latitude: number, longitude: number): string {
    const baseURL = "https://www.google.com/maps/search/"

    const params = new URLSearchParams({
      api: "1",
      map_action: "map",
      query_place_id: placeName,
      query: `${latitude}, ${longitude}`,
    })

    return `${baseURL}?${params.toString()}`
  }

  public static buildAppleMapsURL(placeName: string, latitude: number, longitude: number): string {
    const baseURL = "https://maps.apple.com/"

    const params = new URLSearchParams({
      q: placeName,
      ll: `${latitude}, ${longitude}`,
    })

    return `${baseURL}?${params.toString()}`
  }
}
