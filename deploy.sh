npm run build
cd dist || exit
echo "collinsinclair.com" > CNAME
git add .
git commit -m "deploy"
git push