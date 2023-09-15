
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useHookstate } from "@hookstate/core";
import { useRef } from "react";
import { Divider } from "primereact/divider";
import ThemeSwitch from "#/components/shared/ThemeSwitch.jsx";
import LoggedAvatar from "#/components/domain/auth/LoggedAvatar.jsx";
import LoginButton from "#/components/domain/auth/LoginButton.jsx";
import { useUIState } from "#/hooks/UIState.js";
import PolicyComponent from "#/components/shared/PolicyComponent.jsx";
import LogoutButton from "#/components/domain/auth/LogoutButton.jsx";

const MoreActionsComponent = ()=> {

  const ui = useUIState();
  const op = useRef(null);
  const handleClick = (event) => {
    op.current.toggle(event);
  }
  return (
    <>
      <Button icon="pi pi-bars" onClick={handleClick} rounded text severity={"secondary"}/>
      <OverlayPanel ref={op} dismissable={true} style={{width: '200px'}}>
        <div className="flex flex-col items-center justify-center gap-5">
          {ui?.isAuthenticated ? (
            <LoggedAvatar />
          ) : (
            <LoginButton handleClose={handleClick} />
          )}
          <Divider style={{margin: '4px'}}/>
          <ThemeSwitch />
          <PolicyComponent />
          {
            ui?.isAuthenticated && (<LogoutButton handleClose={handleClick}/>)
          }
        </div>
      </OverlayPanel>
    </>
  )
}

export default MoreActionsComponent;