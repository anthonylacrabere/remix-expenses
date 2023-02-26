import { redirect } from "@remix-run/node"

export function loader({ params }) {
    console.log(params)

    if(params["*"] === "something") {
        return redirect('/expenses')
    }

    throw new Response('Not found', { status: 404})
}


// SPLAT ROUTE
// can be nested (ex in /expenses directory)