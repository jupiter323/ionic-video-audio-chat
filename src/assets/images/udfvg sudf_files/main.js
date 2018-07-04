webpackJsonp([5],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatPage = (function () {
    function ChatPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ChatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatPage');
    };
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chat',template:/*ion-inline-start:"/Users/admin/Desktop/dateApp/app/src/pages/chat/chat.html"*/'\n<ion-header>\n  <ion-navbar color="primary">\n  	<img src="images/slide.jpg" class="profileImage">\n  	<span class="name">Brian Henry</span>\n  	<ion-icon name="more" class="moreIcon"></ion-icon>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content style="background-image: url(images/bg.jpeg)">\n    <ion-grid>\n    	<ion-row>\n    		<ion-col>\n    		</ion-col>\n    	</ion-row>\n    </ion-grid>\n</ion-content>\n<ion-footer>\n	<div offset-lg-2 offset-xl-2  offse-md-2 offset-sm-2  style="padding:5px;">\n  	 <ion-icon name="more" class="chatIcon" style="display: none"></ion-icon>\n  	 <ion-icon name="camera" class="chatIcon"></ion-icon>\n  	 <ion-icon name="image" class="chatIcon"></ion-icon>\n  	 <textarea placeholder="Aa" class="textArea"></textarea>\n  	 <ion-icon name="sad" class="chatIcon emoji"></ion-icon>\n  	 <ion-icon name="send" class="chatIcon emoji emoji2" style="margin-left:30px"></ion-icon>\n		\n	</div>\n</ion-footer>\n'/*ion-inline-end:"/Users/admin/Desktop/dateApp/app/src/pages/chat/chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProviderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProviderPage = (function () {
    function ProviderPage(socket, events, loadCtrl, toastCtrl) {
        var _this = this;
        this.socket = socket;
        this.events = events;
        this.loadCtrl = loadCtrl;
        this.toastCtrl = toastCtrl;
        this.socketResponse().subscribe(function (res) {
            var data = res;
            switch (data.module) {
                case 'signupResponse':
                    _this.LoadController.dismiss();
                    switch (data.res) {
                        case "failed":
                            __WEBPACK_IMPORTED_MODULE_4_jquery__('.errMessage').text('The email you entered is already registered.').show();
                            break;
                        case "success":
                            __WEBPACK_IMPORTED_MODULE_4_jquery__('#Signup').hide(300, function () {
                                __WEBPACK_IMPORTED_MODULE_4_jquery__('#verification').toggle(300);
                            });
                            break;
                    }
                    break;
                case 'loginResponse':
                    _this.LoadController.dismiss();
                    switch (data.res) {
                        case "inactive":
                            __WEBPACK_IMPORTED_MODULE_4_jquery__('#login').hide(300, function () {
                                __WEBPACK_IMPORTED_MODULE_4_jquery__('#verification').toggle(300);
                            });
                            break;
                        case "success":
                            _this.events.publish('successLogin');
                            break;
                        case "success2":
                            __WEBPACK_IMPORTED_MODULE_4_jquery__('#verification2').hide(function () {
                                __WEBPACK_IMPORTED_MODULE_4_jquery__('#fgPass').show(300, function () {
                                    __WEBPACK_IMPORTED_MODULE_4_jquery__('#fgPass3').hide();
                                    __WEBPACK_IMPORTED_MODULE_4_jquery__('#fgPass2').show();
                                });
                            });
                            break;
                        case 'codeSent':
                            var count_1 = 30;
                            var interval = setInterval(function () {
                                if (count_1 == 0) {
                                    __WEBPACK_IMPORTED_MODULE_4_jquery__('.resendBtn').attr('disabled', false).text('Resend code');
                                    clearInterval(interval);
                                }
                                else {
                                    __WEBPACK_IMPORTED_MODULE_4_jquery__('.resendBtn').attr('disabled', true).text('Code sent ' + count_1);
                                }
                                count_1--;
                            }, 1000);
                            break;
                        case 'codeSent2':
                            var count2_1 = 30;
                            var interval = setInterval(function () {
                                if (count2_1 == 0) {
                                    __WEBPACK_IMPORTED_MODULE_4_jquery__('.resendBtn2').attr('disabled', false).text('Resend code');
                                    clearInterval(interval);
                                }
                                else {
                                    __WEBPACK_IMPORTED_MODULE_4_jquery__('.resendBtn2').attr('disabled', true).text('Code sent ' + count2_1);
                                }
                                count2_1--;
                            }, 1000);
                            break;
                        case 'emailFound':
                            __WEBPACK_IMPORTED_MODULE_4_jquery__('#fgPass').hide();
                            __WEBPACK_IMPORTED_MODULE_4_jquery__('#verification2').show();
                            break;
                        default:
                            __WEBPACK_IMPORTED_MODULE_4_jquery__('.errMessage').text(data.res).show();
                            break;
                    }
                    break;
            }
        });
    }
    ProviderPage.prototype.socketRequest = function (data) {
        this.socket.emit('appData', data);
    };
    ProviderPage.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    };
    ProviderPage.prototype.showLoad = function () {
        this.LoadController = this.loadCtrl.create({
            content: 'just a moment...'
        });
        this.LoadController.present();
    };
    ProviderPage.prototype.socketResponse = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('serverData', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    ProviderPage.prototype.functionDate = function () {
        var day = new Date();
        var Todaydate = day.getDate() + '/' + Math.floor(day.getMonth() + 1) + '/' + day.getFullYear();
        var PreviousDate = Math.floor(day.getDate() - 1) + '/' + Math.floor(day.getMonth() + 1) + '/' + day.getFullYear();
        return [Todaydate, PreviousDate];
    };
    ProviderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-provider',template:/*ion-inline-start:"/Users/admin/Desktop/dateApp/app/src/pages/provider/provider.html"*/''/*ion-inline-end:"/Users/admin/Desktop/dateApp/app/src/pages/provider/provider.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], ProviderPage);
    return ProviderPage;
}());

//# sourceMappingURL=provider.js.map

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 122;

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/call/call.module": [
		323,
		4
	],
	"../pages/chat/chat.module": [
		324,
		3
	],
	"../pages/image/image.module": [
		325,
		2
	],
	"../pages/index/index.module": [
		327,
		1
	],
	"../pages/provider/provider.module": [
		326,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 163;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.search = function (hide, show) {
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#' + hide + '').slideUp(300, function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__('#' + show + '').toggle();
        });
    };
    HomePage.prototype.clearSearch = function () {
        this.searchValue = '';
    };
    HomePage.prototype.slideChanged = function () {
        var pos = this.slides.getActiveIndex();
        if (pos < 4) {
            __WEBPACK_IMPORTED_MODULE_2_jquery__('.active').removeClass('active');
            __WEBPACK_IMPORTED_MODULE_2_jquery__('.cls' + pos + '').addClass('active');
        }
    };
    HomePage.prototype.switchSlide = function (pos) {
        this.slides.slideTo(pos, 600);
    };
    HomePage.prototype.gotScrolled = function (event) {
        var pos = 0;
        var scroll = __WEBPACK_IMPORTED_MODULE_2_jquery__(".content").scrollTop();
        __WEBPACK_IMPORTED_MODULE_2_jquery__('.scroll').text(scroll);
        alert(scroll);
        pos = scroll;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */])
    ], HomePage.prototype, "slides", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/admin/Desktop/dateApp/app/src/pages/home/home.html"*/'\n\n<ion-content>\n <ion-grid class="padding"  style="overflow:hidden;height: 100%">\n	<ion-row style="height: 100%">\n		<ion-col  col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 col-sm-8 offset-sm-2 col-md-6 offset-md-3 style="padding:0px">\n			<div id="Header"  col-12>\n				<div id="blindy">\n					<span class="appName">Blindy</span>\n					<ion-icon class="searchIcon" name="more"></ion-icon>\n					<button class="searchIcon" (click)="search(\'Header\', \'Header2\')">\n						<ion-icon  name="search"></ion-icon>\n					</button>\n					<span class="scroll"></span>\n\n				</div>\n				<div col-12>\n					<span col-2 offset-1 class="menuItem active cls0" (click)="switchSlide(0)">Home</span>\n					<span col-2 offset-1 class="menuItem cls1" (click)="switchSlide(1)">Friends\n						<span class="friendNote">\n							0\n						</span></span>\n					<span col-2 offset-1 class="menuItem cls2" (click)="switchSlide(2)">Chat\n					<ion-icon  class="chatNote" name="chatbubbles"></ion-icon>\n						\n					</span>\n					<span col-2 offset-1 class="menuItem cls3" (click)="switchSlide(3)">Profile</span>\n				</div>\n			</div>\n			<div id="Header2">\n				<button style="background-color: transparent;">\n					<ion-icon (click)="search(\'Header2\', \'Header\')" class="backArrow" name="arrow-round-back">\n					</ion-icon>\n				</button>\n				<input [(ngModel)]="searchValue" type="text" placeholder="search here...">\n				<button *ngIf="searchValue" (click)="clearSearch()" style="font-size:15px;background-color: transparent;font-family: cursive;margin-left: 5px;">X</button>\n			</div>\n			<ion-slides (ionSlideDidChange)="slideChanged()" style="height:100%">\n				\n				<ion-slide>Home</ion-slide>\n				<ion-slide>\n					<ion-item no-lines class="mainDiv">\n							<img src="images/slide.jpg" class="friendImage">\n							<ion-item class="itemDes">\n									<span class="name">Brian henry</span><br/>\n									<div style="float:right;">\n										<ion-icon class="friendIcon" name="videocam"></ion-icon>\n										<ion-icon class="friendIcon" name="call"></ion-icon>\n										<ion-icon class="friendIcon" name="chatbubbles"></ion-icon>\n									</div>\n							</ion-item>\n					</ion-item>\n				</ion-slide>\n				<ion-slide on-scroll="gotScrolled($event)" class="content">\n						<ion-item no-lines class="mainDiv">\n							<img src="images/slide.jpg" class="friendImage">\n							<ion-item class="itemDes">\n									<span class="name">Brian henry</span>\n									<div class="messtime">12:10<br/><br/>\n									<span class="unread">10</span></div><br/><br/>\n							this is the message to be writem here egertgrg xvc cvd\n							</ion-item>\n						</ion-item>\n				</ion-slide>\n				<ion-slide>Profile</ion-slide>\n			</ion-slides>\n		</ion-col>\n	</ion-row>\n</ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/admin/Desktop/dateApp/app/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CallPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the CallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CallPage = (function () {
    function CallPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CallPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CallPage');
    };
    CallPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-call',template:/*ion-inline-start:"/Users/admin/Desktop/dateApp/app/src/pages/call/call.html"*/'<!--\n  Generated template for the CallPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>call</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/admin/Desktop/dateApp/app/src/pages/call/call.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], CallPage);
    return CallPage;
}());

//# sourceMappingURL=call.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ImagePage = (function () {
    function ImagePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ImagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ImagePage');
    };
    ImagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-image',template:/*ion-inline-start:"/Users/admin/Desktop/dateApp/app/src/pages/image/image.html"*/'<!--\n  Generated template for the ImagePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>image</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/admin/Desktop/dateApp/app/src/pages/image/image.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], ImagePage);
    return ImagePage;
}());

//# sourceMappingURL=image.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__provider_provider__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var IndexPage = (function () {
    function IndexPage(navCtrl, events, navParams, provider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.events = events;
        this.navParams = navParams;
        this.provider = provider;
        this.events.subscribe('successLogin', function (data) {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */], { email: _this.emailReal });
        });
    }
    IndexPage.prototype.ionViewDidLoad = function () {
        setTimeout(function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__('#slideImage').toggle(1000, function () {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('#content').toggle(600);
            });
        }, 2000);
    };
    IndexPage.prototype.focus = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__('.errMessage').hide();
        this.errorMessage = undefined;
    };
    IndexPage.prototype.hideShow = function (hide, show) {
        __WEBPACK_IMPORTED_MODULE_2_jquery__('.errMessage').hide();
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#' + hide + '').hide(300, function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__('#' + show + '').show(300);
        });
    };
    IndexPage.prototype.onKeyPress = function (event) {
        if (event.keyCode >= 48 && event.keyCode <= 57) {
            return true;
        }
        else {
            return false;
        }
    };
    IndexPage.prototype.hideShowx = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__('.hideClass').hide(function () {
            __WEBPACK_IMPORTED_MODULE_2_jquery__('#login').show();
        });
    };
    IndexPage.prototype.indexSubmit = function (module, data) {
        var datam = [];
        if (module == 'signup' || module == 'login' || module == 'fgPass') {
            if (!ValidateEmail(data[0])) {
                this.errorMessage = 'Enter a valid email.';
                __WEBPACK_IMPORTED_MODULE_2_jquery__('.errMessage').show();
            }
            else if (data[1] && data[1].length < 8) {
                this.errorMessage = 'Password is too short, at least 8 characters.';
                __WEBPACK_IMPORTED_MODULE_2_jquery__('.errMessage').show();
            }
            else if (data[2] && data[1] == data[2]) {
                this.errorMessage = 'Username cannot be the password.';
                __WEBPACK_IMPORTED_MODULE_2_jquery__('.errMessage').show();
            }
            this.emailReal = data[0];
        }
        else {
            if (ValidateEmail(this.email)) {
                data.push(this.email);
                datam = data;
                this.emailReal = this.email;
            }
            else if (ValidateEmail(this.email1)) {
                data.push(this.email1);
                this.emailReal = this.email1;
                datam = data;
            }
            else if (ValidateEmail(this.email2)) {
                data.push(this.email2);
                datam = data;
                this.emailReal = this.email2;
            }
        }
        if (this.errorMessage == undefined) {
            this.provider.showLoad();
            data.unshift(module);
            datam = data;
            this.provider.socketRequest({ data: datam });
        }
    };
    IndexPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-index',template:/*ion-inline-start:"/Users/admin/Desktop/dateApp/app/src/pages/index/index.html"*/'\n<ion-content>\n	<ion-grid class="padding">\n		<ion-row style="height: 100%">\n			<ion-col class="padding" style="text-align: center;">\n				<img id="slideImage" src="images/slide.jpg">\n				<div style="display: none" id="content">\n					<div>\n						<img src="images/icon.jpg" id="logo">\n						<div col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 col-sm-8 offset-sm-2 col-md-6 offset-md-3>\n							<div class="errMessage">* {{errorMessage}}</div>\n							<div id="login">\n								<ion-item no-lines>\n									<ion-label floating style="font-size:14px;text-align: center;color: #D80D88">Email</ion-label>\n									<ion-input (ionFocus)="focus()" [(ngModel)]="email" type="email"></ion-input>\n								</ion-item>\n								<ion-item no-lines>\n									<ion-label floating style="font-size:14px;text-align: center;color: #D80D88">Password</ion-label>\n									<ion-input (ionFocus)="focus()" [(ngModel)]="password"  type="password"></ion-input>\n								</ion-item>\n								<ion-item no-lines>\n									<button class="indexBtn" (click)="indexSubmit(\'login\',[email.trim(), password.trim()])" style="margin-top: 10px;" [disabled]="(!email || email.trim() == \'\'|| !password || password.trim() == \'\')">Sign in</button>\n								</ion-item>\n								<ion-item no-lines>\n									<button class="indexBtn" style="margin-top:-25px;color:grey;font-size: 14px;background-color: transparent;" (click)="hideShow(\'login\', \'fgPass\')">Forgot password ?</button>\n								</ion-item>\n								<ion-item no-lines>\n									<button class="indexBtn" style="margin-top: 10px;color:black;font-size: 14px;background-color: transparent;"(click)="hideShow(\'login\', \'Signup\')">Create a new account.</button>\n								</ion-item>\n						  </div>\n						  <div class="hideClass" style="display: none" id="Signup">\n								<ion-item no-lines>\n									<ion-label floating style="font-size:14px;text-align: center;color: #D80D88">Username</ion-label>\n									<ion-input (ionFocus)="focus()" [(ngModel)]="username"  type="text"></ion-input>\n								</ion-item>\n								<ion-item no-lines>\n									<ion-label floating style="font-size:14px;text-align: center;color: #D80D88">Email</ion-label>\n									<ion-input (ionFocus)="focus()" [(ngModel)]="email1"  type="email"></ion-input>\n								</ion-item>\n								<ion-item no-lines>\n									<ion-label floating style="font-size:14px;text-align: center;color: #D80D88">Password</ion-label>\n									<ion-input (ionFocus)="focus()" [(ngModel)]="password1"  type="password"></ion-input>\n								</ion-item>\n								<ion-item no-lines>\n									<button class="indexBtn"   (click)="indexSubmit(\'signup\',[email1.trim(), password1.trim(), username.trim()])" [disabled]="(!email1 || email1.trim() == \'\' || !password1 || password1.trim() == \'\' || !username || username.trim() == \'\')" style="margin-top: 10px;">Sign up</button>\n								</ion-item>\n								\n								<ion-item no-lines>\n									<button class="indexBtn" style="margin-top: 10px;color:grey;font-size: 14px;background-color: transparent;" (click)="hideShow(\'Signup\',\'login\')">Already have an account? Log in</button>\n								</ion-item>\n						  </div>\n						  <div class="hideClass" style="display: none" id="fgPass">\n							  	<div style="display: none" id="fgPass2">\n									<ion-item no-lines>\n										<ion-label floating style="font-size:14px;text-align: center;color: #D80D88">New password</ion-label>\n										<ion-input (ionFocus)="focus()" [(ngModel)]="pass1" type="password"></ion-input>\n									</ion-item>\n									<ion-item no-lines>\n										<ion-label floating style="font-size:14px;text-align: center;color: #D80D88">Confirm password</ion-label>\n										<ion-input (ionFocus)="focus()" [(ngModel)]="pass2"  type="password"></ion-input>\n									</ion-item>\n									<ion-item no-lines>\n										<button class="indexBtn" [disabled]="(!pass1 || pass1.trim() == \'\' || !pass2 || pass2.trim() == \'\')" (click)="indexSubmit(\'passReset\', [pass1, pass2])" style="margin-top: 10px;">Reset Password</button>\n									</ion-item>\n								</div>\n								<div id="fgPass3">\n									<ion-item no-lines>\n										<ion-label floating style="font-size:14px;text-align: center;color: #D80D88">Your email</ion-label>\n										<ion-input (ionFocus)="focus()" [(ngModel)]="email2" type="text"></ion-input>\n									</ion-item>\n									<ion-item no-lines>\n										<button class="indexBtn" (click)="indexSubmit(\'fgPass\',[email2.trim()])" [disabled]="(!email2 || email2.trim() == \'\')"  style="margin-top: 10px;">Submit</button>\n									</ion-item>\n						        </div>\n								<ion-item no-lines>\n									<button class="indexBtn" style="margin-top: 10px;color:grey;font-size: 14px;background-color: transparent;" (click)="hideShowx()">Back to log in</button>\n								</ion-item>\n						  </div>\n						   <div class="hideClass" style="display: none" id="verification">\n								<ion-item no-lines>\n									<ion-label floating style="font-size:14px;text-align: center;color: #D80D88">Enter verification code sent to your email</ion-label>\n									<ion-input (ionFocus)="focus()" [(ngModel)]="verCode" (keypress)="onKeyPress($event)" type="text" maxlength="6"></ion-input>\n								</ion-item>\n								<ion-item no-lines>\n									<button class="indexBtn" [disabled]="(!verCode || verCode.trim() == \'\' || verCode.length < 6)" style="margin-top: 10px;"   (click)="indexSubmit(\'codeVerification\',[verCode])" >Continue</button>\n								</ion-item>\n								<ion-item no-lines>\n									<button class="indexBtn resendBtn" style="margin-top: 10px;background-color: transparent;color: #D80D88"   (click)="indexSubmit(\'ResendCode\',[\'code\'])" >Resend code</button>\n								</ion-item>\n								<ion-item no-lines>\n									<button class="indexBtn" style="margin-top: 10px;color:grey;font-size: 14px;background-color: transparent;"  (click)="hideShowx()" >Back to log in</button>\n								</ion-item>\n					        </div>\n					        <div style="display: none" id="verification2">\n								<ion-item no-lines>\n									<ion-label floating style="font-size:14px;text-align: center;color: #D80D88">Enter verification code sent to your email</ion-label>\n									<ion-input (ionFocus)="focus()" [(ngModel)]="verCode2" (keypress)="onKeyPress($event)" type="text" maxlength="6"></ion-input>\n								</ion-item>\n								<ion-item no-lines>\n									<button class="indexBtn" [disabled]="(!verCode2 || verCode2.trim() == \'\' || verCode2.length < 6)" style="margin-top: 10px;"   (click)="indexSubmit(\'codeVerification2\',[verCode2])" >Continue</button>\n								</ion-item>\n								<ion-item no-lines>\n									<button class="indexBtn resendBtn2" style="margin-top: 10px;background-color: transparent;color: #D80D88"   (click)="indexSubmit(\'ResendCode2\',[\'code\'])" >Resend code</button>\n								</ion-item>\n								<ion-item no-lines>\n									<button class="indexBtn" style="margin-top: 10px;color:grey;font-size: 14px;background-color: transparent;"  (click)="hideShowx()" >Back to log in</button>\n								</ion-item>\n					        </div>\n						</div>\n					</div>\n				</div>\n			</ion-col>\n		</ion-row>		\n	</ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/admin/Desktop/dateApp/app/src/pages/index/index.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__provider_provider__["a" /* ProviderPage */]])
    ], IndexPage);
    return IndexPage;
}());

function ValidateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(248);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_call_call__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_chat_chat__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_image_image__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_index_index__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_provider_provider__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng_socket_io__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng_socket_io__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var config = { url: 'http://192.168.43.41:9000', options: {} };
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_call_call__["a" /* CallPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_image_image__["a" /* ImagePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_index_index__["a" /* IndexPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_12_ng_socket_io__["SocketIoModule"].forRoot(config),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/call/call.module#CallPageModule', name: 'CallPage', segment: 'call', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/image/image.module#ImagePageModule', name: 'ImagePage', segment: 'image', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/provider/provider.module#ProviderPageModule', name: 'ProviderPage', segment: 'provider', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/index/index.module#IndexPageModule', name: 'IndexPage', segment: 'index', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_call_call__["a" /* CallPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_image_image__["a" /* ImagePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_index_index__["a" /* IndexPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__pages_provider_provider__["a" /* ProviderPage */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 294:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__["a" /* ChatPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/admin/Desktop/dateApp/app/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/admin/Desktop/dateApp/app/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[225]);
//# sourceMappingURL=main.js.map