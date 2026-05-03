export type FieldAddress = {
  street: string;
  postalCode: string;
  city: string;
}

export class MapUtility {
  public static buildGoogleMapsURL(placeName: string, latitude: number, longitude: number, address: FieldAddress): string {
    const baseURL = "https://www.google.com/maps/search/"
    const { street, postalCode, city } = address;
    const placeLine = `${placeName}, ${street}, ${postalCode} ${city}`;

    let params: URLSearchParams
    if (latitude && longitude) {
      params = new URLSearchParams({
        api: "1",
        map_action: "map",
        query_place_id: placeLine,
        query: `${latitude}, ${longitude}`,
      })
    } else {
      params = new URLSearchParams({
        api: "1",
        map_action: "map",
        query: placeLine,
      })
    }

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
