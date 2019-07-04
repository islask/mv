sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("qldh.ZHR_F_MV_CLAIM.controller.ClaimInit", {
		_oAppStateModel: null,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf qldh.ZHR_F_MV_CLAIM.view.ClaimInit
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
			//this.byId("claimStartDtPicker").setDateValue(new Date());
			//Global model to be used for person lookup
			var personLookupModel = new JSONModel();
			this.getOwnerComponent().setModel(personLookupModel, "personLookupModel");
			this.getOwnerComponent().getModel("personLookupModel").setProperty("/personId", "");

			//Routing
			if (sap.ui.core.UIComponent.getRouterFor(this).getRoute("ClaimInit") && !sap.ui.core.UIComponent.getRouterFor(this).getRoute(
					"ClaimInit")
				.mEventRegistry.patternMatched) {
				sap.ui.core.UIComponent.getRouterFor(this).getRoute("ClaimInit").attachPatternMatched(this._onObjectMatched, this);
			}

		},
		/**
		 * Fetches the value from the selected item in the table of the person lookup
		 * @returns {void}
		 */
		onPersonSelect: function () {
			//this._oLogger.info("inside onPersonSelect");
			var oPersonLookupModel = this.getOwnerComponent().getModel("personLookupModel"),
				oData = oPersonLookupModel.getData(),
				oEvtParams = {
					onPersonSelect: true
				};
			this.getModel().setProperty(this.getView().getBindingContext().getPath() + "/PersonId", parseInt(oData.personId));
			this.getModel().setProperty(this.getView().getBindingContext().getPath() + "/PersonnelAssignmentNumber", parseInt(oData.pan));

			//	this.getView().byId("EmfInpPersonId").fireChangeEvent(oData.personId, oEvtParams);
			this.onPersonCancel();
		},
		/**
		 * Closes the Person lookup dialog
		 * @returns {void}
		 */
		onPersonCancel: function () {
			this.getView().byId("dlgPersonLookup").destroy();
		},
		onPersonaDataReceived: function (oEvent) {
			//When persona dropdown is receieved, if only one entry exists, i.e. ESS scenario,
			//trigger call to get the Person data and skip first screen if only 1 PAN exists.
			var oParameters = oEvent.getParameters();
		},
		onDateChange: function (oEvent) {
			var sFormDate = oEvent.getSource().getValue();
			this.FormDate = sFormDate;
			this.getOwnerComponent().getModel("AppState").setProperty("/fields/FormDate", sFormDate);
		},
		_onPersonaSelected: function (oEvent) {
			var sSelectKey = oEvent.getSource().getSelectedKey();
			this.personaSelected = sSelectKey;
			this.getOwnerComponent().getModel("AppState").setProperty("/fields/Persona", sSelectKey);

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
				oDialog = sap.ui.xmlfragment(oView.getId(), "qldh.ZHR_F_MV_CLAIM.view.fragments.PersonLookup", this);
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
		 * @memberOf qldh.ZHR_F_MV_CLAIM.view.ClaimInit
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf qldh.ZHR_F_MV_CLAIM.view.ClaimInit
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf qldh.ZHR_F_MV_CLAIM.view.ClaimInit
		 */
		onExit: function () {
			this.destroy();
		}

	});

});