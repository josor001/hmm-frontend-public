'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">HMM documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"' : 'data-bs-target="#xs-components-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"' :
                                            'id="xs-components-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"' }>
                                            <li class="link">
                                                <a href="components/AddFeatureDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddFeatureDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddMemberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddMemberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddMicroserviceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddMicroserviceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddModelArtifactDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddModelArtifactDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddStoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddStoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddTeamComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddTeamComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteSystemDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteSystemDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditMemberComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditMemberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditMicroserviceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditMicroserviceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditStoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditStoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditTeamComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditTeamComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MembersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MembersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MicroservicesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MicroservicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModelArtifactsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModelArtifactsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewSystemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewSystemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectMemberDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectMemberDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectMicroserviceDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectMicroserviceDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServiceStoriesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceStoriesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SystemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SystemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeamsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewArtifactDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewArtifactDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewMicroserviceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewMicroserviceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetMembersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WidgetMembersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetMicroservicesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WidgetMicroservicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetStoriesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WidgetStoriesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetSystemOverviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WidgetSystemOverviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WidgetTeamsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WidgetTeamsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"' : 'data-bs-target="#xs-pipes-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"' :
                                            'id="xs-pipes-links-module-AppModule-21449f772ac590ddbcc290370a8c0bb3c6adebf6c9a0db0422e26dc192d4af45609900782156578a2d12bb745457a49efdf3bdc7d250b62741e91cba63597f12"' }>
                                            <li class="link">
                                                <a href="pipes/TruncatePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TruncatePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CompleteTeam.html" data-type="entity-link" >CompleteTeam</a>
                            </li>
                            <li class="link">
                                <a href="classes/Utils.html" data-type="entity-link" >Utils</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/MemberService.html" data-type="entity-link" >MemberService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MicroserviceService.html" data-type="entity-link" >MicroserviceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModelArtifactService.html" data-type="entity-link" >ModelArtifactService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganizationService.html" data-type="entity-link" >OrganizationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServiceStoryEdgeService.html" data-type="entity-link" >ServiceStoryEdgeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServiceStoryService.html" data-type="entity-link" >ServiceStoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SoftwaresystemService.html" data-type="entity-link" >SoftwaresystemService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamService.html" data-type="entity-link" >TeamService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DialogFeature.html" data-type="entity-link" >DialogFeature</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogModelArtifact.html" data-type="entity-link" >DialogModelArtifact</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogModelArtifact-1.html" data-type="entity-link" >DialogModelArtifact</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Member.html" data-type="entity-link" >Member</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Microservice.html" data-type="entity-link" >Microservice</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelArtifact.html" data-type="entity-link" >ModelArtifact</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Organization.html" data-type="entity-link" >Organization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceStory.html" data-type="entity-link" >ServiceStory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceStoryEdge.html" data-type="entity-link" >ServiceStoryEdge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SimpleEdge.html" data-type="entity-link" >SimpleEdge</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Softwaresystem.html" data-type="entity-link" >Softwaresystem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Team.html" data-type="entity-link" >Team</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});