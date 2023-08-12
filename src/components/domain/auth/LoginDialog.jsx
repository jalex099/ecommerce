import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useRef } from "react";
import AuthService from "#/services/AuthService";
import { useUIState } from "#/hooks/UIState";
import GoogleLoginButton from "#/components/domain/auth/GoogleLoginButton.jsx";

const LoginDialog = () => {
  const { loginWithEmailAndPassword } = AuthService();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const ui = useUIState();

  const handleToggleLoginDialog = () => {
    ui?.toogleLoginDialog();
  };

  const handleEmailAndPasswordLogin = (e) => {
    e.preventDefault();
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.getInput()?.value || "";
    if (!email || !password) return;
    loginWithEmailAndPassword(email, password);
  };

  return (
    <>
      <Dialog
        header="Identif&iacute;cate"
        visible={!!ui?.showLoginDialog}
        style={{ width: "100vw", margin: 0 }}
        position={"bottom"}
        onHide={handleToggleLoginDialog}
      >
        <form onSubmit={handleEmailAndPasswordLogin}>
          <div className="container my-2">
            <label htmlFor="email" className="text-sm ml-2">
              Correo electr&oacute;nico
            </label>
            <InputText id="email" ref={emailRef} className="w-full" />
          </div>
          <div className="container my-2">
            <label htmlFor="password" className="text-sm ml-2">
              Contrase&ntilde;a
            </label>
            <Password
              id="password"
              ref={passwordRef}
              className="w-full"
              feedback={false}
              toggleMask
            />
          </div>
          <div className="container my-2">
            <Button
              className="w-full"
              label="Iniciar sesi&oacute;n"
              onClick={handleEmailAndPasswordLogin}
            />
          </div>
        </form>

        <div className='w-100 flex justify-center gap-3 mt-8 mb-2'>
          <GoogleLoginButton />
        </div>
      </Dialog>
    </>
  );
};

export default LoginDialog;
