# Formspree Setup Guide

## Step 1: Create Formspree Account
1. Go to https://formspree.io/
2. Sign up for a free account
3. Verify your email address

## Step 2: Create a New Form
1. Click "New Form" in your dashboard
2. Give it a name like "Portfolio Contact Form"
3. Copy the form endpoint URL (looks like: https://formspree.io/f/xpzqkqkq)

## Step 3: Update the Form Endpoint
1. Open `src/components/ContactForm.tsx`
2. Find line 47: `const response = await fetch('https://formspree.io/f/xpzqkqkq', {`
3. Replace `https://formspree.io/f/xpzqkqkq` with your actual Formspree endpoint

## Step 4: Test the Form
1. Deploy your site
2. Fill out the contact form
3. Check your email for the form submission
4. Check Formspree dashboard for submissions

## Features Included:
- ✅ Spam protection (built into Formspree)
- ✅ Email notifications
- ✅ Form validation
- ✅ Loading states
- ✅ Success/error messages
- ✅ Beautiful animations
- ✅ Mobile responsive

## Free Tier Limits:
- 50 submissions per month
- Formspree branding (can be removed with paid plan)
- All submissions stored in Formspree dashboard

That's it! Your contact form will be fully functional once you update the endpoint URL.
