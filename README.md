# NextJS + Supabase Instagram Clone

## Overview

This project was built to try out some cool new libraries with the goal of having a riduculously easy type safe backend that is also pretty powerful and flexible in terms of its querying capabilities and provides good human readbility for a supa-fast DX. The libraries that make this possible are:

- **NextJS** 💻 - SSR and performant frontend with API routes built in [learn more](https://nextjs.org/)
- **Supabase** 🔥 - BaaS providing auth, storage and a PostgresSQL DB [learn more](https://supabase.io/)
- **TailwindCSS** 🖼 - Utility style CSS for quickly building out the interface
- **tRPC** 💪 - End-to-end type safety to communicate with our API routes and react-query wrapper [learn more](https://trpc.io/)
- **Prisma** 💎 - Database schema controller and ORM with awesome type safety from generated types based off schema [learn more](https://prisma.io/)

What you might already be able to see is this gives type safety from DB --> Client with the use of Prisma and tRPC. This makes for a pretty seamless DX and gives you a lot of confidence that changes in your data model or API interface will get picked up by your IDE during development 😃

> **Note:** This could also be extended for use in React Native with a monorepo style structure - the creator of tRPC also made [zART](https://github.com/KATT/zart) which showcases how this can be achieved

## Getting Started

First, we will need to create a Supabase project which you can do by heading over to https://supabase.io. Once that is setup ensure you have [email auth enabled](https://supabase.io/docs/guides/auth).

Then we can create our environment file as follows:

```bash
# .env

# Can be found in Settings > API
NEXT_PUBLIC_SUPABASE_URL="https://__PROJECT_ID__.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Prisma DB URLs - can be found in Databases > Connection pooling
# Ensure you set the port to 6543 on this page too!
MIGRATION_DATABASE_URL="postgres://postgres:__DATABASE_PASSWORD__.__PROJECT_ID__.supabase.co:5432/postgres"
DATABASE_URL="postgres://postgres:__DATABASE_PASSWORD__.__PROJECT_ID__.supabase.co:6543/postgres?pgbouncer=true"
```

Now we can run Prisma to firstly perform our schema migration to Supabase and then generate our Prisma client locally:

```bash
npx prisma migrate dev # Will setup the tables we need in Supabase from our schema
```

```bash
npx prisma generate # Will generate our Prisma client with types!
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

The MIT License (MIT). Please see LICENSE.md for more info
