function Container({ children }) {
  return (
    <div className="flex md:px-32 md:py-[72px] gap-16 w-full">
      {children}
    </div>
  )
}

export default Container;
