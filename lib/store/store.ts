import { LazyStore } from "@tauri-apps/plugin-store";
import { STORE, STORE_WALLET } from "../crate/generated";

export function store() {
  const store = new LazyStore(STORE);
  return store;
}

export function storeWallet() {
  const store = new LazyStore(STORE_WALLET);
  return store;
}