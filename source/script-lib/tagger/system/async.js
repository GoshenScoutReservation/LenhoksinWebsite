"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();define(["system/linq"],function(t){function e(t){return window.setImmediate?void window.setImmediate(t):void window.setTimeout(t,0)}var n={DEFERED:0,PENDING:1,DONE:2},i=function(){function t(e){_classCallCheck(this,t),this._action=e,this._result=null,this._error=null,this._state=n.DEFERED,this._pendingActions=[]}return _createClass(t,[{key:"then",value:function(t){var i=this;return this._state===n.DONE?(e(function(){return t(i._error,i._result)}),this):(this.whenDone.push(t),this._state==n.DEFERED&&this.execute(),this)}},{key:"execute",value:function(){var t=this;this._state===n.DEFERED&&(this._state=n.PENDING,e(function(){return t.action(t._fulfull,t._reject)}))}},{key:"_fulfill",value:function(t){this._state===n.PENDING&&(this._state=n.DONE,this._result=t,void this._resolve())}},{key:"_reject",value:function(t){this._state===n.PENDING&&(this._state=n.DONE,this._err=t,void this._resolve())}},{key:"_resolve",value:function(){for(;this._pendingActions.length>0;){var t=this._pendingActions.pop();void t(this._error,this._result)}}}]),t}();return{await:function(t,e){return new i(t)},callAsync:e}});