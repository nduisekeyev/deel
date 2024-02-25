import GeoLocation from "./GeoLocation";

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Pick<GeoLocation, "lat" | "lng">;
};

export default Address;
