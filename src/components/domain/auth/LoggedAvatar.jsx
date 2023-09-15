import { Avatar } from "primereact/avatar";
import { findKey } from "#/utils/localStorageHelper.js";
import { useHookstate } from "@hookstate/core";
import { useEffect, useMemo } from "react";

const LoggedAvatar = () => {
  const user = useHookstate(null);

  useEffect(() => {
    const userFromLocalStorage = findKey("user");
    user.set(JSON.parse(userFromLocalStorage));
  }, []);

  const displayName = useMemo(() => {
    const names = user?.get()?.displayName?.split(" ");
    if (!names?.length) return "";
    if (names?.length === 1) return names[0];
    return `${names[0]} ${names[1]}`;
  }, [user]);

  const picture = useMemo(() => {
    return user?.get()?.picture;
  }, [user]);

  const props = useMemo(() => {
    if (picture) return {image: picture};
    return {label: displayName?.charAt(0)};
  }, [picture, displayName]);
  return (
    <div className="w-full flex gap-2 items-center justify-between">
      <p className="text-xs"> {displayName} </p>
      <Avatar
        {...props}
        shape="circle"
        referrerPolicy="no-referrer"
        // onClick={handleLogout}
      />

    </div>
  );
};

export default LoggedAvatar;