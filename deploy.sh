# Build the source code
yarn build

# Navigate to the "dist" directory
cd dist || exit

# Initialize a new Git repository
git init

# Add the remote for the GitHub Pages repository
git remote add origin https://github.com/collinsinclair/collinsinclair.github.io.git

# Add CNAME
echo collinsinclair.com > CNAME

# Add the built files to the repository and make a commit
git add .
git commit -m "deploy"

# Push the changes to the GitHub Pages repository
git push -u -f origin main

# Remove dist directory
cd ..
yes | rm -r dist

# Reset git remote
