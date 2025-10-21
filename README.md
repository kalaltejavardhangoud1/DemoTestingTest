Step 2: Create GitHub Repository & Push Code

Go to GitHub and create a new repository
Copy the repository URL
Push your code:

bash# Replace <your-username> and <repo-name> with your actual values
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main

🎯 Step 3: Create Meticulous Account & Connect Repository
3.1 Create Meticulous Account

Visit https://meticulous.ai
Sign up (using GitHub is recommended)
Verify your email address

3.2 Connect GitHub to Meticulous

In your Meticulous dashboard, navigate to Settings → Integrations → GitHub
Click Connect to GitHub
Authorize Meticulous to access your repositories
Select the repository where your Next.js project lives

3.3 Create a Project in Meticulous

Click "New Project" in the Meticulous dashboard
Select your connected GitHub repository
Copy the Project Token (you'll need this for environment variables)
Copy the Recording Token (you'll need this too)


🔧 Step 4: Add Meticulous Snippet to Your Code
In your app/layout.tsx (or pages/_app.tsx for Pages Router), add the Meticulous snippet:

Step 5: Deploy to Netlify
5.1 Create Netlify Account

Go to https://app.netlify.com
Sign up or log in using your GitHub account

5.2 Deploy Your Project

Click "Add new site" → "Import an existing project"
Choose GitHub and authorize access
Select your repository
Configure build settings:

Build command: npm run build
Publish directory: .next (or out for static export)


Click "Deploy site"


🔐 Step 6: Add Environment Variables in Netlify
In Netlify, go to Site Settings → Environment Variables and add the following:
Variable NameValueDescriptionNEXT_PUBLIC_ENABLE_METICULOUStrueEnables Meticulous snippetNEXT_PUBLIC_METICULOUS_RECORDING_TOKENyour-recording-tokenRecording token from MeticulousNEXT_PUBLIC_METICULOUS_IS_PRODUCTIONtrueSet to true for productionMETICULOUS_PROJECT_TOKENyour-project-tokenProject token from Meticulous (for API calls)NODE_ENVproductionEnvironment mode
Note: Replace your-recording-token and your-project-token with the actual tokens from your Meticulous dashboard.
How to Add Variables:

Go to Site Settings → Build & Deploy → Environment Variables
Click "Add a variable"
Enter the key and value
Click "Create variable"
Repeat for all variables


🔗 Step 7: Add Post-Deploy Webhook (Trigger Tests Automatically)
7.1 Get Meticulous Webhook URL

In Meticulous dashboard, go to Project → Integrations / CI
Copy the Webhook URL (e.g., https://api.meticulous.ai/webhook/...)

7.2 Add Webhook to Netlify

In Netlify, go to Site Settings → Build & Deploy → Deploy Notifications
Click "Add notification" → "Outgoing Webhook"
Configure webhook:

Event to listen for: Deploy succeeded
URL to notify: Paste the Meticulous webhook URL


Click "Save"

Now, every time your site deploys successfully, Meticulous will automatically run visual regression tests!