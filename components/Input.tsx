import { forwardRef } from 'react';
import SearchIcon from '../icons/SearchIcon';

export default forwardRef<HTMLInputElement,  React.ComponentPropsWithRef<'input'>>(function Input(
  {className, ...props},
  ref,
) {
  return (
    <div className={`${className} relative  mx-6`}>
      <input ref={ref} className='w-full h-[46px] p-2 pr-10 rounded-lg' {...props} />
      <div className='absolute top-0 right-2 h-full flex flex-row items-center'><SearchIcon /></div>
    </div>
  )
})