import { forwardRef } from 'react';
import { Color } from '../typings/Color';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  color?: Color
}

export default forwardRef<HTMLButtonElement,  ButtonProps>(function Button(
  { children, color = Color.blue, className, ...props},
  ref,
) {
  return (
    <button ref={ref} {...props} type="button" className={`${className} bg-blue-500 text-white font-medium px-2 py-1 rounded-lg`}>{children}</button>
  )
})