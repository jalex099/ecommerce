import { hookstate, useHookstate, none } from "@hookstate/core";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import { stateToString } from "#/utils/adapterUtil/index";
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
  const cart = getCartFromCrypt();
  return {
    name: cart?.name || null,
    items: cart?.items || [],
    subTotal: 0,
    total: 0,
    shipping: 0,
    orderAgregado: cart?.orderAgregado || 0,
    isPedidoFuturoOpen: false,
    isReadCart: false,
    _id: cart?._id || null,
    code: cart?.code || null,
    isDirty: false,
    IsSyncable: cart?.IsSyncable || false,
  };
});

export const cartCounter = (items) => {
  return items?.reduce((acc, item) => {
    if (item?.tipo === "DESC") return acc;
    return acc + item?.quantity || 0;
  }, 0);
};

const getDescuentoFn = (items) => {
  return items?.reduce((acc, cur) => {
    if (cur?.discount && cur?.discount > 0) {
      acc += cur?.discount * cur?.quantity;
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
      console.log(e);
      window.localStorage.removeItem("cart-state");
      state.set({
        items: [],
        subTotal: 0,
        total: 0,
        shipping: 0,
        orderAgregado: 0,
        isPedidoFuturoOpen: false,
        isReadCart: true,
        error: true,
        name: null,
        isSyncable: false,
      });
    }
  },

  //* Setea el ID del carrito
  setCartId: (id) => state._id.set(id),

  //* Retorna el ID del carrito
  getCartId: () => state._id.get(),

  //* Setea el CODE del carrito
  setCartCode: (code) => state.code.set(code),

  //* Retorna el CODE del carrito
  getCartCode: () => state.code.get(),

  //   //* retorna los items del carrito
  get: () => state.items.get(),

  //   isReadCart: () => state.isReadCart.get(),

  //   //* limpia el estado
  clean: () => {
    state.name.set(null);
    state.items.set([]);
    state.subTotal.set(0);
    state.total.set(0);
    state.shipping.set(0);
    state.orderAgregado.set(0);
    state._id.set(null);
    state.code.set(null);
    state.isDirty.set(false);
    state.IsSyncable.set(false);
  },

  hash: () => stateToString({ items: state.items.get(), shipping: state.shipping.get() }),

// //* retorna si el carrito tiene identificacion
  isIdentified: () => state._id.get() !== null,

  // //* funcion que valida si el carrito local que tiene identificacion existe en la lista de carritos del usuario
  validateLocalWithSynced: (carts) => {
    return carts?.some((cart) => cart?._id === state?.value?._id);
  },

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

  // //* Retorna el valor del DESCUENTO que se esta aplicando en la compra
  getDescuento: () => getDescuentoFn(state?.items?.get()),
  getDescuentoFixed: () => getDescuentoFn(state?.items?.get())?.toFixed(2),

  // //* Añade un ITEM al carrito
  add: (item) => {
    state.items.merge([item]);
  },

  // //* Recibe un arreglo para asignar al carrito como un nuevo carrito
  setItems: (items) => state.items.set(items),

  // //* Funcion para retornar los items del carrito en un arreglo
  getItems: () => serializeState(state?.items?.get()),

  // //* Funcion para guardar el carrito en local storage
  addToLocalStorage: () => {
    const cart_enc = AES.encrypt(
      JSON.stringify(state?.value),
      ENCRYPT_KEY
    ).toString();

    //   //******************** Comentar o descomentar para guardar un carrito sin cifrar ********************//
    window.localStorage.setItem("cart-state-nc", JSON.stringify(state?.value));
    //   //******************** Comentar o descomentar para guardar un carrito sin cifrar ********************//

    window.localStorage.setItem("cart-state", cart_enc);
  },

  // //* Actualiza el orden de agregado en el carrito
  updateOrdenAgregado: (value) => state?.orderAgregado?.set(value),

  // //* recibe un ACTION para cambiar o eliminar el ITEM
  updateQuantity: (action, index) => {
    const addItem = () => {
      const items = serializeState(state?.items.get());
      const item = items[index];
      const newItem = { ...item, quantity: item?.quantity + 1 };
      items[index] = newItem;
      state.items.set(items);
    };
    const removeItem = () => {
      const items = serializeState(state?.items.get());
      const item = items[index];
      // Si la cantidad es 1 no hace nada
      if (item?.quantity === 1) {
        return;
      }
      // Si la cantidad es mayor a 1 se resta 1
      const newItem = { ...item, quantity: item?.quantity - 1 };
      items[index] = newItem;
      state.items.set(items);
    };
    action === "add" ? addItem() : removeItem();
  },

  // //* Recibe una nueva lista para asignal al carrito
  removeFromCart: (newList) => {
    state.items.set(newList);
  },

  // //* Agrega el costo de envio en el carrito
  addShipping: (cost) => {
    state.shipping.set(cost);
  },

  // //* Remueve el costo de envio en el carrito
  removeShipping: () => {
    state.shipping.set(0);
  },

  // //* Retorna el total de envio
  getShipping: () => state.shipping.get(),

  // //* Actualiza el SUBTOTAL en carrito calculando sus items
  addSubTotal: () => {
    const calcCartItemsSubTotal = state?.items?.get()?.reduce((acc, item) => {
      // Recorrer las opciones si tienen precio adicional
      if (item?.options?.length > 0) {
        let aditionalPrice = item?.options?.reduce((acc, option) => {
          return acc + option?.aditionalPrice || 0;
        }, 0);
        return (
          acc +
          (item?.basePrice + aditionalPrice + item?.discount) * item?.quantity
        );
      }
      return acc + item?.basePrice * item?.quantity;
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
    let calcCartItemsTotal = state?.items?.get()?.reduce((acc, item) => {
      if (item?.options?.length > 0) {
        let aditionalPrice = item?.options?.reduce((acc, option) => {
          return acc + option?.aditionalPrice || 0;
        }, 0);
        return acc + (item?.basePrice + aditionalPrice) * item?.quantity;
      }
      return acc + item?.basePrice * item?.quantity;
    }, 0);
    //* Agregar el shipping
    calcCartItemsTotal += state?.shipping?.get() || 0;
    state?.total?.set(calcCartItemsTotal);
  },

  // //* Setea si la data del carrito fue modificada
  setDirty: (value) => state.isDirty.set(value),

  // //* Retorna si la data del carrito fue modificada
  getDirty: () => state.isDirty.get(),

  // //* Setea si el carrito es sincronizable
  setSyncable: (value) => state.IsSyncable.set(value),

  // //* Retorna si el carrito es sincronizable
  getSyncable: () => state.IsSyncable.get(),

  // //* Retorna el nombre del carrito
  getName: () => state.name.get(),

  // //* Setea el nombre del carrito
  setName: (name) => state.name.set(name),

  // //* Limpia los estados de sincronizacion
  cleanSync: () => {
    state.IsSyncable.set(false);
    state._id.set(null);
    state.code.set(null);
  },
});

export const useCartState = () => {
  const state = useHookstate(cartStore);
  return {
    ...addCart(state),
  };
};

export default useCartState;
