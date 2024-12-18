Visit our service at https://aigendrug-frontend-nine.vercel.app/
# User Manual for AIGENDRUG

## Introduction

Welcome to the **AIGENDRUG**! This platform is designed to help manage and monitor jobs and experiments related to AI-driven IC-50 prediction. This guide will walk you through the setup, navigation, and usage of the application.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Navigating the Application](#navigating-the-application)
3. [Managing Jobs](#managing-jobs)
4. [Managing Experiments](#managing-experiments)
5. [Real-time Updates](#real-time-updates)
6. [Troubleshooting](#troubleshooting)
7. [Support](#support)

---

## Getting Started

### Prerequisites

To use this application, make sure you have the following:

- **Node.js** installed.
- **Yarn** package manager installed.
- A cloned copy of the repository from the source control system.

### Installation

1. Open your terminal and navigate to the project directory named **`frontend`** (Note: The directory is named `frontend`, not `aigendrug-frontend`).
2. Install the required dependencies by running:

   ```bash
   yarn install
   ```

3. Start the development server by running:

   ```bash
   yarn dev
   ```

4. Open your browser and go to `http://localhost:3000` to access the application.

---

## Navigating the Application

- **Header**: Shows the application name, **AIGENDRUG**. By clicking the header logo, you will be redirected to the home page.
- **Job Table**: Displays a list of jobs, including details like Job Name, Protein, Start Date, and actions (view or delete).
- **Add Job Button**: Opens a modal to add new jobs.
- **Experiment Table**: Displays a list of experiments, including details like Experiment Name, Ligand, Measured Value, Predicted Value, Status, and etc.
- **Add Experiment Button**: Opens a modal to add new experiments.
- **Loading Indicator**: Appears during data processing or when fetching new data.

---

## Managing Jobs

### Viewing Jobs

- Jobs are shown in a table format with the following columns: **Job Name**, **Protein**, **Start Date**, and **Details**.
- Click the **View** button in the Details column to view more information about a specific job.

### Adding a Job

1. Click the **Add Job** button.
2. In the modal that opens, fill in the required fields:

   - **Job Name**
   - **Target Protein Name**
   - **Ligand List** (upload in CSV format).

   **Example Data for Ligand List:**

   | Name         | SMILES                                              | Standard Value |
   | ------------ | --------------------------------------------------- | -------------- |
   | CHEMBL118923 | Cl.Cn1cc2c(nc(NC(=O)Nc3ccncc3)n3nc(-c4ccco4)nc23)n1 | 0.001243791357 |

3. Submit the form to add the job. A success message will appear upon completion.  
   **Note**: Adding a job automatically queues all ligands in the AI model for processing.

### Deleting a Job

1. Click the **Delete** icon next to the job you wish to remove.
2. A success message will confirm the job has been deleted.

---

## Managing Experiments

### Adding Experiments

1. Click the **Add Experiment** button.
2. Fill in the required fields:

   - **Experiment Name**
   - **Ligand** (in SMILES format)
   - **Measured Value** (optional).

3. Submit the form.  
   **Note**: Adding an experiment triggers the calculation of a **predicted value** for that experiment.

### Running Feedback Experiments

1. Input measured values for multiple experiments.
2. Select experiments using the checkboxes.
3. Click the **Run** button to process them simultaneously.

---

## Real-time Updates

- The application updates automatically using a **5-second polling mechanism**.
- Items currently loading are prioritized and displayed at the top of the list.

---

## Troubleshooting

- **Loading Issues**: Check your internet connection. If the loading screen persists, try refreshing the page.
- **Error Messages**: Open the browser console to view detailed error logs. Follow the suggestions provided in the logs to resolve the issue.

---

## Support

If you need further assistance, feel free to reach out via email: [khinwaiyan@snu.ac.kr](mailto:khinwaiyan@snu.ac.kr).
