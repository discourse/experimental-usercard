import { addExtraUserClasses } from "discourse/helpers/user-avatar";
import { apiInitializer } from "discourse/lib/api";
import { avatarImg } from "discourse/lib/utilities";
import { get } from "@ember/object";
import { getURLWithCDN } from "discourse-common/lib/get-url";
import { isEmpty } from "@ember/utils";
import { observes } from "discourse-common/utils/decorators";

export default apiInitializer("0.11.1", api => {
  api.modifyClass("component:user-card-contents", {
    classNames: "d-user-card",

    @observes("user.card_background_upload_url")
    addBackground(background) {
      if (!this.allowBackgrounds) {
        return;
      }

      const thisElem = this.element;
      if (!thisElem) {
        return;
      }

      // TODO: Assign background color to average color of user profile image

      const url = this.get("user.card_background_upload_url");
      const bg = isEmpty(url) ? "" : `url(${getURLWithCDN(url)})`;
      thisElem.style.setProperty("--user-background", bg);
    }
  });

});
