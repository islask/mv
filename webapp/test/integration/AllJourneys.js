/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"qldh/ZHR_F_MV_CLAIM/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"qldh/ZHR_F_MV_CLAIM/test/integration/pages/App",
	"qldh/ZHR_F_MV_CLAIM/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "qldh.ZHR_F_MV_CLAIM.view.",
		autoWait: true
	});
});