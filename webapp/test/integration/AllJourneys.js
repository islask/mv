/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"qldh/MV_Claim/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"qldh/MV_Claim/test/integration/pages/App",
	"qldh/MV_Claim/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "qldh.MV_Claim.view.",
		autoWait: true
	});
});