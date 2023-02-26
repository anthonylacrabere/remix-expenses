import { redirect } from "@remix-run/node"
import { useNavigate } from "@remix-run/react"
import ExpensesForm from "~/components/expenses/ExpenseForm"
import Modal from "~/components/util/Modal"
import { addExpense } from "~/data/expenses.server"
import { validateExpenseInput } from "~/data/validation.server"

export default function ExpensesAddPage() {
   const navigate = useNavigate()

    const closeHandler = () => {
      navigate('..')
    }

    return <Modal onClose={closeHandler}><ExpensesForm /></Modal>
  }
  
  // Triggered when form in ExpenseForm is submitted with post action
export async function action({request, params}) {
  const formData = await request.formData()
  // const title = formData.get('title') /// OR 
  const expenseData = Object.fromEntries(formData)
 try {
    validateExpenseInput(expenseData)
 } catch (error) {
  //  return the error object from validation instead of throwing error for form validation
    return error
 }
  console.log("expenseDate", expenseData)
  await addExpense(expenseData)

  return redirect("/expenses")
}