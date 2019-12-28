import { toParams, toQuery } from "../utils/UrlConverter";

class PopupWindow {
  constructor(id, url, options = {}) {
    this.id = id;
    this.url = url;
    this.options = options;
  }

  open() {
    const { url, id, options } = this;

    this.window = window.open(url, id, toQuery(options, ","));
  }

  close() {
    console.log("close");
    this.cancel();
    this.window.close();
  }

  poll() {
    this.promise = new Promise((resolve, reject) => {
      this._iid = window.setInterval(() => {
        try {
          const popup = this.window;
          if (!popup || popup.closed !== false) {
            this.close();

            reject(new Error("The popup was closed"));

            return;
          }
          console.log("href: " + popup.location.href);
          if (
            popup.location.href === this.url ||
            popup.location.pathname === "blank"
          ) {
            console.log("href igual ou blank");
            return;
          }
          //const params = toParams(popup.location.hash.replace(/^#/, ''));
          const params = toParams(popup.location.search.replace(/^\?/, ""));
          console.log("params");
          resolve(params);

          this.close();
        } catch (error) {
          console.log("error: " + error);
          /*
           * Ignore DOMException: Blocked a frame with origin from accessing a
           * cross-origin frame.
           */
        }
      }, 2000);
    });
  }

  cancel() {
    if (this._iid) {
      window.clearInterval(this._iid);
      this._iid = null;
    }
  }

  then(...args) {
    return this.promise.then(...args);
  }

  catch(...args) {
    return this.promise.then(...args);
  }

  static open(...args) {
    const popup = new this(...args);

    popup.open();
    popup.poll();

    return popup;
  }
}

export default PopupWindow;
