// /expenses => shared layout 
import { Link, Outlet, useLoaderData } from "@remix-run/react"
import { FaPlus, FaDownload } from "react-icons/fa"
import ExpensesList from "~/components/expenses/ExpensesList"
import { getExpenses } from "~/data/expenses.server"


export default function ExpensesLayout() {
    const expenses = useLoaderData()
    // console.log("expenses", expenses)

    return <>
        <Outlet/>
        <main>
          <section id="expenses-actions">
            <Link to="add">
              <FaPlus/>
              <span>Add Expense</span>
            </Link>
            <a href="/expenses/raw">
              <FaDownload/>
              <span>Load Raw Data</span>
            </a>
          </section>
          <ExpensesList expenses={expenses}/>
        </main>
    </>
}

export function loader() {
  console.log("EXPENSES LOADER")
  return getExpenses()
}

// the component is prepared on the back end on the first page load (so we can see the log in the server terminal), once we navigate on other page then back on this one
// the log is only seen on the front end terminal