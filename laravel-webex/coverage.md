---
title: Laravel Webex implemented API reference
description: Facade accessors and implemented operations in Laravel Webex 2.0.0.
packageVersion: '2.0.0'
sourceCommit: c4aec48c1c416676cc411936fe7e905398f66b8c
---

# Implemented API reference

[Back to Laravel Webex](/laravel-webex/). The tables below enumerate public operations declared by the API classes returned by the released client's accessors. They describe package implementation, not your token's scopes or the full Webex service. Method names and capitalization follow the source, including legacy spelling.

Call an accessor through `Offlineagency\LaravelWebex\LaravelWebexFacade`, for example `LaravelWebex::messages()->detail($messageId)`. A class existing under `src/Api` is not automatically a facade method: it must have a registered accessor in [LaravelWebex.php](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/LaravelWebex.php). This release registers every concrete API class shown below. Links lead to the exact released signatures and allowed optional keys.

## Meetings

| Facade accessor | Implemented operations |
| --- | --- |
| [`meeting()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/Meeting.php) | `create`, `detail`, `list`, `listSeries`, `update`, `destroy`, `join`, `listTemplates`, `detailTemplate`, `detailControlStatus`, `updateControlStatus`, `listSessionTypes`, `detailSessionType`, `detailRegistrationForm`, `updateRegistrationForm`, `destroyRegistrationForm`, `register`, `batchRegister`, `detailInformationForRegistrant`, `listRegistrants`, `queryRegistrants`, `batchUpdateRegistrantsStatus`, `destroyRegistrant`, `updateSimultaneousInterpretation`, `createInterpreter`, `detailInterpreter`, `listInterpreters`, `updateInterpreter`, `destroyInterpreter`, `listBreakoutSessions`, `updateBreakoutSessions`, `destroyBreakoutSessions`, `detailSurvey`, `listSurveyResults`, `detailSurveyLinks`, `createInvitationSources`, `listInvitationSources`, `listTrackingCodes`, `reassignToNewHost` |
| [`meeting_invitees()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/MeetingInvitee.php) | `list`, `detail`, `create`, `bulk_create`, `update`, `destroy` |
| [`meeting_participants()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/MeetingParticipant.php) | `list`, `queryWIthEmail`, `detail`, `update`, `admit` |
| [`meeting_chats()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/MeetingChats.php) | `listChats`, `destroyChats` |
| [`meeting_closed_captions()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/MeetingClosedCaptions.php) | `listClosedCaptions`, `listClosedCaptionSnippets`, `downloadClosedCaptionSnippets` |
| [`meeting_messages()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/MeetingMessages.php) | `destroyMessage` |
| [`meeting_polls()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/MeetingPolls.php) | `listPolls`, `detailPollResults`, `listRespondentsQuestion` |
| [`meeting_preferences()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/MeetingPreferences.php) | `detailPreference`, `detailPersonalRoomOptions`, `updatePersonalRoomOptions`, `detailAudioOptions`, `detailVideoOptions`, `updateVideoOptions`, `detailSchedulingOptions`, `updateSchedulingOptions`, `insertDelegateEmails`, `deleteDelegateEmails`, `detailSiteList`, `updateDefaultSite`, `batchRefreshPersonalMeetingRoomID` |
| [`meeting_q_and_a()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/MeetingQAndA.php) | `listQAndA`, `listAnswersOfAQuestion` |
| [`meeting_qualities()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/MeetingQualities.php) | `detailQualities` |
| [`meeting_transcripts()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/MeetingTranscripts.php) | `listTranscripts`, `listTranscriptsForComplianceOfficer`, `downloadTranscript`, `listSnippetsOfTranscript`, `detailTranscriptSnippet`, `updateTranscriptSnippet`, `destroyTranscript` |
| [`meetings_summary_report()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/MeetingsSummaryReport.php) | `listUsageReports`, `listAttendeeReports` |
| [`people()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/People.php) | `listPeople`, `createPerson`, `detailPerson`, `updatePerson`, `destroyPerson`, `detailOwn` |
| [`recording_report()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/RecordingReport.php) | `listRecordingAuditReportSummaries`, `detailRecordAuditReport`, `listArchiveSummaries`, `detailArchive` |
| [`recordings()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/Recordings.php) | `listRecordings`, `listRecordingsForAnAdminOrComplianceOfficer`, `detailRecording`, `destroyRecording`, `moveRecordingsIntoRecycleBin`, `restoreRecordingsFromRecycleBin`, `purgeRecordingsFromRecycleBin` |
| [`session_types()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/SessionTypes.php) | `listSiteSessionTypes`, `listUserSessionType`, `update` |
| [`tracking_codes()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/TrackingCodes.php) | `listTrackingCodes`, `detailTrackingCode`, `createTrackingCode`, `updateTrackingCode`, `destroyTrackingCode`, `detailUserTrackingCodes`, `updateUserTrackingCodes` |
| [`video_mesh()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/VideoMesh.php) | `listClusterAvailability`, `detailClusterAvailability`, `listNodeAvailability`, `detailNodeAvailability`, `listMediaHealthMonitoringToolResults`, `listMediaHealthMonitoringToolResultsV2`, `detailMediaHealthMonitoringToolClusterResults`, `detailMediaHealthMonitoringToolClusterResultsV2`, `detailMediaHealthMonitoringToolNodeResults`, `detailMediaHealthMonitoringToolNodeResultsV2`, `listOverflowToCloudDetails`, `listClusterRedirectDetails`, `detailClusterRedirectDetails`, `listClustersUtilization`, `detailClusterUtilizationDetails`, `listReachabilityTestResults`, `listReachabilityTestResultsV2`, `detailReachabilityTestResultsForCluster`, `detailReachabilityTestResultsForClusterV2`, `detailReachabilityTestResultsForNode`, `detailReachabilityTestResultsForNodeV2`, `listClusterDetails`, `detailCluster`, `triggerOnDemandTestForCluster`, `triggerOnDemandTestForNode`, `detailTriggeredTestStatus`, `detailTriggeredTestResults`, `listNetworkTestResults`, `detailNetworkTestResultsForCluster`, `detailNetworkTestResultsForNode`, `listClusterClientTypeDistributionDetails`, `detailClusterClientTypeDistributionDetails`, `listEventThresholdConfiguration`, `detailEventThresholdConfiguration`, `updateEventThresholdConfiguration`, `resetEventThresholdConfiguration` |
| [`webhooks()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Meetings/Webhooks.php) | `listWebhooks`, `createWebhook`, `detailWebhook`, `updateWebhook`, `updateTrackingCode`, `destroyWebhook` |

## Messaging

| Facade accessor | Implemented operations |
| --- | --- |
| [`messages()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Messages/Messages.php) | `list`, `listWithPagination`, `cursor`, `create`, `detail`, `edit`, `destroy` |
| [`rooms()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Messages/Rooms.php) | `list`, `listWithPagination`, `cursor`, `create`, `detail`, `update`, `destroy`, `meetingDetails` |
| [`teams()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Messages/Teams.php) | `list`, `create`, `detail`, `update`, `destroy` |
| [`memberships()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Messages/Memberships.php) | `list`, `create`, `detail`, `update`, `destroy` |
| [`attachment_actions()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Messages/AttachmentActions.php) | `create`, `detail` |
| [`events()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Messages/Events.php) | `list` |
| [`room_tabs()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Messages/RoomTabs.php) | `list`, `create`, `detail`, `update`, `destroy` |
| [`team_memberships()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Messages/TeamMemberships.php) | `list`, `create`, `detail`, `update`, `destroy` |

## Admin

| Facade accessor | Implemented operations |
| --- | --- |
| [`admin_audit_events()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/AdminAuditEvents.php) | `list` |
| [`admin_licenses()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/Licenses.php) | `list`, `detail` |
| [`admin_locations()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/Locations.php) | `list`, `detail`, `create`, `update`, `destroy` |
| [`admin_organizations()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/Organizations.php) | `list`, `detail`, `destroy` |
| [`admin_report_templates()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/ReportTemplates.php) | `list` |
| [`admin_reports()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/Reports.php) | `list`, `detail`, `create` |
| [`admin_resource_groups()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/ResourceGroups.php) | `list`, `detail` |
| [`admin_resource_group_memberships()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/ResourceGroupMemberships.php) | `list`, `detail` |
| [`admin_roles()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/Roles.php) | `list`, `detail` |
| [`admin_space_classifications()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/SpaceClassifications.php) | `list` |
| [`admin_workspace_locations()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/WorkspaceLocations.php) | `list`, `detail`, `create`, `update`, `destroy` |
| [`admin_workspace_metrics()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/WorkspaceMetrics.php) | `list` |
| [`admin_workspaces()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/Workspaces.php) | `list`, `detail`, `create`, `update`, `destroy` |
| [`admin_hybrid_clusters()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/HybridClusters.php) | `list`, `detail` |
| [`admin_hybrid_connectors()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Admin/HybridConnectors.php) | `list`, `detail` |

## Calling

| Facade accessor | Implemented operations |
| --- | --- |
| [`call_controls()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Calling/CallControls.php) | `dial`, `answer`, `reject`, `hangup`, `hold`, `resume`, `mute`, `unmute`, `divert`, `transfer`, `park`, `retrieve`, `startRecording`, `stopRecording`, `pauseRecording`, `resumeRecording`, `transmitDtmf`, `push`, `pickup`, `bargeIn`, `list`, `detail`, `history` |
| [`broadworks_enterprises()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Calling/BroadWorksEnterprises.php) | `list` |
| [`broadworks_subscribers()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Calling/BroadWorksSubscribers.php) | `list`, `detail` |
| [`voice_messaging()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Calling/VoiceMessaging.php) | `list` |

## Devices

| Facade accessor | Implemented operations |
| --- | --- |
| [`device_configurations()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Devices/DeviceConfigurations.php) | `list`, `update` |
| [`devices()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Devices/Devices.php) | `list`, `detail`, `createActivationCode`, `destroy` |
| [`device_workspaces()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Devices/Workspaces.php) | `list`, `detail`, `create`, `update`, `destroy` |
| [`device_workspace_locations()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Devices/WorkspaceLocations.php) | `list`, `detail`, `create`, `update`, `destroy` |
| [`device_workspace_metrics()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Devices/WorkspaceMetrics.php) | `list` |
| [`xapi()`](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/src/Api/Devices/Xapi.php) | `command`, `status` |

## Gaps and removed operations

`meeting_messages()` implements only `destroyMessage()`. There is no dedicated list/detail accessor for meeting messages. The released coverage notes direct callers to `events()->list(['resource' => 'meetingMessages'])`; required scopes and event retention still apply.

Historical Analytics is not registered in 2.0.0. The release also removes unsupported create/update/delete operations from hybrid clusters/connectors, resource groups and space classifications, among other endpoint corrections. See [UPGRADE.md](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/UPGRADE.md) before migrating those calls. The [released coverage notes](https://github.com/offline-agency/laravel-webex/blob/c4aec48c1c416676cc411936fe7e905398f66b8c/WEBEX_ENDPOINT_COVERAGE.md) provide the maintainers' overview; the linked classes are the source of method signatures.
