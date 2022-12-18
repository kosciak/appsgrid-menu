/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */
/* exported init enable disable */

const {Clutter, GObject, St} = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

const Me = ExtensionUtils.getCurrentExtension();

const _ = ExtensionUtils.gettext;
const N_ = x => x;

const APPS_GRID_ICON_NAME = 'view-app-grid-symbolic';


class AppsGridMenu extends PanelMenu.Button {
    static {
        GObject.registerClass(this);
    }

    constructor() {
        super(0.0, _('Show Applications'));

        let icon = new St.Icon({
	        icon_name: APPS_GRID_ICON_NAME,
	        style_class: 'system-status-icon',
	        icon_size: 20,
        });
        this.add_actor(icon);
        
        this.connect('button-release-event', () => this._onClicked());

    }
    
    _onClicked() {
		if (Main.overview.visible && Main.overview.dash.showAppsButton.checked) {
			Main.overview.dash.showAppsButton.checked = false;
			Main.overview.hide();
		} else {
		    Main.overview.dash.showAppsButton.checked = true;
			Main.overview.showApps();
		}
	}
    
    _destroy() {
		super.destroy();
	}

}


/** */
function init() {
    ExtensionUtils.initTranslations();
}

let _indicator;

/** */
function enable() {
    _indicator = new AppsGridMenu();

    let pos = Main.sessionMode.panel.left.indexOf('appMenu');
    if ('apps-menu' in Main.panel.statusArea)
        pos++;
    Main.panel.addToStatusArea('appsgrid-menu', _indicator, pos, 'left');
}

/** */
function disable() {
    _indicator.destroy();
}

