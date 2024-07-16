import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import DataService from "#/services/DataService.js";
import { formatCurrency } from "#/utils/currency.js";
const DeliveryExtraPaymentAdvise = ()=>{
  const { parameters } = DataService();

  const value = parameters?.find(param => param?.name === 'DELIVERY_COST')?.value;

  return (
    <Regular12
      styles={{
        color: (theme) => theme?.palette?.opacity40?.main,
        marginY: 1
      }}
    >
      * El env&iacute;o por delivery tiene un costo extra de {formatCurrency(value)}
    </Regular12>
  )
}

export default DeliveryExtraPaymentAdvise;