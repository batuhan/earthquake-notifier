import geocoder from "node-geocoder";

export const openStreetMapGeocoder = geocoder({ provider: "openstreetmap" });
export const googleGeocoder = geocoder({ provider: "google" });
