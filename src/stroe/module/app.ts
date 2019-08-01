import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";

import {
  getSidebarStatus,
  getSize,
  setSidebarStatus,
  setSize,
  setLanguage
} from "@/utils/cookies";

import store from "@/stroe";
import { getLocale } from "@/lang";

export enum DeviceType {
  Mobole,
  Desktop
}
export interface IAppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  language: string;
  size: string;
}
@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: getSidebarStatus() !== "closed",
    withoutAnimation: false
  };
  public device = DeviceType.Desktop;
  public language = getLocale();
  public size = getSize() || "medium";

  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = withoutAnimation;
    setSidebarStatus(this.sidebar.opened ? "opend" : "closed");
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
    setSidebarStatus("closed");
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device;
  }

  @Mutation
  private SET_LANGUAGE(language: string) {
    this.language = language;
    setLanguage(language);
  }
  @Mutation
  private SET_SIZE(size: string) {
    this.size = size;
    setSize(size);
  }
  @Action
  public ToggleSideBar(withoutAnimation: boolean) {
    this.TOGGLE_SIDEBAR(withoutAnimation);
  }
  @Action
  public CloseSideBar(withoutAnimation: boolean) {
    this.CLOSE_SIDEBAR(withoutAnimation);
  }
  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device);
  }
  @Action
  public SetLanguage(language: string) {
    this.SET_LANGUAGE(language);
  }
  @Action
  public setSize(size: string) {
    this.SET_SIZE(size);
  }
}
export const AppModule = getModule(App);
