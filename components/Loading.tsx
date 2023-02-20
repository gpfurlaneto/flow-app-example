import { Spinner, SpinnerProps } from "flowbite-react";

export default function Loading(props: SpinnerProps) {
  return (
    <div className="fixed top-0 left-0 z-100 w-screen h-screen bg-gray-500/50 flex flex-row items-center justify-center">
      <Spinner
        size="xl"
        {...props}
        aria-label="Loading..."
      />
    </div>
  )
}