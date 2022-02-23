let openWindow: Window | null;

export interface ICustomWindow extends Window {
  closeWindow?: () => void;
}

export const setCloseTarget = (w: Window | null) => {
  openWindow = w;
};

const customWindow: ICustomWindow = window;

customWindow.closeWindow = () => {
  openWindow?.close();
};
