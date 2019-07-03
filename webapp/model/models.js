sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		/** 
		 * returns the global appstate model used throughout the application
		 * @returns {sap.ui.model.odata.json.JSONModel} oModel The appstate model
		 */
		createAppStateModel: function () {
			var oModel = new JSONModel({
				fields: {
					Persona: "",
					FormCode: "MVCLAIM",
					FormName: "Mileage Claim Form",
					FormDate: null,
					FormStatus: "DRAFT"
				}
			});
			return oModel;
		}

	};
});