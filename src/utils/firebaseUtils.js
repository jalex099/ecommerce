export const getMessageFromFirebaseAuthError = (code) => {
  console.log(code)
  switch (code) {
    case "auth/claims-too-large":
      return "Reclamación muy grande.";
    case "auth/email-already-exists":
      return "Correo en uso.";
    case "auth/id-token-expired":
      return "Token de ID expirado.";
    case "auth/id-token-revoked":
      return "Token de ID revocado.";
    case "auth/insufficient-permission":
      return "Permisos insuficientes.";
    case "auth/internal-error":
      return "Error interno.";
    case "auth/invalid-argument":
      return "Argumento no válido.";
    case "auth/invalid-claims":
      return "Atributos personalizados no válidos.";
    case "auth/invalid-continue-uri":
      return "URL de continuación no válida.";
    case "auth/invalid-creation-time":
      return "Hora de creación no válida.";
    case "auth/invalid-credential":
      return "Credencial no válida.";
    case "auth/invalid-disabled-field":
      return "Valor de 'disabled' no válido.";
    case "auth/invalid-display-name":
      return "Valor de 'displayName' no válido.";
    case "auth/invalid-dynamic-link-domain":
      return "Dominio de vínculo dinámico no válido.";
    case "auth/invalid-email":
      return "Correo no válido.";
    case "auth/invalid-email-verified":
      return "Valor de 'emailVerified' no válido.";
    case "auth/invalid-hash-algorithm":
      return "Algoritmo de hash no válido.";
    case "auth/invalid-hash-block-size":
      return "Tamaño de bloque de hash no válido.";
    case "auth/invalid-hash-derived-key-length":
      return "Longitud de clave derivada de hash no válida.";
    case "auth/invalid-hash-key":
      return "Clave de hash no válida.";
    case "auth/invalid-hash-memory-cost":
      return "Costo de memoria de hash no válido.";
    case "auth/invalid-hash-parallelization":
      return "Paralelización de hash no válida.";
    case "auth/invalid-hash-rounds":
      return "Rondas de hash no válidas.";
    case "auth/invalid-hash-salt-separator":
      return "Separador de sal de hash no válido.";
    case "auth/invalid-id-token":
      return "Token de ID no válido.";
    case "auth/invalid-last-sign-in-time":
      return "Última hora de acceso no válida.";
    case "auth/invalid-page-token":
      return "Token de página no válido.";
    case "auth/invalid-password":
      return "Contraseña no válida.";
    case "auth/invalid-password-hash":
      return "Hash de contraseña no válido.";
    case "auth/invalid-password-salt":
      return "Sal de contraseña no válida.";
    case "auth/invalid-phone-number":
      return "Número de teléfono no válido.";
    case "auth/invalid-photo-url":
      return "URL de foto no válida.";
    case "auth/invalid-provider-data":
      return "Datos de proveedor no válidos.";
    case "auth/invalid-provider-id":
      return "ID de proveedor no válido.";
    case "auth/invalid-oauth-responsetype":
      return "Tipo de respuesta OAuth no válido.";
    case "auth/invalid-session-cookie-duration":
      return "Duración de cookie de sesión no válida.";
    case "auth/invalid-uid":
      return "UID no válido.";
    case "auth/invalid-user-import":
      return "Registro de usuario no válido.";
    case "auth/maximum-user-count-exceeded":
      return "Se excedió el límite de usuarios.";
    case "auth/missing-android-pkg-name":
      return "Falta el nombre del paquete de Android.";
    case "auth/missing-continue-uri":
      return "Falta la URL de continuación.";
    case "auth/missing-hash-algorithm":
      return "Falta el algoritmo de hash.";
    case "auth/missing-ios-bundle-id":
      return "Falta el ID del paquete iOS.";
    case "auth/missing-uid":
      return "Falta el UID.";
    case "auth/missing-oauth-client-secret":
      return "Falta el secreto del cliente OAuth.";
    case "auth/operation-not-allowed":
      return "Operación no permitida.";
    case "auth/phone-number-already-exists":
      return "Número de teléfono en uso.";
    case "auth/project-not-found":
      return "Proyecto no encontrado.";
    case "auth/reserved-claims":
      return "Reclamaciones reservadas.";
    case "auth/session-cookie-expired":
      return "Cookie de sesión expirada.";
    case "auth/session-cookie-revoked":
      return "Cookies de sesión revocadas.";
    case "auth/too-many-requests":
      return "Demasiadas solicitudes.";
    case "auth/uid-already-exists":
      return "UID en uso.";
    case "auth/unauthorized-continue-uri":
      return "URL de continuación no autorizada.";
    case "auth/user-not-found":
      return "Usuario no encontrado.";
    case "auth/invalid-login-credentials":
      return "Credenciales no válidas.";
    default:
      return "Error al iniciar sesión. Intenta de nuevo.";
  }
}