'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);
  var _super = _createSuper(_class);
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _super.call(this);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">HMM documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"license.html\"  data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>LICENSE\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"' : 'data-bs-target="#xs-components-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"' : 'id="xs-components-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/AddFeatureDialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AddFeatureDialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AddMemberComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AddMemberComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AddMicroserviceComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AddMicroserviceComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AddModelArtifactDialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AddModelArtifactDialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AddStoryComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AddStoryComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AddTeamComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AddTeamComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/DashboardComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >DashboardComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/DeleteSystemDialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >DeleteSystemDialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/EditMemberComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >EditMemberComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/EditMicroserviceComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >EditMicroserviceComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/EditStoryComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >EditStoryComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/EditTeamComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >EditTeamComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ErrorPageComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ErrorPageComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/MembersComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >MembersComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/MicroservicesComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >MicroservicesComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ModelArtifactsComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ModelArtifactsComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/NewSystemComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >NewSystemComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SelectMemberDialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SelectMemberDialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SelectMicroserviceDialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SelectMicroserviceDialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ServiceStoriesComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ServiceStoriesComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SystemComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SystemComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/TeamsComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >TeamsComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ViewArtifactDialogComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ViewArtifactDialogComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ViewMicroserviceComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ViewMicroserviceComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/WidgetMembersComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >WidgetMembersComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/WidgetMicroservicesComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >WidgetMicroservicesComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/WidgetStoriesComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >WidgetStoriesComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/WidgetSystemOverviewComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >WidgetSystemOverviewComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/WidgetTeamsComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >WidgetTeamsComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#pipes-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"' : 'data-bs-target="#xs-pipes-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"', ">\n                                            <span class=\"icon ion-md-add\"></span>\n                                            <span>Pipes</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="pipes-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"' : 'id="xs-pipes-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"', ">\n                                            <li class=\"link\">\n                                                <a href=\"pipes/TruncatePipe.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >TruncatePipe</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AppRoutingModule.html\" data-type=\"entity-link\" >AppRoutingModule</a>\n                            </li>\n                </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#classes-links"' : 'data-bs-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/CompleteTeam.html\" data-type=\"entity-link\" >CompleteTeam</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Utils.html\" data-type=\"entity-link\" >Utils</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/MemberService.html\" data-type=\"entity-link\" >MemberService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/MicroserviceService.html\" data-type=\"entity-link\" >MicroserviceService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ModelArtifactService.html\" data-type=\"entity-link\" >ModelArtifactService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/OrganizationService.html\" data-type=\"entity-link\" >OrganizationService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ServiceStoryEdgeService.html\" data-type=\"entity-link\" >ServiceStoryEdgeService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ServiceStoryService.html\" data-type=\"entity-link\" >ServiceStoryService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/SoftwaresystemService.html\" data-type=\"entity-link\" >SoftwaresystemService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/TeamService.html\" data-type=\"entity-link\" >TeamService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/DialogFeature.html\" data-type=\"entity-link\" >DialogFeature</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/DialogModelArtifact.html\" data-type=\"entity-link\" >DialogModelArtifact</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/DialogModelArtifact-1.html\" data-type=\"entity-link\" >DialogModelArtifact</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Member.html\" data-type=\"entity-link\" >Member</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Microservice.html\" data-type=\"entity-link\" >Microservice</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ModelArtifact.html\" data-type=\"entity-link\" >ModelArtifact</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Organization.html\" data-type=\"entity-link\" >Organization</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ServiceStory.html\" data-type=\"entity-link\" >ServiceStory</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ServiceStoryEdge.html\" data-type=\"entity-link\" >ServiceStoryEdge</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/SimpleEdge.html\" data-type=\"entity-link\" >SimpleEdge</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Softwaresystem.html\" data-type=\"entity-link\" >Softwaresystem</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Team.html\" data-type=\"entity-link\" >Team</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/enumerations.html\" data-type=\"entity-link\">Enums</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <a data-type=\"chapter-link\" href=\"routes.html\"><span class=\"icon ion-ios-git-branch\"></span>Routes</a>\n                        </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));