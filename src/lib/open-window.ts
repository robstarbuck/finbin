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

export function hasCloseWindow(window: Window): window is ICustomWindow {
  try {
    return window.opener && "closeWindow" in window.opener;
  } catch {
    return false;
  }
}
