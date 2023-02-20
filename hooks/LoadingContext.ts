import { createContext } from "react"

export interface ILoadingContext { setIsLoading: (isLoading: boolean) => void }

const LoadingContext = createContext<ILoadingContext>({
  setIsLoading: () => {}
})

export default LoadingContext