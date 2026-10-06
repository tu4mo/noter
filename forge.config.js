export default {
  packagerConfig: {
    appBundleId: 'com.tu4mo.noter',
    appCategoryType: 'public.app-category.productivity',
    asar: true,
    // Hide the dock icon from launch instead of after app.dock.hide() runs
    extendInfo: {
      LSUIElement: true
    }
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    }
  ]
}
