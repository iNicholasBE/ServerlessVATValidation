# VAT Number Validation Project

This project provides a complete solution for validating Belgian VAT numbers within Unbounce landing pages. It includes a **serverless API** hosted on Vercel to communicate with the European Commission's VIES API and a **custom JavaScript** script to perform front-end validation on Unbounce forms.


## Overview

Validating VAT numbers is crucial for businesses operating within the European Union to ensure the legitimacy of their partners and clients. This project simplifies the process by integrating VAT validation directly into Unbounce landing pages, enhancing data quality and user experience.

## Features

- **Serverless API**: A lightweight proxy hosted on Vercel that communicates with the VIES API to validate Belgian VAT numbers.
- **Front-End Validation**: Custom JavaScript for Unbounce forms that cleans user input, validates VAT numbers in real-time, and provides immediate feedback.
- **CORS Handling**: Proper CORS configuration to allow secure communication between Unbounce and the serverless API.
- **User Feedback**: Alerts users about the validity of their VAT numbers, preventing form submission if invalid.

## Architecture

1. **Unbounce Landing Page**: Hosts the form where users input their VAT numbers.
2. **Custom JavaScript**: Intercepts form submissions, cleans input, and sends validation requests to the serverless API.
3. **Serverless API (Vercel)**: Acts as a proxy to the VIES API, handling CORS and ensuring secure communication.
4. **VIES API**: European Commission's VAT Information Exchange System used for validating VAT numbers.

## Prerequisites

- **Vercel Account**: To deploy the serverless API.
- **Unbounce Account**: To integrate the custom JavaScript into your landing pages.
- **Node.js & npm**: For local development and dependency management.

Want a video that explains how to implement this in Unbounce?  
[Request access here](https://drive.google.com/drive/folders/1A3WAIeeRApOnafm_v_mFWHZ8QZYQgvHH)
