import ExpensesForm from "~/components/expenses/ExpenseForm"
import { useNavigate } from "@remix-run/react"
import Modal from "~/components/util/Modal"
import { updateExpense, deleteExpense } from "~/data/expenses.server"
import { redirect } from "@remix-run/node"
import { validateExpenseInput } from "~/data/validation.server"
// import { getExpense } from "~/data/expenses.server"

export default function UpdateExpensesPage() {
  const navigate = useNavigate()

    const closeHandler = () => {
      navigate('..')
    }


    return (
      <Modal onClose={closeHandler}>
        <ExpensesForm />
      </Modal>
    )
  }
  
  // we technically dont need this loader because we use the loader on the parent which fetch all expenses yet
  // 
  // export  function loader({params}) {
  //   console.log("EXPENSE ID LOADER")
  //   const expenseId = params.id
  //   return getExpense(expenseId)
  // }

  // action which update or edit expense
  export async function action({params, request}) {
    const expenseId = params.id
    
    if(request.method === "PATCH") {
      const formData = await request.formData()

      const expenseData = Object.fromEntries(formData)
  
      try {
        validateExpenseInput(expenseData)
     } catch (error) {
      //  return the error object from validation instead of throwing error for form validation
        return error
     }
  
      await updateExpense(expenseId, expenseData)
  
      return redirect("/expenses")
    } else if (request.method === "DELETE") { 
      await deleteExpense(expenseId)
      return redirect("/expenses")
    }
    
  }