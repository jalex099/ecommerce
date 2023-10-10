import TemplateDetailsProfile from "#/components/domain/profile/TemplateDetailsProfile";
import { useMemo } from "react";

function AccountInfo({ currentUser }) {
  const displayName = useMemo(() => {
    if (!currentUser?.displayName) return "";
    const nameParts = currentUser?.displayName?.split(" ");
    if (nameParts?.length <= 2) return currentUser?.displayName;
    return nameParts[0] + " " + nameParts[2];
  }, [currentUser?.displayName]);

  return (
    <TemplateDetailsProfile title={displayName} subtitle={currentUser?.email} />
  );
}

export default AccountInfo;
