// This is a helper function whose job is:

// It is a function which takes in the route and checks,
// if we are in the production getEnvironmentData, it sees if we are using the vercel URL, otherwise it will be a localhost 

export const getFetchUrl = (route: string) =>
`${
    process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL!}`
    : "http://localhost:3000"
}/${route}`;
