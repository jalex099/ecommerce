//* Funcion que recibe un estado (proxy) y retorna solamente el valor de este
export default function serializeState(state) {
  let serializedState = undefined;
  if (state !== undefined) {
    serializedState = JSON.parse(JSON.stringify(state));
  }
  return serializedState;
}
