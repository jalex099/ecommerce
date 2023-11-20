export const stateToString = (object, level = 0) => {
  //console.log(level, object)
  //if (level === 0) console.log(object)
  if (level > 7) return "";
  if (object === null || object === undefined) return "";
  if (typeof object === "number") return object;
  if (typeof object === "boolean") return object ? "T" : "F";
  if (typeof object === "string") return object.charAt(0).toLocaleUpperCase();
  let hash = "";
  if (typeof object === "object") {
    const keys = Object.keys(object);
    if (keys?.length > 0) {
      if (object instanceof Array) {
        object.forEach((item) => {
          hash += stateToString(item, level + 1);
        });
      } else {
        keys?.forEach((key) => {
          const o = object[key];
          switch (typeof o) {
            case "object":
              hash += stateToString(o, level + 1);
              break;
            case "string":
              hash += o.charAt(0).toLocaleUpperCase();
              break;
            case "boolean":
              hash += o ? "T" : "F";
              break;
            case "number":
              hash += o;
              break;
          }
        });
      }
    }
  }
  return hash;
};
