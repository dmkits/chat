//>>built
define("dojox/dgauges/LinearScaler",["dojo/_base/lang","dojo/_base/declare","dojo/Stateful"],function(l,h,k){return h("dojox.dgauges.LinearScaler",k,{minimum:0,maximum:100,snapInterval:1,majorTickInterval:NaN,minorTickInterval:NaN,minorTicksEnabled:!0,majorTicks:null,minorTicks:null,_computedMajorTickInterval:NaN,_computedMinorTickInterval:NaN,constructor:function(){this.watchedProperties="minimum maximum majorTickInterval minorTickInterval snapInterval minorTicksEnabled".split(" ")},_buildMinorTickItems:function(){var a=
this.majorTicks,b=[];if(this.maximum>this.minimum)for(var c=Math.floor((this.maximum-this.minimum)/this.getComputedMajorTickInterval())+1,d=Math.floor(this.getComputedMajorTickInterval()/this.getComputedMinorTickInterval()),e,f=0;f<c-1;f++)for(var g=1;g<d;g++)e={scaler:this,isMinor:!0},e.value=a[f].value+g*this.getComputedMinorTickInterval(),e.position=(Number(e.value)-this.minimum)/(this.maximum-this.minimum),b.push(e);return b},_buildMajorTickItems:function(){var a=[];if(this.maximum>this.minimum)for(var b=
Math.floor((this.maximum-this.minimum)/this.getComputedMajorTickInterval())+1,c,d=0;d<b;d++)c={scaler:this,isMinor:!1},c.value=this.minimum+d*this.getComputedMajorTickInterval(),c.position=(Number(c.value)-this.minimum)/(this.maximum-this.minimum),a.push(c);return a},getComputedMajorTickInterval:function(){if(!isNaN(this.majorTickInterval))return this.majorTickInterval;isNaN(this._computedMajorTickInterval)&&(this._computedMajorTickInterval=(this.maximum-this.minimum)/10);return this._computedMajorTickInterval},
getComputedMinorTickInterval:function(){if(!isNaN(this.minorTickInterval))return this.minorTickInterval;isNaN(this._computedMinorTickInterval)&&(this._computedMinorTickInterval=this.getComputedMajorTickInterval()/5);return this._computedMinorTickInterval},computeTicks:function(){this.majorTicks=this._buildMajorTickItems();this.minorTicks=this.minorTicksEnabled?this._buildMinorTickItems():[];return this.majorTicks.concat(this.minorTicks)},positionForValue:function(a){var b;if(null==a||isNaN(a)||a<=
this.minimum)b=0;a>=this.maximum&&(b=1);isNaN(b)&&(b=(a-this.minimum)/(this.maximum-this.minimum));return b},valueForPosition:function(a){a=this.minimum+Math.abs(this.minimum-this.maximum)*a;!isNaN(this.snapInterval)&&0<this.snapInterval&&(a=Math.round((a-this.minimum)/this.snapInterval)*this.snapInterval+this.minimum);return a}})});
//# sourceMappingURL=LinearScaler.js.map