# Projects & Daily Logs Setup Guide

This guide will help you set up the projects and daily logging functionality in your FoundrDaily application.

## Database Setup

### 1. Supabase Database Schema

Run the SQL commands from `SUPABASE_SCHEMA.sql` in your Supabase SQL editor to create the necessary tables:

- `projects` - Stores user projects (startups/products)
- `logs` - Stores daily log entries for each project

### 2. Environment Variables

Make sure your `.env.local` file contains the correct Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Features Implemented

### 1. Projects Management
- **Create Projects**: Users can create new startup/product projects with name and description
- **View Projects**: Grid layout showing all user projects with streak statistics
- **Project Details**: Individual project pages with daily logs and statistics

### 2. Daily Logging System
- **Log Daily Progress**: Users can create daily log entries for each project
- **Streak Tracking**: Automatic calculation of consecutive days of logging
- **Content Management**: Rich text logs with markdown support
- **Progress Statistics**: Current streak, best streak, and total logs

### 3. User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Consistent with FoundrDaily's design system
- **Interactive Elements**: Hover effects, animations, and smooth transitions

## File Structure

```
src/
├── app/
│   ├── projects/
│   │   ├── page.tsx              # Projects listing page
│   │   └── [id]/
│   │       └── page.tsx          # Individual project page with logs
├── components/
│   └── ui/
│       └── Sidebar.tsx           # Updated sidebar with project links
├── lib/
│   └── services/
│       └── projectService.ts     # API service functions
└── types/
    └── project.ts               # TypeScript type definitions
```

## Usage

### For Users

1. **Sign In**: Create an account or sign in to access projects
2. **Create Projects**: Click "Create Project" to start a new startup/product project
3. **Log Daily Progress**: Within each project, create daily log entries
4. **Track Streaks**: View current streak, best streak, and total logs
5. **Monitor Progress**: See detailed statistics and log history

### For Developers

1. **Database**: Ensure Supabase tables are created with proper RLS policies
2. **Authentication**: Users must be authenticated to access projects
3. **API Calls**: All database operations go through the `projectService`
4. **Error Handling**: Comprehensive error handling for all operations

## Key Features

### Streak Calculation Logic
- **Current Streak**: Consecutive days from today with logs
- **Best Streak**: Longest consecutive streak ever achieved
- **Total Logs**: Total number of log entries
- **Daily Limit**: One log per day per project (prevents duplicate logs)

### Data Validation
- Prevents duplicate logs for the same day
- Validates required fields
- Handles edge cases in streak calculations

### Security
- Row Level Security (RLS) policies ensure users can only access their own data
- All operations require authentication
- Proper error handling prevents data leaks

## Customization

### Colors and Styling
- Consistent with FoundrDaily's orange/blue gradient theme
- Responsive design adapts to different screen sizes
- Clean, modern interface

### Log Content
- Supports markdown or plain text
- Large text area for detailed entries
- Timestamp tracking for each log

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure Supabase credentials are correct
2. **Authentication**: Users must be signed in to access projects
3. **RLS Policies**: Verify Row Level Security is properly configured
4. **TypeScript Errors**: Check that all types are properly imported

### Performance
- Database indexes optimize query performance
- Efficient streak calculation algorithms
- Minimal API calls with proper caching

## Future Enhancements

Potential features to add:
- Log reminders and notifications
- Log sharing and social features
- Advanced analytics and insights
- Log templates and categories
- Export and backup functionality
- Log search and filtering
- Rich text editor with formatting 