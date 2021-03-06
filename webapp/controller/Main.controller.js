sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment"
], function(Controller, Fragment) {
	"use strict";

	return Controller.extend("hint.controller.Main", {
		onInit: function() {
			this._message = []; //массив для сообщений
			this._message.push(["Привет от NICKCODE.RU!", this.getView().byId("iconHint").getId()]);
		},

		onAfterRendering: function() {
			//взяли нашу иконку и определили для нее события mouseenter и mouseleave
			var oIcon = this.getView().byId("iconHint");
			oIcon.attachBrowserEvent("mouseenter", this.onMainIcon, this);
			oIcon.attachBrowserEvent("mouseleave", this.onIconMouseLeave, this);
		},

		//навели мышку на иконку
		onMainIcon: function(oEvent) {
			for (var i = 0; i < this._message.length; i++) {
				if (this._message[i][1] === oEvent.target.dataset.sapUi) {
					var message = this._message[i][0];
					break;
				}
			}
			this._openHelpPopOver(message, oEvent.target);
		},
		
		//убрали мышку с иконки
		onIconMouseLeave: function() {
			this._closePopOver();
		},

		//открывает tooltip
		_openHelpPopOver: function(sText, oElem) {
			this._getPopOver();
			this._setTextPopover(sText);
			if (this._oPopover._oOpenBy !== oElem) {
				this._oPopover.close();
			}
			this._oPopover.openBy(oElem);
		},
		
		//закрываем tooltip
		_closePopOver: function() {
			if (this._oPopover) {
				this._oPopover.close();
			}
		},
		
		//получаем popover, если его нету, то создаем
		_getPopOver: function() {
			if (!this._oPopover) {
				//создаем фрагмент
				this._oPopover = Fragment.byId("HelpPopover", "HelpPopoverId");
				if (!this._oPopover) {
					this._oPopover = sap.ui.xmlfragment("HelpPopover", "hint.view.fragment.HelpPopover", this);
				}
			}
			return this._oPopover;
		},

		//установить текст в сплывающем сообщении
		_setTextPopover: function(sText) {
			var oTxt = sap.ui.core.Fragment.byId("HelpPopover", "HelpTxtId");
			oTxt.setHtmlText(sText);
		}
	});
});