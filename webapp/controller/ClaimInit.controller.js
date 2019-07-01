sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("qldh.MV_Claim.controller.ClaimInit", {
		_oAppStateModel: null,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf qldh.MV_Claim.view.ClaimInit
		 */
		onInit: function () {
			var oJSONModel = new JSONModel({
				GUID: '123456',
				Role: 'abc',
				FormType: 'ZHR_SEARCH_FORMS',
				FormVersion: '0000'
			});
			this.getOwnerComponent().setModel(oJSONModel, "passingParameters");
			this._oAppStateModel = this.getOwnerComponent().getModel("AppState");
			//Set the default date to today
			this.byId("claimStartDtPicker").setDateValue(new Date());
			//Global model to be used for person lookup
			var personLookupModel = new JSONModel();
			this.getOwnerComponent().setModel(personLookupModel, "personLookupModel");
			this.getOwnerComponent().getModel("personLookupModel").setProperty("/personId", "");

		},

		onPersonaDataReceived: function (oEvent) {
			//When persona dropdown is receieved, if only one entry exists, i.e. ESS scenario,
			//trigger call to get the Person data and skip first screen if only 1 PAN exists.
			var oParameters = oEvent.getParameters();
		},
		_onPersonaSelected: function (oEvent) {
			var sSelectKey = oEvent.getSource().getSelectedKey();
			this.personaSelected = sSelectKey;
			this.getOwnerComponent().getModel("AppState").setProperty("Persona", sSelectKey);

		},
		handleStartPress: function (oEvent) {
			//sap.ui.core.UIComponent.getRouterFor(this).navTo("MVClaimForm");
			this.getOwnerComponent().getRouter().navTo("MVClaimForm");
		},

		/** 
		 * Opens the Person lookup dialog
		 * @returns {void}
		 */
		onPersonNumberValueHelp: function () {
			var oView = this.getView();
			var oDialog = oView.byId("dlgPersonLookup");

			var parameters = {
				InitiatorRole: this.byId("selCreateFor").getSelectedKey(),
				Appname: "MVCLAIM"
			};
			oView.getModel("passingParameters").setProperty("/", parameters);
			// create dialog lazily
			if (!oDialog) {
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "qldh.MV_Claim.view.fragments.PersonLookup", this);
				oView.addDependent(oDialog);
			}
			oDialog.open();
		},
		/** 
		 * Event handler for the person id input field
		 * @param {sap.ui.core.Event} oEvent event object from the ui element
		 * @returns {void}
		 */
		onPersonIdChange: function (oEvent) {},

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
		onExit: function () {
			this.destroy();
		}

	});

});