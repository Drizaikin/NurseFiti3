# GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click the "+" icon in the top right
3. Select "New repository"
4. Fill in the details:
   - **Repository name:** `nursefiti` (or your preferred name)
   - **Description:** "NurseFiti - Kenyan NCK Exam Preparation Platform"
   - **Visibility:** Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Connect Your Local Repository

After creating the repository, GitHub will show you commands. Use these:

### Option A: If you see the commands on GitHub, copy them

They will look like this:
```bash
git remote add origin https://github.com/YOUR_USERNAME/nursefiti.git
git branch -M main
git push -u origin main
```

### Option B: Manual Setup

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/nursefiti.git

# Verify the remote was added
git remote -v

# Push to GitHub
git push -u origin main
```

## Step 3: Enter Your Credentials

When you push, you'll be asked for credentials:
- **Username:** Your GitHub username
- **Password:** Use a Personal Access Token (NOT your GitHub password)

### How to Create a Personal Access Token:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "NurseFiti Development"
4. Select scopes: Check "repo" (full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** - you won't see it again!
7. Use this token as your password when pushing

## Step 4: Verify Upload

After pushing, go to your GitHub repository URL:
```
https://github.com/YOUR_USERNAME/nursefiti
```

You should see all your files there!

## Quick Commands Reference

```bash
# Check current status
git status

# Add new changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log --oneline

# Check remote URL
git remote -v
```

## Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/nursefiti.git
```

### Error: "Authentication failed"
- Make sure you're using a Personal Access Token, not your password
- Check that the token has "repo" permissions

### Error: "Repository not found"
- Verify the repository name is correct
- Check that you have access to the repository
- Ensure the URL is correct

## Next Steps After Pushing

1. ✅ Add repository description on GitHub
2. ✅ Add topics/tags: `nextjs`, `typescript`, `supabase`, `nursing`, `education`
3. ✅ Enable GitHub Pages (if you want to host documentation)
4. ✅ Set up branch protection rules (optional)
5. ✅ Add collaborators (if working with a team)

## Recommended: Set Up GitHub Actions (Optional)

Create `.github/workflows/ci.yml` for automated testing:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm ci
    - name: Lint
      run: npm run lint
    - name: Build
      run: npm run build
```

---

**Your commit is ready!** Just follow the steps above to push to GitHub.
