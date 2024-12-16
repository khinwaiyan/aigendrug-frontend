# User Manual for AIGENDRUG Frontend

## Introduction

Welcome to the AIGENDRUG application, a platform designed to manage and monitor jobs and experiments related to AI-driven drug discovery. This manual will guide you through the setup, navigation, and usage of the application.

## Table of Contents

1. [Getting Started]
2. [Navigating the Application]
3. [Managing Jobs]
4. [Managing Experiments]
5. [Real-time Updates]
6. [Troubleshooting]
7. [Support]

## Getting Started

### Prerequisites

- Ensure you have Node.js and yarn installed on your machine.
- Clone the repository from the source control.

### Installation

1. Open your terminal and navigate to the project directory named `frontend`(Be aware that the project directory is named `frontend` not `aigendrug-frontend`).
2. Run the following command to install the necessary dependencies:

   ```bash
   yarn install

   ```

3. Start the development server:

   ```bash
   yarn dev

   ```

4. Open your browser and navigate to `http://localhost:3000` to access the application.

## Navigating the Application

- **Header**: Displays the application name, "AIGENDRUG".
- **Job Table**: Lists all jobs with details such as Job Name, Protein, Start Date, and options to view or delete.
- **Add Job Button**: Opens a modal to add a new job.
- **Loading Indicator**: Displays a loading screen when data is being fetched or processed.

## Managing Jobs

### Viewing Jobs

- Jobs are displayed in a table format with columns for Job Name, Protein, Start Date, and Details.
- Click on "View" under the Details column to see more information about a specific job.

### Adding a Job

1. Click the "Add Job" button.
2. Fill in the required details in the modal that appears (Job Name, Target Protein Name, Ligand List in CSV format).

**Example Data for Ligand List**

| Name         | SMILES                                              | Standard Value |
| ------------ | --------------------------------------------------- | -------------- |
| CHEMBL118923 | Cl.Cn1cc2c(nc(NC(=O)Nc3ccncc3)n3nc(-c4ccco4)nc23)n1 | 0.001243791357 |

3. Submit the form to add the job. A success message will appear upon successful addition. **Adding a job will automatically run the job meaning all ligands are added to the AI Model queue.**

### Deleting a Job

1. Click the delete icon next to the job you wish to remove.
2. A success message will confirm the job has been deleted.

## Managing Experiments

### Adding Experiments

- Experiments are added by clicking the "Add Experiment" button.
- The experiment name, ligand in smiles format, measured value(optional) are required to add an experiment.
- **Adding an experiment will calculate the predicted value for that experiment.**

### Running Feedback Experiments

- Measured values are added as input to the AI Model to calculate the predicted value.
- This is done by clicking the "Run" button.
- Input measured values for multiple experiments and select them using checkboxes and click the "Run" button to run simultaneously.

## Real-time Updates

- The application uses a 5-second polling mechanism to update the UI with the latest data.
- Loading items are prioritized and displayed at the top of the list.

## Troubleshooting

- **Loading Issues**: Ensure your internet connection is stable. If the loading screen persists, try refreshing the page.
- **Error Messages**: Check the console for detailed error logs. Most issues can be resolved by following the error messages.

## Support

For further assistance, please contact [me](mailto:khinwaiyan@snu.ac.kr).
