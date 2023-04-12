import { useCallback, useReducer } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import Input from "@/components/Input";
import Modal from "@/components/Modal";

function reducer(state, action) {
  console.log("reducer", { state, action });

  switch (action.type) {
    case "SUBMITTING":
      return { isLoading: false, [action.name]: action.value };
    case "SUBMITTED":
      return { isLoading: true  };

      throw new Error("Unhandled action type" + action.type)
  }

}

function LoginModal() {
  const loginModal = useLoginModal();
  const {isOpen, isClose, onClose} = loginModal;

  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    isLoading: false,
  })

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SUBMITTING", name, value })
  }

  const onSubmit = useCallback(async () => {
    dispatch({ type: "SUBMITTING" })
    try {
      // await loginModal.onSubmit(state.email, state.password)
      loginModal.onClose()
    } catch (error) {
      console.log("error", error)
    } finally {
      dispatch({ type: "SUBMITTED" })
    }

  }, [loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input placeholder='email@mail.com' onChange={handleInput} value={state.email} disabled={state.isLoading} />

      <Input placeholder='Enter your password' onChange={handleInput} value={state.password} disabled={state.isLoading} />
    </div>
  )

  return (
    <div>
      <Modal disabled={state.isLoading} isOpen={true} title="Login" actionLabel="Sign in" onClose={onClose} onSubmit={onSubmit} body={bodyContent} />
    </div>
  )
}

export default LoginModal;
