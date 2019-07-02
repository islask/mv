sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("qldh.MV_Claim.controller.ClaimForm", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf qldh.MV_Claim.view.ClaimForm
		 */
		onInit: function () {
			var oJSONModel = new JSONModel({
				MileageSet: [],
				busy: true,
				busyIndicatorDelay: 0,
				enable: true
			});
			this.oMileageTable = this.getView().byId("tblMileage");
			this.getOwnerComponent().setModel(oJSONModel, "LocalMileage");
			this.oLocalMileageModel = this.getOwnerComponent().getModel("LocalMileage");
			this.oGlobalAppModel = this.getOwnerComponent().getModel("AppState");
			this.oMileageModel = this.getOwnerComponent().getModel("Mileage");
		},
		_onBtnAdd: function (oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("dialogMileage");

			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "qldh.MV_Claim.view.fragments.MileageRecord", this);
				oView.addDependent(oDialog);
				oDialog.setModel(this.oMileageModel, "oMileageModel");
			}
			oDialog.open();
		},
		_onUpdateKM: function () {
			this.getView().byId("inputTotKMxy").setValue(this.getView().byId("inputTotalKMx").getValue() - this.getView().byId("inputRetKMy").getValue());
		},
		_onBtnAccept: function (oEvent) {
			//Add row to the table
			var that = this;
			var oModel = this.getView().getModel("LocalMileage");
			var oTable = this.getView().byId("tblMileage");
		},
		_onBtnCancel: function () {
				this.byId("dialogMileage").close();
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf qldh.MV_Claim.view.ClaimForm
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf qldh.MV_Claim.view.ClaimForm
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf qldh.MV_Claim.view.ClaimForm
		 */
		//	onExit: function() {
		//
		//	}

	});

});