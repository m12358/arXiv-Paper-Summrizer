# arXiv Paper Summarizer

This repository contains a script that automatically summarizes arXiv papers based on a specified query. The script fetches the papers, processes them using the OpenAI GPT API, and sends the summarized papers via email.

## Features

- Fetch arXiv papers based on a query
- Summarize papers using OpenAI GPT API (in Japanese)
- Send summarized papers via email

## Prerequisites

- Google Apps Script environment
- OpenAI API key

## Setup

1. Copy the script file to your Google Apps Script environment.
2. Replace `OPENAI-API-KEY` with your actual OpenAI API key.
3. Update the `query` variable with the desired search query.
4. Update the `max_results` variable with the number of maximum results you want to fetch.
5. Update the `recipient` variable with the email address where you want to receive the summarized papers.

## Usage

Run the `summarize_arXiv_papers` function in your Google Apps Script environment. The script will fetch the papers based on your query, summarize them in Japanese, and send the summaries to the specified email address.

**Notes:**

- The summaries are generated in Japanese by default. If you want to change the language, modify the `summary_request` variable to your desired language.
- This script is designed to be run daily using Google Apps Script's scheduling features. Set up a time-driven trigger to execute the `summarize_arXiv_papers` function every day at your preferred time.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
