import { helper } from "@ember/component/helper";

function userLocation([location]) {
  return `https://www.google.com/maps/place/${location.replace(",", "+")}`;
}

export default helper(userLocation);
