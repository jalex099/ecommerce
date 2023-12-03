import { hookstate, useHookstate, none } from "@hookstate/core";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import { stateToString } from "#/utils/adapterUtil";
import serializeState from "#/utils/serializeState";
// import { orderBy } from "lodash";
import { ENCRYPT_KEY } from "#/config/constants";

const getCartFromCrypt = () => {
  const cart = window.localStorage.getItem("cart-state");
  if (!cart) return null;
  var bytes = AES.decrypt(
    window.localStorage.getItem("cart-state"),
    ENCRYPT_KEY
  );
  var cartText = bytes.toString(Utf8);
  return JSON.parse(cartText);
};

export const cartStore = hookstate(() => {
  return {
    items: getCartFromCrypt()?.items || [],
    subTotal: 0,
    total: 0,
    orderAgregado: 0,
    isPedidoFuturoOpen: false,
    isReadCart: false,
  };
});

export const cartCounter = (items) => {
  return items?.reduce((acc, item) => {
    if (item?.tipo === "DESC") return acc;
    return acc + 1;
  }, 0);
};

// const existCuponFn = (items) => items?.some((item) => item?.TP);

// const existPromoFn = (items) => {
//   return items?.reduce((acc, item) => {
//     if (item?.tipo === "PRD") {
//       if (acc === false) {
//         acc = item?.isPromo;
//       }
//     }
//     if (["CMB", "ESF", "ESM", "ATP"].includes(item?.tipo)) {
//       if (acc === false) {
//         acc = item?.list?.some((item) => item[0]?.isPromo);
//       }
//     }
//     return acc;
//   }, false);
// };

const getDescuentoFn = (items) => {
  return items?.reduce((acc, cur) => {
    if (cur?.TP) {
      acc = cur?.precio * -1;
    }
    return acc;
  }, 0);
};

const addCart = (state) => ({
  getCartStorage: () => {
    try {
      const cart = getCartFromCrypt();
      state.set({ ...cart, isReadCart: true });
    } catch (e) {
      window.localStorage.removeItem("cart-state");
      state.set({
        items: [],
        subTotal: 0,
        total: 0,
        orderAgregado: 0,
        isPedidoFuturoOpen: false,
        isReadCart: true,
        error: true,
      });
    }
  },

  //   //* retorna los items del carrito
  get: () => state.items.get(),

  //   isReadCart: () => state.isReadCart.get(),

  //   //* limpia el estado
  clean: () => {
    state.items.set([]);
    state.subTotal.set(0);
    state.total.set(0);
    state.orderAgregado.set(0);
  },

  hash: () => stateToString(state.items.get()),

  // //* retorna el numero de ITEMS del carrito, numero de PRD + total de LIST ITEMS de otros tipos
  getItemsCounter: () => {
    const items = serializeState(state?.items?.get()) || [];
    return cartCounter(items);
  },

  //* Retorna el SUBTOTAL del carrito (valor de ITEMS)
  getSubTotal: () => state.subTotal.get(),
  getSubTotalFixed: () => state.subTotal.get()?.toFixed(2),
  // getSubTotalHash: () => stateToString(state.subTotal.get()),

  // //* Retorna el TOTAL del carrito (valor de ITEMS - PROMOS)
  getTotal: () => state?.total?.get(),
  getTotalFixed: () => state?.total?.get()?.toFixed(2),
  // getTotalHash: () => stateToString(state?.total?.get()),

  // //* Retorna el orden de agregado para mostrar por separado ITEMS del mismo IDPMN en diferentes selecciones y configuraciones
  getOrdenAgregado: () => state?.orderAgregado?.get(),

  // //* Retorna si existe algun CUPON agregado en el carrito
  // getExistCupon: () => existCuponFn(state?.items?.get()),

  // //* Retorna si existe PROMOCION agregada en el carrito
  // getExistPromo: () => existPromoFn(state?.items?.get()),

  // //* Retorna si algun ITEM del carrito fue agregado en VENTA SUGERIDA
  // getExistVentaSugerida: () =>
  //   state?.items?.value?.some((cartItem) => cartItem.ventaSugerida === 1),

  // //* Retorna el valor del DESCUENTO que se esta aplicando en la compra
  getDescuento: () => getDescuentoFn(state?.items?.get()),
  getDescuentoFixed: () => getDescuentoFn(state?.items?.get())?.toFixed(2),

  // //* Añade un ITEM al carrito
  add: (item) => {
    state.items.merge([item]);
  },

  // //* Recibe un arreglo para asignar al carrito como un nuevo carrito
  setItems: (items) => state.items.set(items),

  // //* Funcion para guardar el carrito en local storage
  // // addToLocalStorage: () => state?.attach(Persistence('cart-state')),
  addToLocalStorage: () => {
    // const key = CartKeyStore.get().key;
    // const update = CartKeyStore.get().update;
    // if (key !== "" && update) {
    const cart_enc = AES.encrypt(
      JSON.stringify(state?.value),
      ENCRYPT_KEY
    ).toString();

    //   //******************** Comentar o descomentar para guardar un carrito sin cifrar ********************//
    window.localStorage.setItem("cart-state-nc", JSON.stringify(state?.value));
    //   //******************** Comentar o descomentar para guardar un carrito sin cifrar ********************//

    window.localStorage.setItem("cart-state", cart_enc);
    //   // }
  },

  // //* Actualiza el orden de agregado en el carrito
  updateOrdenAgregado: (value) => state?.orderAgregado?.set(value),

  // //* recibe un ACTION para cambiar o eliminar el ITEM (prd) o LIST (otros tipos)
  // updateCantidad: (tipo, action, index, item) => {
  //   const addItem = () => {
  //     if (tipo === "PRD") {
  //       state?.items?.merge([item]);
  //     } else {
  //       const newList = serializeState(state?.get()?.items[index]?.list);
  //       newList.push(item);
  //       const newListToAdd = orderBy(
  //         newList?.flatMap((listItem) => listItem),
  //         "ordenAgregado",
  //         "asc"
  //       )?.map((item) => [item]);

  //       state?.items[index]?.list?.set(newListToAdd);
  //     }
  //   };
  //   const removeItem = () => {
  //     if (tipo === "PRD") {
  //       state?.items[index]?.set(none);
  //     } else {
  //       const newList = orderBy(
  //         state
  //           ?.get()
  //           ?.items[index]?.list.flatMap((listItem) => listItem)
  //           ?.reduce((acc, cur, curIndex) => {
  //             if (curIndex !== item) {
  //               acc.push(cur);
  //             }
  //             return acc;
  //           }, []),
  //         "ordenAgregado",
  //         "asc"
  //       )?.map((item) => [item]);

  //       state?.items[index]?.list?.set(newList);
  //     }
  //   };
  //   action === "add" ? addItem() : removeItem();
  // },

  // //* Recibe una nueva lista para asignal al carrito
  removeFromCart: (newList) => {
    state.items.set(newList);
  },

  // //* Actualiza el SUBTOTAL en carrito calculando sus items
  addSubTotal: () => {
    const calcCartItemsSubTotal = state?.items?.get()?.reduce((acc, item) => {
      // Recorrer las opciones si tienen precio adicional
      if (item?.options?.length > 0) {
        let aditionalPrice = item?.options?.reduce((acc, option) => {
          return acc + option?.aditionalPrice || 0;
        }, 0);
        return acc + item?.basePrice + aditionalPrice;
      }
      return acc + item?.basePrice;
    }, 0);
    state?.subTotal?.set(calcCartItemsSubTotal);
  },

  removeItem: (index) => {
    state?.items[index]?.set(none);
  },

  // //* Elimina todos los items del carrito
  removeAllFromCart: () => {
    state?.items?.set([]);
  },

  // //* Actualiza el SUBTOTAL en carrito calculando sus items - DESCUENTOS
  addTotal: () => {
    const calcCartItemsTotal = state?.items?.get()?.reduce((acc, item) => {
      if (item?.options?.length > 0) {
        let aditionalPrice = item?.options?.reduce((acc, option) => {
          return acc + option?.aditionalPrice || 0;
        }, 0);
        return acc + item?.basePrice + aditionalPrice;
      }
      return acc + item?.basePrice;
    }, 0);
    state?.total?.set(calcCartItemsTotal);
  },

  // //* Se valida el carrito
  // validateCart: (props) => {
  //   const { MM } = props;
  //   const items = serializeState(state?.items.get());
  //   const montoMinimo = Number(MM);
  //   const existCupon = existCuponFn(items);

  //   //* Si existe CUPON y es el unico ITEM del carrito se limpia el carrito
  //   if (existCupon && items.length === 1) {
  //     state?.items?.set([]);
  //   }

  //   if (existCupon && items.length > 1) {
  //     const cupon = items.find((item) => item.TP);
  //     const minimoValido =
  //       cupon?.MC !== null && cupon?.MC > montoMinimo ? cupon?.MC : montoMinimo;
  //     const descuento =
  //       cupon?.TP === "MONTO"
  //         ? cupon?.DSC
  //         : cupon?.TP === "PORCENTAJE"
  //         ? minimoValido * (cupon?.DSC / 100)
  //         : 0;
  //     const minimo = Number((minimoValido + descuento)?.toFixed(2));

  //     //*Si existe CUPON en carrito y el MINIMO DE COMPRA para su uso es mayor al SUBTOTAL se elimina el cupon
  //     if (minimo > state.subTotal.get()) {
  //       const newCart = items.reduce((acc, cur) => {
  //         if (cur.TP) {
  //           return acc;
  //         } else {
  //           acc.push(cur);
  //         }
  //         return acc;
  //       }, []);
  //       state?.items?.set(newCart);
  //     }

  //     if (minimo <= state.subTotal.get()) {
  //       const newCart = items.reduce((acc, cur) => {
  //         if (cur.TP) {
  //           const newPrecio =
  //             cur.TP === "PORCENTAJE"
  //               ? -Number((state.subTotal.get() * (cur.DSC / 100))?.toFixed(2))
  //               : cur.TP === "MONTO"
  //               ? -cur.DSC
  //               : cur.precio;
  //           acc.push({ ...cur, precio: newPrecio });
  //         } else {
  //           acc.push(cur);
  //         }
  //         return acc;
  //       }, []);
  //       state?.items?.set(newCart);
  //     }
  //   }
  // },

  // //* Elimina el cupon del carrito
  // removeCupon: () => {
  //   const items = serializeState(state?.items.get());
  //   const newCart = items.reduce((acc, cur) => {
  //     if (cur.TP) {
  //       return acc;
  //     } else {
  //       acc.push(cur);
  //     }
  //     return acc;
  //   }, []);
  //   state?.items?.set(newCart);
  // },

  // getIsPedidoFuturoOpen: () => serializeState(state?.isPedidoFuturoOpen.value),

  // setIsPedidoFuturoOpen: (value) => state?.isPedidoFuturoOpen.set(value),

  // //* Guarda la llave de cifrado en el estado
  // setCK: (value) => state?.ck?.set(value),

  // //* retorna la llave de cifrado
  // getCK: () => state?.ck?.value,

  // //* retorna el valor de un ITEM del carrito
  // getItemPrice: (idpmn) => {
  //   const item = state?.items
  //     ?.get()
  //     .find((cartItem) => cartItem?.idpmn === idpmn);
  //   if (item?.tipo === "PRD") {
  //     return item?.precio * item?.cantidad;
  //   } else {
  //     if (item?.list?.length > 0) {
  //       return item?.list?.reduce((acc, cur) => {
  //         if (cur[0]?.precio > 0) {
  //           acc += cur[0]?.precio;
  //         }
  //         return acc;
  //       }, 0);
  //     } else {
  //       return 0;
  //     }
  //   }
  // },

  // //* retorna el precio de un ITEM QUE SE MUESTRA EN EL CARRITO
  // getPriceItemToShow: (idpmn, ordenAgregado) => {
  //   const item = state?.items
  //     ?.get()
  //     .find((cartItem) => cartItem?.idpmn === idpmn);
  //   if (item?.tipo === "PRD") {
  //     const items = state?.items
  //       ?.get()
  //       .filter(
  //         (cartItem) =>
  //           cartItem?.idpmn === idpmn &&
  //           cartItem?.ordenAgregado === ordenAgregado
  //       );
  //     return items[0]?.precio * items?.length;
  //   } else {
  //     if (item?.list?.length > 0) {
  //       return item?.list?.reduce((acc, cur) => {
  //         if (cur[0]?.precio > 0 && cur[0]?.ordenAgregado === ordenAgregado) {
  //           acc += cur[0]?.precio;
  //         }
  //         return acc;
  //       }, 0);
  //     } else {
  //       return 0;
  //     }
  //   }
  // },

  // cleanItemsLogout: () => {
  //   const items = serializeState(state?.items?.get());

  //   const newItems = items?.reduce((acc, cur) => {
  //     if (cur?.TP) {
  //       if (!cur?.cuponInput) return acc;
  //     }
  //     acc.push(cur);
  //     return acc;
  //   }, []);
  //   state?.items?.set(newItems);
  // },
  // getProductCupon: () => {
  //   const items = serializeState(state?.items.get());
  //   return items?.find((item) => item?.tipo === "PRD" && item?.TP);
  // },
});

export const useCartState = () => {
  const state = useHookstate(cartStore);
  return {
    ...addCart(state),
  };
};

export default useCartState;
