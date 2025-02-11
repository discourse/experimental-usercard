import { get } from "@ember/object";
import { isEmpty } from "@ember/utils";
import { apiInitializer } from "discourse/lib/api";
import discourseComputed, { observes } from "discourse/lib/decorators";
import { getURLWithCDN } from "discourse/lib/get-url";

export default apiInitializer("0.11.1", (api) => {
  api.modifyClass("component:user-card-contents", {
    classNames: "d-user-card",
    pluginId: "experimental-user-card",

    @discourseComputed()
    themeSettingValid() {
      return ["google_maps", "open_street_map"].includes(
        settings.user_location_maps_link
      );
    },

    @discourseComputed()
    userLocationLink() {
      const mapOption = settings.user_location_maps_link;
      if (mapOption === "google_maps") {
        return `https://www.google.com/maps/place/${encodeURIComponent(
          this.user.location
        )}`;
      } else {
        return `https://www.openstreetmap.org/search?query=${encodeURIComponent(
          this.user.location
        )}`;
      }
    },

    @observes("user.card_background_upload_url")
    addBackground() {
      if (!this.allowBackgrounds) {
        return;
      }

      const thisElem = this.element;
      if (!thisElem) {
        return;
      }

      if (!this.user) {
        return;
      }

      const backgroundUrl = this.get("user.card_background_upload_url");
      const avatar_template = get(this.user, "avatar_template").replace(
        "{size}",
        "240"
      );

      if (!avatar_template) {
        return;
      }

      const bg = isEmpty(backgroundUrl)
        ? `url(${getURLWithCDN(avatar_template)})`
        : `url(${getURLWithCDN(backgroundUrl)})`;
      thisElem.style.setProperty("--user-background", bg);

      if (isEmpty(backgroundUrl) && !isEmpty(avatar_template)) {
        thisElem.classList.add("avatar-background");
      }
    },
  });
});
