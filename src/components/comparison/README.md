# Creator Comparison Tool

A comprehensive tool for comparing multiple creators side-by-side with detailed stats and metrics.

## Features

- **Multi-Creator Selection**: Compare up to 4 creators simultaneously
- **Smart Search**: Find creators by username or display name
- **Side-by-Side Comparison**: View metrics in an organized table format
- **Interactive Charts**: Visualize data with bar charts, line charts, and pie charts
- **Export Functionality**: Export comparison data as CSV or JSON
- **Responsive Design**: Works on desktop and mobile devices

## Components

### CreatorComparison
Main component that orchestrates the comparison functionality.

### CreatorSelector
Handles creator search and selection with autocomplete functionality.

### ComparisonTable
Displays metrics in a structured table format with the following data:
- Total Tips Received
- Number of Tips
- Unique Supporters
- Average Tip Amount
- Top Supporter Amount
- Recent Activity (7 days)

### ComparisonCharts
Provides visual representation of data through:
- Total Tips Bar Chart
- Tip History Line Chart (30 days)
- Supporter Distribution Pie Chart
- Average Tip Amount Horizontal Bar Chart

### ExportButton
Enables data export in CSV and JSON formats with formatted data.

## Usage

1. Navigate to `/compare`
2. Search and select creators to compare (minimum 2, maximum 4)
3. Switch between table and charts view
4. Export data if needed

## Data Sources

The comparison tool uses the existing `useCreatorStats` hook to fetch:
- Creator statistics
- Tip history
- Supporter information
- Performance metrics

## Navigation Integration

The comparison tool is accessible through:
- Main navigation menu
- Explore page header button
- Mega menu under "Explore"