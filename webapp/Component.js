sap.ui.define([

		"sap/ui/core/UIComponent",
		"sap/ui/Device",
		"qldh/MV_Claim/model/models"
	],
	function (UIComponent, Device, models) {
		"use strict";
		jQuery.sap.registerModulePath("qldh.personlookup.ZHR_PERLKUP_SUB", "../sap/bc/ui5_ui5/sap/ZHR_PERLKUP_SUB");
		return UIComponent.extend("qldh.MV_Claim.Component", {

			metadata: {
				manifest: "json"
			},

			/**
			 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
			 * @public
			 * @override
			 */
			init: function () {
				// call the base component's init function
				UIComponent.prototype.init.apply(this, arguments);

				// enable routing
				this.getRouter().initialize();

				// set the device model
				this.setModel(models.createDeviceModel(), "device");

				// set the App State model
				this.setModel(models.createAppStateModel(), "AppState");
			}
		});
	});