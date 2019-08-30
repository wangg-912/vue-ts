interface ISettings {
  title : string; // 覆盖默认的title
  showSettings : boolean; // 控制配置容器的显示
  showTagsView : boolean; // 控制tag容器的显示
  showSidebarLogo : boolean; // 控制侧边菜单Logo的显示
  fixedHeader : boolean; // 是否固定头部
  errorLog : string[]; // 是错误日志记录
  sidebarTextTheme : boolean; // 侧边菜单的文本主题
  devServerPort : number; // Port number for webpack-dev-server
  mockServerPort : number; // Port number for mock server
}

// You can customize below settings :)

const settings : ISettings = {
  title: "智汇教育管理平台",
  showSettings: true,
  showTagsView: true,
  fixedHeader: false,
  showSidebarLogo: true,
  errorLog: ["production"],
  sidebarTextTheme: true,
  devServerPort: 9000,
  mockServerPort: 9001
};

export default settings;
