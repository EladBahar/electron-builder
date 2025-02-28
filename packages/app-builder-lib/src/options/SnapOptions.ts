import { TargetSpecificOptions } from "../core"
import { CommonLinuxOptions } from "./linuxOptions"

export interface SnapOptions extends CommonLinuxOptions, TargetSpecificOptions {
  /**
   * The type of [confinement](https://snapcraft.io/docs/reference/confinement) supported by the snap.
   * @default strict
   */
  readonly confinement?: "devmode" | "strict" | "classic" | null

  /**
   * The custom environment. Defaults to `{"TMPDIR: "$XDG_RUNTIME_DIR"}`. If you set custom, it will be merged with default.
   */
  readonly environment?: { [key: string]: string } | null

  /**
   * The 78 character long summary. Defaults to [productName](/configuration/configuration#Configuration-productName).
   */
  readonly summary?: string | null

  /**
   * The quality grade of the snap. It can be either `devel` (i.e. a development version of the snap, so not to be published to the “stable” or “candidate” channels) or “stable” (i.e. a stable release or release candidate, which can be released to all channels).
   * @default stable
   */
  readonly grade?: "devel" | "stable" | null

  /**
   * The list of features that must be supported by the core in order for this snap to install.
   */
  readonly assumes?: Array<string> | string | null

  /**
   * The list of debian packages needs to be installed for building this snap.
   */
  readonly buildPackages?: Array<string> | null

  /**
   * The list of Ubuntu packages to use that are needed to support the `app` part creation. Like `depends` for `deb`.
   * Defaults to `["libnspr4", "libnss3", "libxss1", "libappindicator3-1", "libsecret-1-0"]`.
   *
   * If list contains `default`, it will be replaced to default list, so, `["default", "foo"]` can be used to add custom package `foo` in addition to defaults.
   */
  readonly stagePackages?: Array<string> | null

  /**
   * The [hooks](https://docs.snapcraft.io/build-snaps/hooks) directory, relative to `build` (build resources directory).
   * @default build/snap-hooks
   */
  readonly hooks?: string | null

  /**
   * The list of [plugs](https://snapcraft.io/docs/reference/interfaces).
   * Defaults to `["desktop", "desktop-legacy", "home", "x11", "wayland", "unity7", "browser-support", "network", "gsettings", "audio-playback", "pulseaudio", "opengl"]`.
   *
   * If list contains `default`, it will be replaced to default list, so, `["default", "foo"]` can be used to add custom plug `foo` in addition to defaults.
   *
   * Additional attributes can be specified using object instead of just name of plug:
   * ```
   *[
   *  {
   *    "browser-sandbox": {
   *      "interface": "browser-support",
   *      "allow-sandbox": true
   *    },
   *  },
   *  "another-simple-plug-name"
   *]
   * ```
   */
  readonly plugs?: Array<string | PlugDescriptor> | PlugDescriptor | null

  /**
   * The list of [slots](https://snapcraft.io/docs/reference/interfaces).
   *
   * Additional attributes can be specified using object instead of just name of slot:
   * ```
   *[
   *  {
   *    "mpris": {
   *      "name": "chromium"
   *    },
   *  }
   *]
   *
   * In case you want your application to be a compliant MPris player, you will need to definie
   * The mpris slot with "chromium" name.
   * This electron has it [hardcoded](https://source.chromium.org/chromium/chromium/src/+/master:components/system_media_controls/linux/system_media_controls_linux.cc;l=51;bpv=0;bpt=1),
   * and we need to pass this name so snap [will allow it](https://forum.snapcraft.io/t/unable-to-use-mpris-interface/15360/7) in strict confinement.
   *
   */
  readonly slots?: Array<string | SlotDescriptor> | PlugDescriptor | null

  /**
   * Specifies any [parts](https://snapcraft.io/docs/reference/parts) that should be built before this part.
   * Defaults to `["desktop-gtk2""]`.
   *
   * If list contains `default`, it will be replaced to default list, so, `["default", "foo"]` can be used to add custom parts `foo` in addition to defaults.
   */
  readonly after?: Array<string> | null

  /**
   * Whether to use template snap. Defaults to `true` if `stagePackages` not specified.
   */
  readonly useTemplateApp?: boolean

  /**
   * Whether or not the snap should automatically start on login.
   * @default false
   */
  readonly autoStart?: boolean

  /**
   * Specifies any files to make accessible from locations such as `/usr`, `/var`, and `/etc`. See [snap layouts](https://snapcraft.io/docs/snap-layouts) to learn more.
   */
  readonly layout?: { [key: string]: { [key: string]: string } } | null

  /**
   * Specifies which files from the app part to stage and which to exclude. Individual files, directories, wildcards, globstars, and exclusions are accepted. See [Snapcraft filesets](https://snapcraft.io/docs/snapcraft-filesets) to learn more about the format.
   *
   * The defaults can be found in [snap.ts](https://github.com/electron-userland/electron-builder/blob/master/packages/app-builder-lib/templates/snap/snapcraft.yaml#L29).
   */
  readonly appPartStage?: Array<string> | null

  /**
   * An optional title for the snap, may contain uppercase letters and spaces. Defaults to `productName`. See [snap format documentation](https://snapcraft.io/docs/snap-format).
   */
  readonly title?: string | null

  /**
   * Sets the compression type for the snap. Can be xz, lzo, or null.
   */
  readonly compression?: "xz" | "lzo" | null

  /**
   * Allow running the program with native wayland support with --ozone-platform=wayland.
   * Disabled by default because of this issue in older Electron/Snap versions: https://github.com/electron-userland/electron-builder/issues/4007
   */
  readonly allowNativeWayland?: boolean | null
}

export interface PlugDescriptor {
  [key: string]: { [key: string]: any } | null
}

export interface SlotDescriptor {
  [key: string]: { [key: string]: any } | null
}
