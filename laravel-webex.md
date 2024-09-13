---
meta: 
  - name: description
    content: A simple Laravel integration with Webex.
gitName: laravel-webex
---

# laravel-webex
A simple Laravel integration with Webex.

[![Github](./assets/icon/github.svg "Github Icon")](https://github.com/offline-agency/laravel-webex)
[![Latest Stable Version](https://poser.pugx.org/offline-agency/laravel-webex/v/stable)](https://packagist.org/packages/offline-agency/laravel-webex)
[![Total Downloads](https://img.shields.io/packagist/dt/offline-agency/laravel-webex.svg?style=flat-square)](https://packagist.org/packages/offline-agency/laravel-webex)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![run-tests](https://github.com/offline-agency/laravel-webex/actions/workflows/main.yml/badge.svg)](https://github.com/offline-agency/laravel-webex/actions/workflows/main.yml)
[![StyleCI](https://github.styleci.io/repos/167236902/shield)](https://styleci.io/repos/167236902)
[![codecov](https://codecov.io/gh/offline-agency/laravel-webex/branch/master/graph/badge.svg?token=0BHADJQYAW)](https://codecov.io/gh/offline-agency/laravel-webex)

## Installation

Install the package through [Composer](http://getcomposer.org/).

Run the Composer require command from the Terminal:

```bash
composer require offline-agency/laravel-webex
```[images](assets%2Fimages)

You should publish config file with:

```bash
php artisan vendor:publish --tag="webex-config"
```
## Usage

Each callback accept a number of parameters equals to the sum of the required parameters +1 that is $additional_data
that accept all optional parameters.

Package provide two events to intercept the start and the end of the authentication flow.

## Examples

### Meetings

``` php
// all 
$laravel_webex = new LaravelWebex($bearer);
$meetings_list = $laravel_webex->meeting()->list();

// all filtered by state
$laravel_webex = new LaravelWebex($bearer);
$meetings_list = $laravel_webex->meeting()->list([
    'state' => $state
]);

// detail
$laravel_webex = new LaravelWebex($bearer);
$meeting_detail = $laravel_webex->meeting()->detail($meeting_id);

// detail filtered by current 
$laravel_webex = new LaravelWebex($bearer);
$meeting_detail = $laravel_webex->meeting()->detail($meeting_id, [
    'current' => $current
]);

// create
$laravel_webex = new LaravelWebex($bearer);
$new_meeting = $laravel_webex->meeting()->create($title, $start, $end, [
    'agenda' => $agenda,
    'enabledAutoRecordMeeting' => $enabledAutoRecordMeeting
]);

// update
$laravel_webex = new LaravelWebex($bearer);
$updated_meeting = $laravel_webex->meeting()->update($id, $title, $pasword, $start, $end, [
    'agenda' => $agenda,
    'enabledAutoRecordMeeting' => $enabledAutoRecordMeeting
]);

// delete 
$laravel_webex = new LaravelWebex($bearer);
$delete_response = $laravel_webex->meeting()->destroy('fake_id');
```
### Meetings participants

``` php 
$laravel_webex = new LaravelWebex($bearer);
$meeting_participants_list = $laravel_webex->meeting_participants()->list($meeting_id);
```
## Api coverage

### Admin

#### Admin Audit Events

| Done | Endpoint                           | Type                      | Response |
|---|------------------------------------|--------------------------|----------|
| ❌ | List Admin Audit Events            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | List Admin Audit Events Categories | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Authorizations

| Done | Endpoint                                   | Type                    | Response |
|---|--------------------------------------------|-------------------------|----------|
| ❌ | List authorizations for a user             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Delete authorization                       | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Delete authorization of org and client ID  | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
#### Events

| Done | Endpoint          | Type                      | Response |
|---|-------------------|--------------------------|----------|
| ❌ | List Events       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Event Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Groups

| Done | Endpoint               | Type                 | Response |
|---|------------------------|---------------------------|----------|
| ❌ | Create a Group         | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Update a Group         | [![PATCH method](https://img.shields.io/static/v1.svg?label=&message=PATCH&color=blue)]()  | -        |
| ❌ | Get Group Details      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List and Search Groups | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Groups Members     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Delete a Group         | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Historical Analytics

| Done | Endpoint                                | Type                      | Response |
|---|-----------------------------------------|--------------------------|----------|
| ❌ | Historical Data related to Messaging    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Historical Data related to Room Devices | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Historical Data related to Meetings     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Hybrid Clusters

| Done | Endpoint                   | Type                      | Response |
|---|----------------------------|--------------------------|----------|
| ❌ | List Hybrid Clusters       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Hybrid Cluster Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Hybrid Connectors

| Done | Endpoint                     | Type                      | Response |
|---|------------------------------|--------------------------|----------|
| ❌ | List Hybrid Connectors       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Hybrid Connector Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Licenses

| Done | Endpoint                  | Type                  | Response |
|---|---------------------------|-----------------------|----------|
| ❌ | List Licenses             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get License Details       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Assign Licenses to Users  | [![PATCH method](https://img.shields.io/static/v1.svg?label=&message=PATCH&color=blue)]() | -        |

#### Meeting Qualities

| Done | Endpoint                     | Type                      | Response |
|---|------------------------------|--------------------------|----------|
| ❌ | Get Meeting Qualities     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Organization Contacts

| Done | Endpoint                       | Type                     | Response |
|---|--------------------------------|--------------------------|----------|
| ❌ | Create a Contact               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get a Contact                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Contact               | [![PATCH method](https://img.shields.io/static/v1.svg?label=&message=PATCH&color=blue)]() | -        |
| ❌ | Delete a Contact               | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | List Contacts                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Bulk Create or Update Contacts | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Bulk Delete Contacts           | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |

#### Organizations

| Done | Endpoint                 | Type                      | Response |
|---|--------------------------|--------------------------|----------|
| ❌ | List Organizations       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Organization Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Delete Organization      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Partner Management

| Done | Endpoint                                               | Type                | Response |
|---|--------------------------------------------------------|---------------------|----------|
| ❌ | Get all customers managed by a partner admin           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get all partner admins assigned to a customer          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Assign partner admin to a customer                     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Unassign partner admin from a customer                 | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Revoke all partner admin roles for a given person ID   | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |


#### Partner Tags

| Done | Endpoint                                                            | Type                    | Response |
|---|---------------------------------------------------------------------|------------------------ |----------|
| ❌ | Retrieve all customer tags                                          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create or Replace existing customer tags with the provided ones     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get customer organization's tags                                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Fetch all customers for a given set of tags                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create or Replace existing subscription tags with the provided ones | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Subscription List on a given tag name or a set of tags              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Fetch a Subscription                                                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### People

| Done | Endpoint           | Type                      | Response |
|---|--------------------|--------------------------|----------|
| ❌ | List People        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Person    | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Person Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Person    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Person    | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Get My Own Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Recording Report

| Done | Endpoint                                 | Type                      | Response |
|---|------------------------------------------|--------------------------|----------|
| ❌ | List of Recording Audit Report Summaries | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Recording Audit Report Details       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | List Meeting Archive Summaries           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Meeting Archive Details              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Recordings

| Done | Endpoint                                           | Type                      | Response |
|---|----------------------------------------------------|--------------------------|----------|
| ❌ | List Recordings                                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | List Recordings For an Admin or Compliance Officer | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Recording Details                              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Delete a Recording                                 | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Move Recordings into the Recycle Bin               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Restore Recordings from Recycle Bin                | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Purge Recordings from Recycle Bin                  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |

#### Report Templates

| Done | Endpoint              | Type          | Response |
|---|-----------------------|---------------|----------|
| ❌ | List Report Templates | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Reports

| Done | Endpoint             | Type                  | Response |
|---|----------------------|------------------------|----------|
| ❌ | List Reports         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Report      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Report Details   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Delete a Report      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Resource Group Memberships

| Done | Endpoint                              | Type                      | Response |
|---|---------------------------------------|--------------------------|----------|
| ❌ | List Resource Group Memberships       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Resource Group Membership Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Resource Group Membership    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |

#### Resource Group

| Done | Endpoint                     | Type                      | Response |
|---|------------------------------|--------------------------|----------|
| ❌ | List Resource Groups         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Resource Group Details   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Roles

| Done | Endpoint          | Type                      | Response |
|---|-------------------|--------------------------|----------|
| ❌ | List Roles        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Role Details  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Security Audit Events

| Done | Endpoint                   | Type                      | Response |
|---|----------------------------|--------------------------|----------|
| ❌ | List Security Audit Events | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Session Types

| Done | Endpoint                   | Type                      | Response |
|---|----------------------------|--------------------------|----------|
| ❌ | List Site Session Types    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | List User Session Type     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update User Session Types  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |

#### Space Classifications

| Done | Endpoint                              | Type                      | Response |
|---|---------------------------------------|--------------------------|----------|
| ❌ | List classifications       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Tracking Codes

| Done | Endpoint                     | Type                   | Response |
|---|------------------------------|------------------------|----------|
| ❌ | List Tracking Codes          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get a Tracking Code          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Tracking Code       | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Update a Tracking Code       | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Tracking Code       | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Get User Tracking Codes      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update User Tracking Codes   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |


#### Workspace Locations

| Done | Endpoint                               | Type                    | Response |
|---|----------------------------------------|-------------------------|----------|
| ❌ | List Workspace Locations               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Workspace Location            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get a Workspace Location Details       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Workspace Location            | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Workspace Location            | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | List Workspace Location Floors         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Workspace Location Floor      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get a Workspace Location Floor Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Workspace Location Floor      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Workspace Location Floor      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Workspace Metrics

| Done | Endpoint                    | Type                  | Response |
|---|-----------------------------|-------------------------|----------|
| ❌ | Workspace Metrics           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Workspace Duration Metrics  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

### Webex Calling Beta

#### Beta Features: Call Recording with Compliance Announcement Feature Phase 3

| Done | Endpoint                                                         | Type                 | Response |
|---|------------------------------------------------------------------|----------------------|----------|
| ❌ | Get Details for the organization compliance announcement setting | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update the organization compliance announcement                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Get Details for the location compliance announcement setting     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update the location compliance announcement                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |


### Webex Calling

#### Call Controls

| Done | Endpoint          | Type                  | Response |
|---|-------------------|--------------------------|----------|
| ❌ | Dial              | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Answer            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Reject            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Hangup            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Hold              | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Resume            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Divert            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Transfer          | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Park              | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Retrieve          | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Start Recording   | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Stop Recording    | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Pause Recording   | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Resume Recording  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Transmit DTMF     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Push              | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Pickup            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Barge In          | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | List Calls        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Call Details  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | List Call History | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Call Routing

| Done | Endpoint                                                           | Type                   | Response |
|---|--------------------------------------------------------------------|--------------------------|----------|
| ❌ | Test Call Routing                                                  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Local Gateway Dial Plan Usage for a Trunk                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Locations Using the Local Gateway as PSTN Connection Routing   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Route Groups Using the Local Gateway                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Local Gateway Usage Count                                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Modify Dial Patterns                                               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Validate a Dial Pattern                                            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Read the List of Dial Plans                                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Dial Plan                                                 | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get a Dial Plan                                                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Modify a Dial Plan                                                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Dial Plan                                                 | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Validate Local Gateway FQDN and Domain for a Trunk                 | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Read the List of Trunks                                            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Trunk                                                     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get a Trunk                                                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Modify a Trunk                                                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Trunk                                                     | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Read the List of Trunk Types                                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌ | Read the List of Routing Groups                                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌ | Create Route Group for a Organization                              | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Read a Route Group for a Organization                              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌ | Modify a Route Group for a Organization                            | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()  | -        |
| ❌ | Remove a Route Group from an Organization                          | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()  | -        |
| ❌ | Read the Usage of a Routing Group                                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌ | Read the Call to Extension Locations of a Routing Group            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌ | Read the Dial Plan Locations of a Routing Group                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌ | Read the PSTN Connection Locations of a Routing Group              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌ | Read the Route Lists of a Routing Group                            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌ | Read the List of Route Lists                                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌ | Create a Route List                                                | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Delete a Route List                                                | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()  | -        |
| ❌ | Get a Route List                                                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌ | Modify a Route List                                                | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()  | -        |
| ❌ | Modify Numbers for Route List                                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()  | -        |
| ❌ | Get Numbers assigned to a Route List                               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌ | Get Local Gateway Call to On-Premises Extension Usage for a Trunk  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |

#### Call Routing with Translation Patterns

| Done | Endpoint                                                    | Type                                                                                       | Response |
|---|-------------------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌ | Create a Translation Pattern for an Organization            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Retrieve the list of Translation Patterns                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Retrieve a specific Translation Pattern for an Organization | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Modify a specific Translation Pattern for an Organization   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Delete a specific Translation Pattern                       | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Create a Translation Pattern for a Location                 | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Retrieve a specific Translation Pattern for a Location      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Modify a specific Translation Pattern for a Location        | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Delete a specific Translation Pattern for a Location        | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Calling Service Settings

| Done | Endpoint                                | Type                                                                                      | Response |
|---|-----------------------------------------|-------------------------------------------------------------------------------------------|----------|
| ❌ | Read the List of Announcement Languages | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Get Voicemail Settings                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Update Voicemail Settings               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |
| ❌ | Get Voicemail Rules                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Update Voicemail Rules                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |

#### Client Call Settings

| Done | Endpoint                                   | Type                                                                                    | Response |
|---|--------------------------------------------|-----------------------------------------------------------------------------------------|----------|
| ❌ | Get an Organization's MS Teams Settings    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌ | Update an Organization's MS Teams Setting  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()   | -        |

#### Converged Recordings

| Done | Endpoint                               | Type                                                                                         | Response |
|---|----------------------------------------|----------------------------------------------------------------------------------------------|----------|
| ❌ | List Recordings for Compliance officer | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Get Recording Details                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Delete a Recording                     | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()   | -        |
| ❌ | Get Recording metadata                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Reassign Recordings                    | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |

#### DECT Devices Settings

| Done | Endpoint                                                | Type                                                                                      | Response |
|---|---------------------------------------------------------|-------------------------------------------------------------------------------------------|----------|
| ❌ | Create a DECT Network                                   | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get the List of DECT Networks for an organization       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Get DECT Network Details                                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Update DECT Network                                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |
| ❌ | Delete DECT Network                                     | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Create Multiple Base Stations                           | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get a list of DECT Network Base Stations                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Get the details of a specific DECT Network Base Station | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Delete bulk DECT Network Base Stations                  | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Delete a specific DECT Network Base Station             | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Add a Handset to a DECT Network                         | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get List of Handsets for a DECT Network ID              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Get Specific DECT Network Handset Details               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Update DECT Network Handset                             | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |
| ❌ | Delete specific DECT Network Handset Details            | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Delete multiple handsets                                | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | GET List of DECT networks associated with a Person      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | GET List of DECT networks associated with a workspace   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Search Available Members                                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |


#### Device Call Settings

| Done | Endpoint                                                   | Type                 | Response |
|---|------------------------------------------------------------|---------------------------|----------|
| ❌ | Get Device Members                                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update Members on the device                               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Search Members                                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Apply Changes for a specific device                        | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Device Settings                                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update device settings                                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Get Location Device Settings                               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Webex Calling Device Details                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update Third Party Device                                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Get Person Devices                                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Modify Hoteling Settings for a Person's Primary Devices    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Get Workspace Devices                                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Modify Workspace Devices                                   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Read the List of Supported Devices                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Read the device override settings for a organization       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Line Key Template                                 | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Read the list of Line Key Templates                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get details of a Line Key Template                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Modify a Line Key Template                                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Line Key Template                                 | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Preview Apply Line Key Template                            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Apply a Line key Template                                  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get List of Apply Line Key Template jobs                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get the job status of an Apply Line Key Template job       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get job errors for an Apply Line Key Template job          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Read the DECT device type list - Deprecated                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Read the DECT device type list                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Validate a list of MAC address                             | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Change Device Settings Across Organization Or Location Job | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | List Change Device Settings Jobs                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Change Device Settings Job Status                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | List Change Device Settings Job Errors                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Device Layout by Device ID                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Modify Device Layout by Device ID                          | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Rebuild Phones Configuration                               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | List Rebuild Phones Jobs                                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get the Job Status of a Rebuild Phones Job                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Job Errors for a Rebuild Phones Job                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Device Settings for a Person                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update Device Settings for a Person                        | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Get Device Settings for a Workspace                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update Device Settings for a Workspace                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Read the List of Background Images                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Upload a Device Background Image                           | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Delete Device Background Images                            | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Get User Devices Count                                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Devices

| Done | Endpoint                        | Type                                                                                        | Response |
|------|---------------------------------|---------------------------------------------------------------------------------------------|---------|
| ❌    | List Devices                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -       |
| ❌    | Get Device Details              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -       |
| ❌    | Delete a Device                 | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()  | -       |
| ❌    | Modify Device Tags              | [![PATCH method](https://img.shields.io/static/v1.svg?label=&message=PATCH&color=blue)]()   |  -      |
| ❌    | Create a Device Activation Code | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()   | -       |
| ❌    | Create a Device by MAC Address  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()   | -       |


#### Emergency Services Settings

| Done | Endpoint                                                            | Type                                                                                      | Response |
|-----|---------------------------------------------------------------------|-------------------------------------------------------------------------------------------|----------|
| ❌   | Update RedSky Service Settings                                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |
| ❌   | Create an Account and Admin in RedSky                               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌   | Retrieve RedSky Account Details for an Organization                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌   | Update the Organization RedSky Account's Compliance Status          | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |
| ❌   | Get the Organization Compliance Status and the Location Status List | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌   | Get the Organization Compliance Status for a RedSky Account         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌   | Login to a RedSky Admin Account                                     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌   | Get a Location's RedSky Emergency Calling Parameters                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌   | Get a Location's RedSky Compliance Status                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌   | Update a Location's RedSky Compliance Status                        | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |
| ❌   | Create a RedSky Building Address and Alert Email for a Location     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌   | Update a RedSky Building Address for a Location                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |
| ❌   | Get an Organization Emergency Call Notification                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌   | Update an Organization Emergency Call Notification                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |
| ❌   | Get a Location Emergency Call Notification                          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌   | Update a Location Emergency Call Notification                       | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |
| ❌   | Get a Person's Emergency Callback Number                            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌   | Update a Person's Emergency Callback Number                         | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |
| ❌   | Retrieve A Person's Emergency Callback Number Dependencies          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌   | Get a Workspace Emergency Callback Number                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌   | Update a Workspace Emergency Callback Number                        | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |
| ❌   | Retrieve Workspace Emergency Callback Number Dependencies           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌   | Get Dependencies for a Virtual Line Emergency Callback Number       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌   | Get the Virtual Line's Emergency Callback settings                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌   | Update a Virtual Line's Emergency Callback settings                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |

#### Features: Announcement Repository

| Done | Endpoint                                                                  | Type                                                                                    | Response |
|-----|---------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|----------|
| ❌   | Fetch list of announcement greetings on location and organization level   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌   | Upload a binary announcement greeting at organization level               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌   | Fetch repository usage for announcements for an organization              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌   | Delete an announcement greeting of the organization                       | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Fetch details of a binary announcement greeting at the organization level | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌   | Modify a binary announcement greeting at organization level               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()  | -        |
| ❌   | Upload a binary announcement greeting at the location level               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌   | Fetch repository usage for announcements in a location                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌   | Delete an announcement greeting in a location                             | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Fetch details of a binary announcement greeting at location level         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()   | -        |
| ❌   | Modify a binary announcement greeting at location level                   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |

#### Features: Auto Attendant

| Done | Endpoint                                                      | Type                                                                                   | Response |
|-----|---------------------------------------------------------------|----------------------------------------------------------------------------------------|----------|
| ❌   | Read the List of Auto Attendants                              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌   | Get Details for an Auto Attendant                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌   | Create an Auto Attendant                                      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌   | Update an Auto Attendant                                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌   | Delete an Auto Attendant                                      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Get Call Forwarding Settings for an Auto Attendant            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌   | Update Call Forwarding Settings for an Auto Attendant         | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌   | Create a Selective Call Forwarding Rule for an Auto Attendant | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌   | Get Selective Call Forwarding Rule for an Auto Attendant      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌   | Update Selective Call Forwarding Rule for an Auto Attendant   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()   | -        |
| ❌   | Delete a Selective Call Forwarding Rule for an Auto Attendant | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Get Auto Attendant Primary Available Phone Numbers            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌   | Get Auto Attendant Alternate Available Phone Numbers          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌   | Get Auto Attendant Call Forward Available Phone Numbers       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |


#### Features: Call Park

| Done | Endpoint                                         | Type                                                                                       | Response |
|-----|--------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Read the List of Call Parks                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Create a Call Park                               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Delete a Call Park                               | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Get Details for a Call Park                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Call Park                               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get available agents from Call Parks             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get available recall hunt groups from Call Parks | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Call Park Settings                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update Call Park settings                        | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read the List of Call Park Extensions            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Details for a Call Park Extension            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Create a Call Park Extension                     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Delete a Call Park Extension                     | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Update a Call Park Extension                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |

#### Features: Call Pickup

| Done | Endpoint                               | Type                                                                                       | Response |
|-----|----------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Read the List of Call Pickups          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Create a Call Pickup                   | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Delete a Call Pickup                   | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Get Details for a Call Pickup          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Call Pickup                   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get available agents from Call Pickups | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |

#### Features: Call Queue

| Done | Endpoint                                                 | Type                                                                                       | Response |
|-----|----------------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Read the List of Call Queues                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Create a Call Queue                                      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Delete a Call Queue                                      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Get Details for a Call Queue                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Call Queue                                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read the List of Call Queue Announcement Files           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Delete a Call Queue Announcement File                    | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Get Call Forwarding Settings for a Call Queue            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update Call Forwarding Settings for a Call Queue         | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Create a Selective Call Forwarding Rule for a Call Queue | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Get Selective Call Forwarding Rule for a Call Queue      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Selective Call Forwarding Rule for a Call Queue | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Delete a Selective Call Forwarding Rule for a Call Queue | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Get Details for a Call Queue Holiday Service             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Call Queue Holiday Service                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get Details for a Call Queue Night Service               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Call Queue Night Service                        | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get Details for a Call Queue Forced Forward              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Call Queue Forced Forward service               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get Details for a Call Queue Stranded Calls              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Call Queue Stranded Calls service               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get Call Queue Primary Available Phone Numbers           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Call Queue Alternate Available Phone Numbers         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Call Queue Call Forward Available Phone Numbers      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Call Queue Available Agents                          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |

#### Features: Call Recording

| Done | Endpoint                                                         | Type                                                                                    | Response |
|-----|------------------------------------------------------------------|-----------------------------------------------------------------------------------------|----------|
| ❌   | Get Call Recording Settings                                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌   | Update Call Recording Settings                                   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()  | -        |
| ❌   | Get Call Recording Terms Of Service Settings                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌   | Update Call Recording Terms Of Service Settings                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()  | -        |
| ❌   | Get Details for the organization compliance announcement setting | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌   | Update the organization compliance announcement                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()  | -        |
| ❌   | Get Details for the location compliance announcement setting     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌   | Update the location compliance announcement                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()  | -        |

#### Features: Hunt Group

| Done | Endpoint                                                 | Type                                                                                       | Response |
|-----|----------------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Read the List of Hunt Groups                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Create a Hunt Group                                      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Delete a Hunt Group                                      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Get Details for a Hunt Group                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Hunt Group                                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get Call Forwarding Settings for a Hunt Group            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update Call Forwarding Settings for a Hunt Group         | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Create a Selective Call Forwarding Rule for a Hunt Group | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()      | -        |
| ❌   | Get Selective Call Forwarding Rule for a Hunt Group      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌   | Update a Selective Call Forwarding Rule for a Hunt Group | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()  | -        |
| ❌   | Delete a Selective Call Forwarding Rule for a Hunt Group | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()    | -        |
| ❌   | Get Hunt Group Primary Available Phone Numbers           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌   | Get Hunt Group Alternate Available Phone Numbers         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌   | Get Hunt Group Call Forward Available Phone Numbers      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |

#### Features: Paging Group

| Done | Endpoint                                          | Type                                                                                       | Response |
|-----|---------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Read the List of Paging Groups                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Create a new Paging Group                         | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Delete a Paging Group                             | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Get Details for a Paging Group                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Paging Group                             | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get Paging Group Primary Available Phone Numbers  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |

#### Features: Single Number Reach

| Done | Endpoint                                                 | Type                                                                                       | Response |
|-----|----------------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Get Single Number Reach Primary Available Phone Numbers  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |

#### Location Call Settings

| Done | Endpoint                                                       | Type                                                                                       | Response |
|-----|----------------------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | List Locations Webex Calling Details                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Enable a Location for Webex Calling                            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Get Location Webex Calling Details                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update Location Webex Calling Details                          | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get a List of Update Routing Prefix jobs                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get the job status of Update Routing Prefix job                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get job errors for update routing prefix job                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Change Announcement Language                                   | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Read the List of Dial Patterns                                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get a Location Emergency callback number                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Location Emergency callback number                    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Validate the List of Extensions                                | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Validate Extensions                                            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Update Music On Hold                                           | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get Music On Hold                                              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Private Network Connect                                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update Private Network Connect                                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read the List of Routing Choices                               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get the List of Phone Numbers Available for External Caller ID | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Available Phone Numbers for a Location with Given Criteria | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Webex Go Available Phone Numbers                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Location ECBN Available Phone Numbers                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Location Call Intercept Available Phone Numbers            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Create a Receptionist Contact Directory                        | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Read list of Receptionist Contact Directories                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get details for a Receptionist Contact Directory               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Delete a Receptionist Contact Directory                        | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Modify a Receptionist Contact Directory                        | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |

#### Location Call Settings: Call Handing

| Done | Endpoint                                                             | Type                                                                                       | Response |
|-----|----------------------------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Generate example password for Location                               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | Read the Internal Dialing configuration for a location               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌   | Modify the Internal Dialing configuration for a location             | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Get Location Intercept                                               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌   | Put Location Intercept                                               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Get Location Outgoing Permission                                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌   | Update Location Outgoing Permission                                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Get Outgoing Permission Auto Transfer Number                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌   | Put Outgoing Permission Auto Transfer Number                         | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Get Outgoing Permission Location Access Code                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌   | Create Outgoing Permission a new access code for a customer location | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | Delete Outgoing Permission Access Code Location                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |

#### Location Call Settings: Schedules

| Done | Endpoint                         | Type                                                                                       | Response |
|-----|----------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Read the List of Schedules       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Get Details for a Schedule       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Create a Schedule                | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | Update a Schedule                | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Delete a Schedule                | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()| -        |
| ❌   | Get Details for a Schedule Event | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Create a Schedule Event          | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | Update a Schedule Event          | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Delete a Schedule Event          | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()| -        |

#### Location Call Settings: Voicemail

| Done | Endpoint                                                | Type                                                                                       | Response |
|-----|---------------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Get Location Voicemail                                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update Location Voicemail                               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -                         |
| ❌   | Get VoicePortal                                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update VoicePortal                                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get VoicePortal Passcode Rule                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | List VoicemailGroup                                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Location Voicemail Group                            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Location Voicemail Group                         | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Create a new Voicemail Group for a Location             | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Delete a Voicemail Group for a Location                 | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Get Voicemail Group Fax Message Available Phone Numbers | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Voicemail Group Available Phone Numbers             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get VoicePortal Available Phone Numbers                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |

#### Locations

| Done | Endpoint                    | Type                                                                                       | Response |
|-----|-----------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | List Locations              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Location Details        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -                          |
| ❌   | Create a Location           | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Update a Location           | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | List Location Floors        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Create a Location Floor     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Get Location Floor Details  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Location Floor     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Delete a Location Floor     | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Numbers

| Done | Endpoint                                                   | Type                                                                                         | Response |
|-----|------------------------------------------------------------|----------------------------------------------------------------------------------------------|----------|
| ❌   | Add Phone Numbers to a location                            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌   | Activate Phone Numbers in a location                       | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()        | -        |
| ❌   | Remove phone numbers from a location                       | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()   | -        |
| ❌   | Validate phone numbers.                                    | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌   | Get Phone Numbers for an Organization with Given Criterias | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌   | List Manage Numbers Jobs                                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌   | Initiate Number Jobs                                       | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌   | Get Manage Numbers Job Status                              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌   | Pause the Manage Numbers Job                               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌   | Resume the Manage Numbers Job                              | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌   | List Manage Numbers Job errors                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |

#### PSTN

| Done | Endpoint                                        | Type                                                                                    | Response |
|-----|-------------------------------------------------|-----------------------------------------------------------------------------------------|----------|
| ❌   | Retrieve PSTN Connection Options for a Location | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌   | Setup PSTN Connection for a Location            | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()   | -        |
| ❌   | Retrieve PSTN Connection for a Location         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |

#### People

| Done | Endpoint            | Type                 | Response |
|---|---------------------|------------------------|----------|
| ❌ | List People         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Person     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Person Details  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Person     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Person     | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Get My Own Details  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Recording Report

| Done | Endpoint                                 | Type                      | Response |
|---|------------------------------------------|--------------------------|----------|
| ❌ | List of Recording Audit Report Summaries | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Recording Audit Report Details       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | List Meeting Archive Summaries           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Meeting Archive Details              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Reports

| Done | Endpoint             | Type                  | Response |
|---|----------------------|------------------------|----------|
| ❌ | List Reports         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Report      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Report Details   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Delete a Report      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Reports: Detailed Call History

| Done | Endpoint                   | Type                                                                                       | Response |
|-----|----------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Get Detailed Call History  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |

#### User Call Settings

| Done | Endpoint                                                  | Type                                                                                       | Response |
|-----|-----------------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Retrieve a person's Application Services Settings         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Modify a person's Application Services Settings           | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Read Barge In Settings for a Person                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Barge In Settings for a Person                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Read Forwarding Settings for a Person                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Call Forwarding Settings for a Person           | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Read Call Intercept Settings for a Person                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Call Intercept Settings for a Person            | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Configure Call Intercept Greeting for a Person            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | Read Call Recording Settings for a Person                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Call Recording Settings for a Person            | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Read Call Waiting Settings for a Person                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Call Waiting Settings for a Person              | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Read Caller ID Settings for a Person                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Caller ID Settings for a Person                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Read Person's Calling Behavior                            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure a person's Calling Behavior                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Read Do Not Disturb Settings for a Person                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Do Not Disturb Settings for a Person            | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Retrieve Executive Assistant Settings for a Person        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Modify Executive Assistant Settings for a Person          | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Read Hoteling Settings for a Person                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Hoteling Settings for a Person                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Retrieve a person's Monitoring Settings                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Modify a person's Monitoring Settings                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Validate or Initiate Move Users Job                       | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | List Move Users Jobs                                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Get Move Users Job Status                                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Pause the Move Users Job                                  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | Resume the Move Users Job                                 | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | List Move Users Job errors                                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Retrieve Music On Hold Settings for a Person              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Music On Hold Settings for a Person             | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Read Incoming Permission Settings for a Person            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Incoming Permission Settings for a Person       | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Retrieve a person's Outgoing Calling Permissions Settings | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Modify a person's Outgoing Calling Permissions Settings   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Get a List of Phone Numbers for a Person                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Assign or Unassign numbers to a person                    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Get Preferred Answer Endpoint                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Modify Preferred Answer Endpoint                          | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Get a person's Privacy Settings                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure a person's Privacy Settings                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Read Push-to-Talk Settings for a Person                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Push-to-Talk Settings for a Person              | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Read Receptionist Client Settings for a Person            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Receptionist Client Settings for a Person       | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | List of Schedules for a Person                            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Create Schedule for a Person                              | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | Get a Schedule Details                                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Update a Schedule                                         | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Delete a Schedule                                         | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()| -        |
| ❌   | Fetch Event for a person's Schedule                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Add a New Event for Person's Schedule                     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | Update an Event for a person's Schedule                   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Delete an Event for a person's Schedule                   | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()| -        |
| ❌   | Search Shared-Line Appearance Members                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Get Shared-Line Appearance Members                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Put Shared-Line Appearance Members                        | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Read Voicemail Settings for a Person                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Voicemail Settings for a Person                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Configure Busy Voicemail Greeting for a Person            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | Configure No Answer Voicemail Greeting for a Person       | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | Reset Voicemail PIN                                       | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | Modify a person's voicemail passcode                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Get Message Summary                                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | List Messages                                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Delete Message                                            | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()| -        |
| ❌   | Mark As Read                                              | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | Mark As Unread                                            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |
| ❌   | Retrieve Agent's List of Available Caller IDs             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Retrieve Agent's Caller ID Information                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Modify Agent's Caller ID Information                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Read Call Bridge Settings for a Person                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure Call Bridge Settings for a Person               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |
| ❌   | Get Person Secondary Available Phone Numbers              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Get Person Fax Message Available Phone Numbers            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Get Person Call Forward Available Phone Numbers           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Get Person Primary Available Phone Numbers                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Get Person ECBN Available Phone Numbers                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Get Person Call Intercept Available Phone Numbers         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Retrieve a Person's MS Teams Settings                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()| -        |
| ❌   | Configure a Person's MS Teams Setting                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()| -        |

#### Virtual Line Call Settings

| Done | Endpoint                                                        | Type                                                                                       | Response |
|-----|-----------------------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Read the List of Virtual Lines                                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Read Call Recording Settings for a Virtual Line                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Call Recording Settings for a Virtual Line            | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Create a Virtual Line                                           | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Delete a Virtual Line                                           | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Get Details for a Virtual Line                                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Virtual Line                                           | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get Phone Number assigned for a Virtual Line                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update Directory search for a Virtual Line                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get List of Devices assigned for a Virtual Line                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get List of DECT Networks Handsets for a Virtual Line           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Read Caller ID Settings for a Virtual Line                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Caller ID Settings for a Virtual Line                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read Call Waiting Settings for a Virtual Line                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Call Waiting Settings for a Virtual Line              | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read Call Forwarding Settings for a Virtual Line                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Call Forwarding Settings for a Virtual Line           | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read Incoming Permission Settings for a Virtual Line            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Incoming Permission Settings for a Virtual Line       | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve a virtual line's Outgoing Calling Permissions Settings | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify a virtual line's Outgoing Calling Permissions Settings   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read Call Intercept Settings for a Virtual Line                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Call Intercept Settings for a Virtual Line            | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Configure Call Intercept Greeting for a Virtual Line            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Retrieve Agent's List of Available Caller IDs                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Retrieve Agent's Caller ID Information                          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Agent's Caller ID Information                            | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read Voicemail Settings for a Virtual Line                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Voicemail Settings for a Virtual Line                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Configure Busy Voicemail Greeting for a Virtual Line            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Configure No Answer Voicemail Greeting for a Virtual Line       | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Reset Voicemail PIN for a Virtual Line                          | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Modify a virtual line's voicemail passcode                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Music On Hold Settings for a Virtual Line              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Music On Hold Settings for a Virtual Line             | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read Push-to-Talk Settings for a Virtual Line                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Push-to-Talk Settings for a Virtual Line              | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read Call Bridge Settings for a Virtual Line                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Call Bridge Settings for a Virtual Line               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read Barge In Settings for a Virtual Line                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Barge In Settings for a Virtual Line                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get a Virtual Line's Privacy Settings                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure a Virtual Line's Privacy Settings                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get Virtual Line Fax Message Available Phone Numbers            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Virtual Line Call Forward Available Phone Numbers           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Virtual Line Available Phone Numbers                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Virtual Line ECBN Available Phone Numbers                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Virtual Line Call Intercept Available Phone Numbers         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |

#### Workspace Call Settings

| Done | Endpoint                                                        | Type                                                                                       | Response |
|-----|-----------------------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Retrieve Call Forwarding Settings for a Workspace               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Call Forwarding Settings for a Workspace                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Call Waiting Settings for a Workspace                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Call Waiting Settings for a Workspace                    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read Caller ID Settings for a Workspace                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Caller ID Settings for a Workspace                    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Monitoring Settings for a Workspace                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Monitoring Settings for a Workspace                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Music On Hold Settings for a Workspace                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Music On Hold Settings for a Workspace                   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | List numbers associated with a specific workspace               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Retrieve Incoming Permission Settings for a Workspace           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Incoming Permission Settings for a Workspace             | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Outgoing Permission Settings for a Workspace           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Outgoing Permission Settings for a Workspace             | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Access Codes for a Workspace                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Access Codes for a Workspace                             | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Create Access Codes for a Workspace                             | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Read Call Intercept Settings for a Workspace                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Call Intercept Settings for a Workspace               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Transfer Numbers Settings for a Workspace              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Transfer Numbers Settings for a Workspace                | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get Workspace Available Phone Numbers                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Workspace ECBN Available Phone Numbers                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Workspace Call Forward Available Phone Numbers              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Workspace Call Intercept Available Phone Numbers            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Retrieve Anonymous Call Settings for a Workspace                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Anonymous Call Settings for a Workspace                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Barge In Call Settings for a Workspace                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Barge In Call Settings for a Workspace                   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve DoNotDisturb Settings for a Workspace                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify DoNotDisturb Settings for a Workspace                    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Call Bridge Warning Tone Settings for a Workspace      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Call Bridge Warning Tone Settings for a Workspace        | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read Push-to-Talk Settings for a Workspace                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Push-to-Talk Settings for a Workspace                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Privacy Settings for a Workspace                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Privacy Settings for a Workspace                         | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read Voicemail Settings for a Workspace                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Voicemail Settings for a Workspace                    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Modify Voicemail Passcode for a Workspace                       | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Sequential Ring Criteria for a Workspace               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Sequential Ring Criteria for a Workspace                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Read Call Policy Settings for a Workspace                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Call Policy Settings for a Workspace                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Configure Busy Voicemail Greeting for a Place                   | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Configure No Answer Voicemail Greeting for a Place              | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Delete Sequential Ring Criteria for a Workspace                 | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Create Sequential Ring Criteria for a Workspace                 | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Retrieve Sequential Ring Settings for a Workspace               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Sequential Ring Settings for a Workspace                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Simultaneous Ring Settings for a Workspace             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Simultaneous Ring Settings for a Workspace               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Simultaneous Ring Criteria for a Workspace             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Create Simultaneous Ring Criteria for a Workspace               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Modify Simultaneous Ring Criteria for a Workspace               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Delete Simultaneous Ring Criteria for a Workspace               | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Retrieve Selective Reject Settings for a Workspace              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Selective Reject Settings for a Workspace                | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Selective Reject Criteria for a Workspace              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Create Selective Reject Criteria for a Workspace                | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Modify Selective Reject Criteria for a Workspace                | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Assign or Unassign numbers associated with a specific workspace | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Delete Selective Reject Criteria for a Workspace                | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Retrieve Selective Accept Settings for a Workspace              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Selective Accept Settings for a Workspace                | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Selective Accept Criteria for a Workspace              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Create Selective Accept Criteria for a Workspace                | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Modify Selective Accept Criteria for a Workspace                | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Delete Selective Accept Criteria for a Workspace                | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Retrieve Priority Alert Settings for a Workspace                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Configure Priority Alert Settings for a Workspace               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Priority Alert Criteria for a Workspace                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Create Priority Alert Criteria for a Workspace                  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Modify Priority Alert Criteria for a Workspace                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Delete Priority Alert Criteria for a Workspace                  | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Retrieve Selective Forward Settings for a Workspace             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Modify Selective Forward Settings for a Workspace               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Retrieve Selective Forward Criteria for a Workspace             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Create Selective Forward Criteria for a Workspace               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Modify Selective Forward Criteria for a Workspace               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Delete Selective Forward Criteria for a Workspace               | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Get Workspace Fax Message Available Phone Numbers               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Workspace Secondary Available Phone Numbers                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |

#### Workspaces

| Done | Endpoint                    | Type                                                                                        | Response |
|-----|-----------------------------|---------------------------------------------------------------------------------------------|----------|
| ❌   | List Workspaces             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌   | Create a Workspace          | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()   | -        |
| ❌   | Get Workspace Details       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌   | Update a Workspace          | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()       | -        |
| ❌   | Delete a Workspace          | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()  | -        |
| ❌   | Get Workspace Capabilities  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |

### Webex for Broadworks

#### BroadWorks Billing Reports

| Done | Endpoint                            | Type                                                                                         | Response |
|-----|-------------------------------------|----------------------------------------------------------------------------------------------|----------|
| ❌   | List BroadWorks Billing Reports     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌   | Get a BroadWorks Billing Report     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌   | Create a BroadWorks Billing Report  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌   | Delete a BroadWorks Billing Report  | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()   | -        |

#### BroadWorks Enterprises

#### BroadWorks Enterprises

| Done | Endpoint                                          | Type                                                                                      | Response |
|---|---------------------------------------------------|-------------------------------------------------------------------------------------------|----------|
| ❌ | List BroadWorks Enterprises                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Update Directory Sync for a BroadWorks Enterprise | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()     | -        |
| ❌ | Trigger Directory Sync for an Enterprise          | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Directory Sync Status for an Enterprise       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Trigger Directory Sync for a User                 | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |

#### BroadWorks Subscribers

| Done | Endpoint                                       | Type                                                                                        | Response |
|---|------------------------------------------------|---------------------------------------------------------------------------------------------|----------|
| ❌ | List BroadWorks Subscribers                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | Provision a BroadWorks Subscriber              | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()   | -        |
| ❌ | Get a BroadWorks Subscriber                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | Update a BroadWorks Subscriber                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()       | -        |
| ❌ | Remove a BroadWorks Subscriber                 | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()  | -        |
| ❌ | Precheck a Broadworks Subscriber Provisioning  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()   | -        |

#### BroadWorks Workspaces

| Done | Endpoint                         | Type                                                                                         | Response |
|-----|----------------------------------|----------------------------------------------------------------------------------------------|----------|
| ❌   | Provision a BroadWorks Workspace | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌   | Update a Broadworks Workspace    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()        | -        |
| ❌   | Remove a BroadWorks Workspace    | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()   | -        |

### Webex for Wholesale

#### Wholesale Billing Reports

| Done | Endpoint                           | Type                                                                                        | Response |
|-----|------------------------------------|---------------------------------------------------------------------------------------------|----------|
| ❌   | List Wholesale Billing Reports     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌   | Get a Wholesale Billing Report     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌   | Create a Wholesale Billing Report  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()   | -        |
| ❌   | Delete a Wholesale Billing Report  | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()  | -        |

#### Wholesale Provisioning

| Done | Endpoint                                      | Type                                                                                       | Response |
|-----|-----------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | List Wholesale Customers                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Provision a Wholesale Customer                | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Get a Wholesale Customer                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Wholesale Customer                   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Remove a Wholesale Customer                   | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Precheck a Wholesale Customer Provisioning    | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | List Wholesale Sub-partners                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | List Wholesale Subscribers                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Provision a Wholesale Subscriber              | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()      | -        |
| ❌   | Get a Wholesale Subscriber                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update a Wholesale Subscriber                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Remove a Wholesale Subscriber                 | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌   | Precheck a Wholesale Subscriber Provisioning  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |

### Webex for UCM

#### UCM Profile

| Done | Endpoint                              | Type                                                                                       | Response |
|-----|---------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Read the List of UC Manager Profiles  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |

### Devices

#### Device Call Settings

| Done | Endpoint                                                   | Type                                                                                       | Response |
|---|------------------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌ | Get Device Members                                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Update Members on the device                               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Search Members                                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Apply Changes for a specific device                        | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Get Device Settings                                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Update device settings                                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Get Location Device Settings                               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Webex Calling Device Details                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Update Third Party Device                                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Get Person Devices                                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Modify Hoteling Settings for a Person's Primary Devices    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Get Workspace Devices                                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Modify Workspace Devices                                   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Read the List of Supported Devices                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Read the device override settings for a organization       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Create a Line Key Template                                 | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Read the list of Line Key Templates                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get details of a Line Key Template                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Modify a Line Key Template                                 | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Delete a Line Key Template                                 | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Preview Apply Line Key Template                            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Apply a Line key Template                                  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Get List of Apply Line Key Template jobs                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get the job status of an Apply Line Key Template job       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get job errors for an Apply Line Key Template job          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Read the DECT device type list - Deprecated                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Read the DECT device type list                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Validate a list of MAC address                             | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Change Device Settings Across Organization Or Location Job | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | List Change Device Settings Jobs                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Change Device Settings Job Status                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Change Device Settings Job Errors                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Device Layout by Device ID                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Modify Device Layout by Device ID                          | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Rebuild Phones Configuration                               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | List Rebuild Phones Jobs                                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get the Job Status of a Rebuild Phones Job                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Job Errors for a Rebuild Phones Job                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Device Settings for a Person                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Update Device Settings for a Person                        | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Get Device Settings for a Workspace                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Update Device Settings for a Workspace                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Read the List of Background Images                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Upload a Device Background Image                           | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Delete Device Background Images                            | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Get User Devices Count                                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |

#### Device Configurations

| Done | Endpoint                               | Type                                                                                       | Response |
|---|----------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌ | List Device Configurations for device  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | PATCH - Update Device Configurations   | [![PATCH method](https://img.shields.io/static/v1.svg?label=&message=PATCH&color=blue)]()  | -        |

#### Devices

| Done | Endpoint                        | Type                                                                                        | Response |
|------|---------------------------------|---------------------------------------------------------------------------------------------|---------|
| ❌    | List Devices                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -       |
| ❌    | Get Device Details              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -       |
| ❌    | Delete a Device                 | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()  | -       |
| ❌    | Modify Device Tags              | [![PATCH method](https://img.shields.io/static/v1.svg?label=&message=PATCH&color=blue)]()   |  -      |
| ❌    | Create a Device Activation Code | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()   | -       |
| ❌    | Create a Device by MAC Address  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()   | -       |

#### Workspace Locations

| Done | Endpoint                               | Type                                                                                        | Response |
|---|----------------------------------------|---------------------------------------------------------------------------------------------|----------|
| ❌ | List Workspace Locations               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | Create a Workspace Location            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()   | -        |
| ❌ | Get a Workspace Location Details       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | Update a Workspace Location            | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()       | -        |
| ❌ | Delete a Workspace Location            | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()  | -        |
| ❌ | List Workspace Location Floors         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | Create a Workspace Location Floor      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()   | -        |
| ❌ | Get a Workspace Location Floor Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | Update a Workspace Location Floor      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()       | -        |
| ❌ | Delete a Workspace Location Floor      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()  | -        |

#### Workspace Metrics

| Done | Endpoint                       | Type                 | Response |
|---|--------------------------------|------------------------|----------|
| ❌ | Workspace Metrics              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Workspace Duration Metrics     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Workspace Personalization

| Done | Endpoint                  | Type                                                                                      | Response |
|---|---------------------------|-------------------------------------------------------------------------------------------|----------|
| ❌ | Personalize a Workspace   | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Personalization Task  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |

#### Workspaces

| Done | Endpoint                   | Type                                                                                       | Response |
|---|----------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌ | List Workspaces            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Create a Workspace         | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Get Workspace Details      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Update a Workspace         | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Delete a Workspace         | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Get Workspace Capabilities | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |

#### xAPI

| Done | Endpoint              | Type                | Response |
|---|-----------------------|-----------------------|----------|
| ❌ | Query Status      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |
| ❌ | Execute Command    | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |

### Directory Services

#### Identity Organization

| Done | Endpoint               | Type                                                                                       | Response |
|---|------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌ | Get an organization    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Update an organization | [![PATCH method](https://img.shields.io/static/v1.svg?label=&message=PATCH&color=blue)]()  | -        |

### Meetings

#### Meeting Chats

| Done | Endpoint               | Type                                                                                       | Response |
|---|------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌ | List Meeting Chats    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Delete Meeting Chats | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Meeting Closed Captions

| Done | Endpoint                                  | Type                                                                                       | Response |
|---|-------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌ | List Meeting Closed Captions              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Meeting Closed Caption Snippets      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Download Meeting Closed Caption Snippets  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |

#### Meeting Invitees

| Done | Endpoint                 | Type                  | Response |
|--|--------------------------|--------------------------|----------|
| ✅ | List Meeting Invitees    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ✅ | Create a Meeting Invitee | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ✅ | Create Meeting Invitees  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ✅ | Get a Meeting Invitee    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ✅ | Update a Meeting Invitee | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ✅ | Delete a Meeting Invitee | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Meeting Messages

| Done | Endpoint                 | Type                  | Response |
|---|--------------------------|--------------------------|----------|
| ❌ | Delete a Meeting Message | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Meeting Participants

| Done | Endpoint                              | Type                  | Response |
|--|---------------------------------------|-------------------------|----------|
| ✅ |  List Meeting Participants            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Query Meeting Participants with Email | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ✅ | Get Meeting Participant Details       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Participant                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Admit Participants                    | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |

#### Meeting Polls

| Done | Endpoint                        | Type                  | Response |
|---|---------------------------------|-------------------------|----------|
| ❌ | List Meeting Polls              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Meeting PollResults         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | List Respondents of a Question  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Meeting Preferences

| Done | Endpoint                                | Type                                                                                       | Response |
|-----|-----------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | Get Meeting Preference Details          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Get Personal Meeting Room Options       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update Personal Meeting Room Options    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get Audio Options                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update Audio Options                    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get Video Options                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update Video Options                    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Get Scheduling Options                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update Scheduling Options               | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Insert Delegate Emails                  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Delete Delegate Emails                  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌   | Get Site List                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | Update Default Site                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌   | Batch Refresh Personal Meeting Room ID  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |

#### Meeting Q and A

| Done | Endpoint                    | Type                                                                                       | Response |
|-----|-----------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌   | List Meeting Q and A        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌   | List Answers of a Question  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |

#### Meeting Qualities

| Done | Endpoint                        | Type          | Response |
|---|---------------------------------|-----------------|----------|
| ❌ | Get Meeting Qualities  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()  | -        |

#### Meeting Transcripts

| Done | Endpoint                                        | Type                                                                                        | Response |
|---|-------------------------------------------------|---------------------------------------------------------------------------------------------|----------|
| ❌ | List Meeting Transcripts                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | List Meeting Transcripts For Compliance Officer | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | Download a meeting transcript                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | List Snippets of a Meeting Transcript           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | Get a Transcript Snippet                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | Update a Transcript Snippet                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()       | -        |
| ❌ | Delete a Transcript                             | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()  | -        |

#### Meetings

| Done | Endpoint                                          | Type                                                                                         | Response |
|--|---------------------------------------------------|----------------------------------------------------------------------------------------------|----------|
| ✅ | Create a Meeting                                  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ✅ | Get a Meeting                                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ✅ | List Meetings                                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | List Meetings of a Meeting Series                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Patch a Meeting                                   | [![PATCH method](https://img.shields.io/static/v1.svg?label=&message=PATCH&color=blue)]()    | -        |
| ✅ | Update a Meeting                                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()        | -        |
| ✅ | Delete a Meeting                                  | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()   | -        |
| ❌ | Join a Meeting                                    | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌ | List Meeting Templates                            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Get a Meeting Templates                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Get Meeting Control Status                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Update Meeting Control Status                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()        | -        |
| ❌ | List Meeting Session Types                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Get a Meeting Session Type                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Get registration form for a meeting               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Update Meeting Registration Form                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()        | -        |
| ❌ | Delete Meeting Registration Form                  | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()   | -        |
| ❌ | Register a Meeting Registrant                     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌ | Batch register Meeting Registrants                | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌ | Get Detailed Information for a Meeting Registrant | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | List Meeting Registrants                          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Query Meeting Registrants                         | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌ | Batch Update Meeting Registrants status           | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌ | Delete a Meeting Registran                        | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()   | -        |
| ❌ | Update Meeting Simultaneous interpretation        | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()        | -        |
| ❌ | Create a Meeting Interpreter                      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌ | Get a Meeting Interpreter                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | List Meeting Interpreters                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Update a Meeting Interpreter                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()        | -        |
| ❌ | Delete a Meeting Interpreter                      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()   | -        |
| ❌ | List Meeting Breakout Sessions                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Update Meeting Breakout Sessions                  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()        | -        |
| ❌ | Delete Meeting Breakout Sessions                  | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()   | -        |
| ❌ | Get a Meeting Survey                              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | List Meeting Survey Results                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Get Meeting Survey Links                          | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌ | Create Invitation Sources                         | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌ | List Invitation Sources                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | List Meeting Tracking Codes                       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Reassign Meetings to a New Host                   | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |

#### Meetings Summary Report

| Done | Endpoint                       | Type                                                                                      | Response |
|---|--------------------------------|-------------------------------------------------------------------------------------------|----------|
| ❌ | List Meeting Usage Reports     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | List Meeting Attendee Reports  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |

#### People

| Done | Endpoint             | Type                                                                                         | Response |
|---|----------------------|----------------------------------------------------------------------------------------------|----------|
| ❌ | List People          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Create a Person      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌ | Get Person Details   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Update a Person      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()        | -        |
| ❌ | Delete a Person      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()   | -        |
| ❌ | Get My Own Details   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |

#### Recording Report

| Done | Endpoint                                 | Type                 | Response |
|---|------------------------------------------|----------------------|----------|
| ❌ | List of Recording Audit Report Summaries | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Recording Audit Report Details       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | List Meeting Archive Summaries           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Meeting Archive Details              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Recordings

| Done | Endpoint                                           | Type                                                                                         | Response |
|---|----------------------------------------------------|----------------------------------------------------------------------------------------------|----------|
| ❌ | List Recording                                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | List Recordings For an Admin or Compliance Officer | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Get Recording Details                              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Delete a Recording                                 | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()   | -        |
| ❌ | Move Recordings into the Recycle Bin               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌ | Restore Recordings from Recycle Bin                | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌ | Purge Recordings from Recycle Bin                  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |

#### Session Types

| Done | Endpoint                   | Type                      | Response |
|---|----------------------------|--------------------------|----------|
| ❌ | List Site Session Types    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | List User Session Type     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update User Session Types  | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |

#### Tracking Codes

| Done | Endpoint                     | Type                   | Response |
|---|------------------------------|------------------------|----------|
| ❌ | List Tracking Codes          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get a Tracking Code          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Tracking Code       | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Update a Tracking Code       | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Tracking Code       | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Get User Tracking Codes      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update User Tracking Codes   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |

#### Video Mesh

| Done | Endpoint                                                      | Type                                                                                       | Response |
|---|---------------------------------------------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌ | List Clusters Availability                                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Cluster Availability                                      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Node Availability                                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Node Availability                                         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Media Health Monitoring Tool results                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Media Health Monitoring Tool Test results V2             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Media Health Monitoring Tool Cluster results              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Media Health Monitoring Tool Test results for clusters V2 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Media Health Monitoring Tool Node results                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Media Health Monitoring Tool Test results for node V2     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Overflow to Cloud details                                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Cluster Redirect details                                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Cluster Redirect details                                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Clusters Utilization                                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Cluster Utilization details                               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Reachability Test results                                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Reachability Test results V2                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Reachability Test results for Cluster                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Reachability Test results for cluster V2                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Reachability Test results for Node                        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Reachability Test results for node V2                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Cluster Details                                          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Cluster Details                                           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Trigger on-demand test for cluster                            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Trigger on-demand test for node                               | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Get Triggered test status                                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Triggered test results                                    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Network Test results                                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Network Test results for cluster                          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Network Test results for node                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Cluster Client Type Distribution details                 | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Cluster Client Type Distribution details                  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | List Event Threshold Configuration                            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Event Threshold Configuration                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Update Event Threshold Configuration                          | [![PATCH method](https://img.shields.io/static/v1.svg?label=&message=PATCH&color=blue)]()  | -        |
| ❌ | Reset Event Threshold Configuration                           | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |

#### Webhooks

| Done | Endpoint            | Type                                                                                        | Response |
|---|---------------------|---------------------------------------------------------------------------------------------|----------|
| ❌ | List Webhooks       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | Create a Webhook    | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()   | -        |
| ❌ | Get Webhook Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | Update a Webhook    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()       | -        |
| ❌ | Delete a Webhook    | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()  | -        |


### Messaging

#### Attachment Actions

| Done | Endpoint                       | Type                                                                                      | Response |
|---|--------------------------------|-------------------------------------------------------------------------------------------|----------|
| ❌ | Create an Attachment Action    | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Attachment Action Details  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |

#### Events

| Done | Endpoint            | Type                                                                                      | Response |
|---|---------------------|-------------------------------------------------------------------------------------------|----------|
| ❌ | List Events         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Get Events Details  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |

#### Memberships

| Done | Endpoint               | Type                                                                                         | Response |
|---|------------------------|----------------------------------------------------------------------------------------------|----------|
| ❌ | List Memberships       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Create a Membership    | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌ | Get Membership Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Update a Membership    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()        | -        |
| ❌ | Delete a Membership    | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()   | -        |

#### Messages

| Done | Endpoint             | Type                                                                                       | Response |
|---|----------------------|--------------------------------------------------------------------------------------------|---------|
| ❌ | List Messages        | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -       |
| ❌ | List Direct Messages | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -       |
| ❌ | Create a Message     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -       |
| ❌ | Edit a Message       | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -       |
| ❌ | Get Message Details  | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -       |
| ❌ | Delete a Message     | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -       |

#### People

| Done | Endpoint          | Type                                                                                        | Response |
|---|-------------------|---------------------------------------------------------------------------------------------|----------|
| ❌ | List People       |[![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()    | -        |
| ❌ | Create a Person   |[![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()     | -        |
| ❌ | Get Person Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Person   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Delete a Person   | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()    | -        |
| ❌ | Get My Own Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()   | -        |

#### Room Tabs

| Done | Endpoint             | Type                                                                                   | Response |
|---|----------------------|----------------------------------------------------------------------------------------|----------|
| ❌ | List Room Tabs       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Room Tab    | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Room Tab Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Room Tab    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Room Tab    | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Rooms

| Done | Endpoint                 | Type                                                                                   | Response |
|---|--------------------------|----------------------------------------------------------------------------------------|----------|
| ❌ | List Rooms               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Room            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Room Details         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Room Meeting Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Room            | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Room            | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Team Memberships

| Done | Endpoint                    | Type                 | Response |
|---|-----------------------------|-------------------------|----------|
| ❌ | List Team Memberships       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Team Membership    | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Team Membership Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Team Membership    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Team Membership    | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Teams

| Done | Endpoint          | Type                                                                                         | Response |
|---|-------------------|----------------------------------------------------------------------------------------------|----------|
| ❌ | List Team         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Create a Team     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()    | -        |
| ❌ | Get Team  Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()       | -        |
| ❌ | Update a Team     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()        | -        |
| ❌ | Delete a Team     | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()   | -        |

#### Tracking Codes

| Done | Endpoint                     | Type                   | Response |
|---|------------------------------|------------------------|----------|
| ❌ | List Tracking Codes          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get a Tracking Code          | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Tracking Code       | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Update a Tracking Code       | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Tracking Code       | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Get User Tracking Codes      | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update User Tracking Codes   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |

#### Webhooks

| Done | Endpoint              | Type                                                                                        | Response |
|---|-----------------------|---------------------------------------------------------------------------------------------|----------|
| ❌ | List Webhooks       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | Create a Webhook| [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()   | -        |
| ❌ | Get Webhook Details    | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()      | -        |
| ❌ | Update a Webhook   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()       | -        |
| ❌ | Delete a Webhook| [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]()  | -        |

### SCIM 2

#### Bulk Manage SCIM 2 Users and Groups

| Done | Endpoint       | Type                                                                                        | Response |
|---|----------------|---------------------------------------------------------------------------------------------|----------|
| ❌ | User bulk API  | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()   | -        |

#### SCIM 2 Groups

| Done | Endpoint                  | Type                                                                                       | Response |
|---|---------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌ | Create a group            | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Get a group               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Search groups             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Get Group Members         | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Update a group with PUT   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Update a group with PATCH | [![PATCH method](https://img.shields.io/static/v1.svg?label=&message=PATCH&color=blue)]()  | -        |
| ❌ | Delete a group            | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### SCIM 2 Users

| Done | Endpoint                  | Type                                                                                       | Response |
|---|---------------------------|--------------------------------------------------------------------------------------------|----------|
| ❌ | Create a user             | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()  | -        |
| ❌ | Get a user                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Search users              | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]()     | -        |
| ❌ | Update a user with PUT   | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]()      | -        |
| ❌ | Update a user with PATCH | [![PATCH method](https://img.shields.io/static/v1.svg?label=&message=PATCH&color=blue)]()  | -        |
| ❌ | Delete a user            | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Locations

| Done | Endpoint                     | Type                      | Response |
|---|------------------------------|--------------------------|----------|
| ❌ | List Locations       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Location Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Memberships

| Done | Endpoint               | Type                      | Response |
|---|------------------------|--------------------------|----------|
| ❌ | List Memberships       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create Membership      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Membership Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Membership    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Membership    | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Organizations

| Done | Endpoint                 | Type                      | Response |
|---|--------------------------|--------------------------|----------|
| ❌ | List Organizations       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Get Organization Details | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Delete Organization      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |

#### Space Classifications

| Done | Endpoint                              | Type                      | Response |
|---|---------------------------------------|--------------------------|----------|
| ❌ | List classifications       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Webex Calling Organization Settings

| Done | Endpoint                                                 | Type                   | Response |
|---|----------------------------------------------------------|------------------------|----------|
| ❌ | Read the List of Call Pickups                            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Call Pickup                                     | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Delete a Call Pickup                                     | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Get Details for a Call Pickup                            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Call Pickup                                     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Get available agents from Call Pickups                   | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Read the List of Call Queues                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Call Queue                                      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Delete a Call Queue                                      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Get Details for a Call Queue                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Call Queue                                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Read the List of Call Queue Announcement Files           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Delete a Call Queue Announcement File                    | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Get Call Forwarding Settings for a Call Queue            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update Call Forwarding Settings for a Call Queue         | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Create a Selective Call Forwarding Rule for a Call Queue | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Call Forwarding Rule Settings for a Call Queue       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update Call Forwarding Rule Settings for a Call Queue    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Selective Call Forwarding Rule for a Call Queue | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Read the List of Hunt Groups                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Create a Hunt Group                                      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Delete a Hunt Group                                      | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Get Details for a Hunt Group                             | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update a Hunt Group                                      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Get Call Forwarding Settings for a Hunt Group            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update Call Forwarding Settings for a Hunt Group         | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Create a Selective Call Forwarding Rule for a Hunt Group | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Get Call Forwarding Rule Settings for a Hunt Group       | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Update Call Forwarding Rule Settings for a Hunt Group    | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Delete a Selective Call Forwarding Rule for a Hunt Group | [![DELETE method](https://img.shields.io/static/v1.svg?label=&message=DELETE&color=red)]() | -        |
| ❌ | Read the List of UC Manager Profiles                     | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |

#### Webex Calling Person Settings

| Done | Endpoint                                            | Type                 | Response |
|---|-----------------------------------------------------|--------------------------|----------|
| ❌ | Read Person's UC Profile                            | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Configure a Person's UC Profile                     |  [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Read Barge In Settings for a Person                 |  [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Configure Barge In Settings for a Person            | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Read Forwarding Settings for a Person               | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Configure Call Forwarding Settings for a Person     | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Read Call Intercept Settings for a Person           |  [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Configure Call Intercept Settings for a Person      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Configure Call Intercept Greeting for a Person      |  [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Read Call Recording Settings for a Person           |  [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Configure Call Recording Settings for a Person      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Read Caller ID Settings for a Person                | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Configure Caller ID Settings for a Person           |[![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Read Do Not Disturb Settings for a Person           | [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Configure Do Not Disturb Settings for a Person      | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Read Voicemail Settings for a Person                |  [![GET method](https://img.shields.io/static/v1.svg?label=&message=GET&color=green)]() | -        |
| ❌ | Configure Voicemail Settings for a Person           | [![PUT method](https://img.shields.io/static/v1.svg?label=&message=PUT&color=blue)]() | -        |
| ❌ | Configure Busy Voicemail Greeting for a Person      | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]() | -        |
| ❌ | Configure No Answer Voicemail Greeting for a Person | [![POST method](https://img.shields.io/static/v1.svg?label=&message=POST&color=orange)]()| -        |


## Testing

```bash
composer test
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security-related issues, please email <support@offlineagency.com> instead of using the issue
tracker.

## Credits

- [Offline Agency](https://github.com/offline-agency)
- [Giacomo Fabbian](https://github.com/Giacomo92)
- [Nicolas Sanavia](https://github.com/SanaviaNicolas)
- [All Contributors](../../contributors)

## About us

Offline Agency is a web design agency based in Padua, Italy. You'll find an overview of our
projects [on our website](https://offlineagency.it/).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
