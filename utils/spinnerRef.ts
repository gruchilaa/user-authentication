import { createRef } from "react";

export type SpinnerHandle = {
  show: () => void;
  hide: () => void;
}

export const spinnerRef = createRef<SpinnerHandle>();

export const show = () => {
  spinnerRef?.current?.show();
};

export const hide = () => {
  spinnerRef?.current?.hide();
};

const Spinner = {
  show,
  hide,
};

export default Spinner;