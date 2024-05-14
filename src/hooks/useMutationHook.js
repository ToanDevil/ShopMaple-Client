import { useMutation } from "@tanstack/react-query"

export const useMyMutationHook = (fnCallBack) => {
    const mutation = useMutation({
        mutationFn: fnCallBack
    })
    return mutation
}