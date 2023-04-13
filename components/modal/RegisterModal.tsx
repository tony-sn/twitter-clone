import { useCallback, useReducer } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import Input from "@/components/Input";
import Modal from "@/components/Modal";

function reducer(state, action) {
  console.log("reducer", { state, action });

  switch (action.type) {
    case "SUBMITTING":
      return { isLoading: false, [action.name]: action.value };
    case "SUBMITTED":
      return { isLoading: true };
  }

  throw new Error("Unhandled action type" + action.type)
}

function RegisterModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  console.log('register modal', {registerModal});

  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    name: "",
    username: "",
    isLoading: false,
  })

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SUBMITTING", name, value })
  }

  const onToggle = useCallback(() => {
    if (state.isLoading) {
      return
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [state.isLoading, registerModal, loginModal])

  const onSubmit = useCallback(async () => {
    dispatch({ type: "SUBMITTING" })
    try {
      // TODO: ADD REGISTER AND LOGIN
      // await loginModal.onSubmit(state.email, state.password)
      registerModal.onClose()
    } catch (error) {
      console.log("error", error)
    } finally {
      dispatch({ type: "SUBMITTED" })
    }

  }, [registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input placeholder='email@mail.com' onChange={handleInput} value={state.email} disabled={state.isLoading} />
      <Input placeholder='Enter your password' onChange={handleInput} value={state.password} disabled={state.isLoading} />
      <Input placeholder='Name' onChange={handleInput} value={state.name} disabled={state.isLoading} />
      <Input placeholder='username' onChange={handleInput} value={state.username} disabled={state.isLoading} />
    </div>
  )

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>Already have an account? <span onClick={onToggle} className="text-white cursor-pointer hover:underline">Sign in</span></p>
    </div >
  )

  return (
    <div>
      <Modal disabled={state.isLoading} isOpen={registerModal.isOpen} title="Create an account" actionLabel="Register" onClose={registerModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent} />
    </div>
  )
}

export default RegisterModal;
