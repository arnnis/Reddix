import ky from "ky";
import { store } from "../store/configureStore";
import { API_URL } from "../env";

const createKyInstance = () =>
  ky.create({
    prefixUrl: API_URL,
    headers: {
      Authorization: "Bearer 120850586674-WfNWU6yW6C3IxcmDLrpLgCiMS1g",
    },
  });

export default createKyInstance();
