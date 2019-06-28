sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("qldh.MV_Claim.controller.ClaimInit", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf qldh.MV_Claim.view.ClaimInit
		 */
		onInit: function () {
			var oModel = new sap.ui.model.json.JSONModel();

			oModel.loadData("./data/ClaimFor.json", '', false); //Test code remove
			this.getView().setModel(oModel, "PersonaSet");
			this.getView().byId("selCreateFor").setModel(oModel);
		},

		_onPersonaSelected: function (oEvent) {
			var sSelectKey = oEvent.getSource().getSelectedKey();
			this.personaSelected = sSelectKey;
			this.getOwnerComponent().getModel("AppState").setProperty("Persona", sSelectKey);

			//Clear the bindings if the user changes the role.
			var sPath = this.getView().getBindingContext().getPath(),
				oModel = this.getView().getModel();
		},
		handleStartPress: function (oEvent) {
			//sap.ui.core.UIComponent.getRouterFor(this).navTo("MVClaimForm");
			this.getOwnerComponent().getRouter().navTo("MVClaimForm");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf qldh.MV_Claim.view.ClaimInit
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf qldh.MV_Claim.view.ClaimInit
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf qldh.MV_Claim.view.ClaimInit
		 */
		//	onExit: function() {
		//
		//	}

	});

});