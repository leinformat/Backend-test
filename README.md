# Rick and Morty Data Migration and Integration to HubSpot

![Project Banner](rick-and-morty.jpg)

## Description
This project performs data migration from the Rick and Morty API to a HubSpot account, processing the data to identify characters and their locations. It then integrates with a second HubSpot account to keep the data synchronized.


## Table of Contents
- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Data Extraction](#data-extraction)
- [Data Processing](#data-processing)
- [Data Insertion into HubSpot (First Account)](#data-insertion-into-hubspot-first-account)
- [Workflow Webhooks](#workflow-webhooks)
- [Integration with Second HubSpot Account](#integration-with-second-hubspot-account)
- [Workflow Webhooks Setup](#workflow-webhooks-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [License](#license)


## Prerequisites
- Node.js installed on your machine
- Two HubSpot account with private APPS available to create and delete contacts and Companies


## Installation
1. Clone this repository:
    ```bash
    git clone https://github.com/leinformat/Backend-test.git
    cd your-repo
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```


## Configuration
Create a `.env` file in the root of the project and add your API keys. Use the `.env.example` file as a reference for the required environment variables:

- SOURCE_API_KEY= source_account_private_app_access_token
- MIRROR_API_KEY= mirror_account_private_app_access_token
- API_TOKEN= mirror_account_private_app_access_token
- PORT= 1000


## Usage
To run the migration and integration, use the following commands:

- Start the server for integration:
    ```bash
    npm start
    ```
- Execute the migration (this will call the Rick and Morty API and fill the source HubSpot account with characters and their associated locations):
    ```bash
    npm run migrate
    ```
- Run the server locally for development and testing:
    ```bash
    npm run dev
    ```


### Data Extraction
The script extracts character and location data from the Rick and Morty API:
- **Endpoint**: `https://rickandmortyapi.com/api/character` and `https://rickandmortyapi.com/api/location`


### Data Processing
Data is filtered to identify characters with IDs that are prime numbers:
- **Logic**: Checks if the character ID is a prime number


### Data Insertion into HubSpot (Source Account)
Data is inserted into the Source HubSpot account, and associations between characters and locations are created:
- **HubSpot Objects**: Contacts for characters, Companies for locations


### Workflow Webhooks
Workflow Webhooks are used to send information to the APIs of the Mirror HubSpot account:
- **Contacts Webhook (Characters)**: Triggers on contact creation or update
- **Companies Webhook (Locations)**: Triggers on company creation or update


### Integration with Second HubSpot Account
The script checks if the characters and locations already exist in the second HubSpot account. If they don't, they are created; if they do, they are updated:
- **Verification**: Checks existence before creation or update
- **Actions**: Creates or updates contacts and companies


### Workflow Webhooks Setup
To configure Workflow webhooks in HubSpot:
1. Go to your HubSpot account and navigate to **automations > workflows**.
2. Set up the following webhooks:
    - **Contacts Workflow (Characters)**:
        - **Webhook URL**: `https://backend-test-nygv.onrender.com/api/update-contact-mirror`
        - **Autentication type**: API Key
        - **API Key**: Create a secret = Bearer MIRROR_API_KEY
        - **API Key Name**: authorization
        - **Events**: Create and update contacts
    - **Companies Workflow (Locations)**:
        - **Webhook URL**: `https://backend-test-nygv.onrender.com/api/update-company-mirror`
        - **Autentication type**: API Key
        - **API Key**: Create a secret = Bearer MIRROR_API_KEY
        - **API Key Name**: authorization
        - **Events**: Create and update companies


### Environment Variables
A sample `.env.example` file is provided with the names of all required environment variables. Make sure to create your own `.env` file based on this template and fill in the appropriate values:
```plaintext
SOURCE_API_KEY=
MIRROR_API_KEY=
API_TOKEN=
PORT=
```


### License
This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/licenses/MIT) file for details.