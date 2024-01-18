import { main } from "./Payment/";
class API {
  Payment = {
    main: main,
  };
}

const api = new API();
export const Payment = api.Payment;
