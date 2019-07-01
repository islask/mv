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
			this.getOwnerComponent().setModel(JSONModel, "passingParameters");
			this._oAppStateModel = this.getOwnerComponent().getModel("AppState");
			var oModel = new sap.ui.model.json.JSONModel();
			//Set the default date to today
			this.byId("claimStartDtPicker").setDateValue(new Date());
			//Global model to be used for person lookup
			var personLookupModel = new JSONModel();
			this.getOwnerComponent().setModel(personLookupModel, "personLookupModel");
			this.getOwnerComponent().getModel("personLookupModel").setProperty("/personId", "");

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
			this.getModel("passingParameters").setProperty("/", parameters);
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
		onPersonIdChange: function (oEvent) {
			var oModelPerson = this.getOwnerComponent().getModel("Persons"),
				oModel = this.getOwnerComponent().getModel(),
				oControl = oEvent.getSource(),
				that = this,
				sPeriodStartDate = new Date(),
				sPersonId = oEvent.getParameter("newValue");

			if (sPersonId.length > 0 && sPersonId.length < 9) {
				oControl.setBusy(true);

				var oParams = {
					"PersonId": sPersonId,
					"Role": this.byId("slRole").getSelectedKey(),
					"Appname": "ZHR_SUB_FM"
				};
				oControl.setBusy(true);
				this.getView().setBusy(true);
				oModelPerson.callFunction("/ValidatePerson", {
					method: "GET",
					urlParameters: oParams,
					/**
					 * Success callback for the get person
					 * @param {Object} oData Odate response
					 * @param {Object} response The response
					 * @returns {void}
					 */
					success: function (oData) {
						oControl.setBusy(false);
						that.getView().setBusy(false);
						if (oData.results.length > 0) {
							if (oData.results[0].Type === 'E') {
								oControl.setValueState("Error");
								oControl.setValueStateText(oData.results[0].Message);
								that.oAppStateModel.setProperty("/isValid/PersonidExt", false);
							}
						} else {
							oControl.setValueState("None");
							//		that.oAppStateModel.setProperty("/isValid/PersonidExt", true);
							that.readPersonBackend(sPersonId, oModel);
						}
					},
					/**
					 * Callback for the get person return
					 * @param {Object} oError Error object
					 * @returns {void}
					 */
					error: function () {
						var oMessageModel = sap.ui.getCore().getMessageManager().getMessageModel();
						for (var i = 0; i < oMessageModel.getProperty("/").length; i++) {
							if (oMessageModel.getProperty("/")[i].code === "ZQH/901") {
								oControl.setValueState("Error");
								oControl.setValueStateText(oMessageModel.getProperty("/")[i].message);
								oControl.setBusy(false);
								that.getView().setBusy(false);
								that.oAppStateModel.setProperty("/isValid/PersonidExt", false);
								break;
							}
						}
					}
				});
			}
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