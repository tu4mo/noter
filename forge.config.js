export default {
  packagerConfig: {
    appBundleId: 'com.tu4mo.noter',
    appCategoryType: 'public.app-category.productivity',
    asar: true
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    }
  ]
}
