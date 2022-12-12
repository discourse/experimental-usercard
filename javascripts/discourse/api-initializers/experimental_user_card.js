import { apiInitializer } from "discourse/lib/api";
import { getURLWithCDN } from "discourse-common/lib/get-url";
import { isEmpty } from "@ember/utils";
import { observes } from "discourse-common/utils/decorators";

export default apiInitializer("0.11.1", api => {
  api.modifyClass("component:user-card-contents", {
    classNames: "d-user-card",
    @observes("user.card_background_upload_url")
    addBackground() {
      if (!this.allowBackgrounds) {
        return;
      }

      const thisElem = this.element;
      if (!thisElem) {
        return;
      }

      const url = this.get("user.card_background_upload_url");
      const bg = isEmpty(url) ? "" : `url(${getURLWithCDN(url)})`;
      thisElem.style.setProperty("--user-background", bg)
    }
  });
});
