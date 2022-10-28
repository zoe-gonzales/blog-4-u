# Blog 4 U

This repo is based on the NextJS/Prisma tutorial [here](https://vercel.com/guides/nextjs-prisma-postgres).

It is hosted on Vercel and the database is hosted on Heroku.

## Run the app locally

1. Fork or clone this repo.
2. Run `npm i`. (note: node and npm required on your machine to run this project)
3. Create a `.env` file at the root of your project and add the following:

```
DATABASE_URL=your-db-url-here
GITHUB_ID=your-github-oauth-app-id-here
GITHUB_SECRET=your-github-oauth-app-secret-here
NEXTAUTH_URL=http://localhost:3000/api/auth
```

4. Follow the steps in the tutorial above under **Step 2: Set up Prisma and connect your PostgreSQL database** in order to install prisma and create your database in Heroku.
5. Go to the section of the tutorial that starts with: **Since you're using GitHub authentication, you also need to create a new OAuth app on GitHub.**. Complete the steps to create your OAuth app in Github following the tutorial. Make sure that your OAuth `Authorization callback URL` and the value of `NEXTAUTH_URL` in your `.env` file match.
6. Run `npm run dev` and make your way to [http://localhost:3000](http://localhost:3000).
