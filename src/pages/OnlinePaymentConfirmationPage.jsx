import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import OrderService from "#/services/OrderService.js";
const OnlinePaymentConfirmationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { confirmPayment } = OrderService();

  useEffect(() => {
    const confirmPaymentAsync = async () => {
      try {
        const idTransaccion = searchParams.get("idTransaccion");
        const monto = searchParams.get("monto");
        const esReal = searchParams.get("esReal");
        const formaPago = searchParams.get("formaPago");
        const esAprobada = searchParams.get("esAprobada");
        const codigoAutorizacion = searchParams.get("codigoAutorizacion");
        const mensaje = searchParams.get("mensaje");
        const hash = searchParams.get("hash");

        if (confirmPayment && confirmPayment.mutate) {
          await confirmPayment.mutate({
            idTransaccion,
            monto,
            esReal,
            formaPago,
            esAprobada,
            codigoAutorizacion,
            mensaje,
            hash
          });
        }
      } catch (error) {
        console.error("Error al confirmar el pago:", error);
      }
    };

    confirmPaymentAsync();

  }, [searchParams])

  return (
    <Box
      className={"flex flex-col items-center justify-center h-full w-full px-6 py-4"}
    >
      <Regular16 className={"text-center"}>
        Estamos procesando tu pago, por favor espera un momento. No cierres esta ventana.
      </Regular16>
    </Box>
  )
}

export default OnlinePaymentConfirmationPage;