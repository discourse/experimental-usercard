import { helper } from "@ember/component/helper";

function userLocation([location, mapOption]) {
  if (mapOption === "GoogleMaps") {
    return `https://www.google.com/maps/place/${location.replace(",", "+")}`;
  } else {
    return `https://www.openstreetmap.org/search?query=${location.replace(",","%2C%20")}`;
  }
}

export default helper(userLocation);
