import { useEffect, useState } from "react"

export const useForm = (initialForm={}, validationForm={}) => {

    const [formState, setFormState] = useState(initialForm)
    const [validateForm, setValidateForm] = useState({})

    const [checkValidation, setCheckValidation] = useState(false)

    const onInputChange = ({target})=>{

        setFormState({
            ...formState,
            [target.name]:target.value
        })

    }

    const createValidator = ()=>{

        const formCheckedValues = {}

        Object.keys(validationForm).forEach(key=>{
            const [fn,validation] = validationForm[key]
            formCheckedValues[`${key}Valid`]=fn(formState[key]) ? null : validation
        })

        setCheckValidation(true)
        for (const value in formCheckedValues) {
            if (!!formCheckedValues[value]) {
                setCheckValidation(false)
                break
            }
        }

        setValidateForm(formCheckedValues)

    }

    // const checkForm = ()=>{
    //     console.log(validateForm)
    //     setCheckValidation(true)
    //     for (const value in validateForm) {
    //         console.log(value)
    //         if (!!value) {
    //             return setCheckValidation(false)
    //         }
    //     }
    // }

    useEffect(()=>{
        createValidator()
        // checkForm()
    },[formState])

  return {
    ...formState,
    formState,
    onInputChange,
    ...validateForm,
    checkValidation,
  }
}
