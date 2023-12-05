import "./public.scss";
const RootLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className="pageBody">
      {children}
      <div className="copyNote">
        &copy; Sad{"\'"}s Training Services {new Date().getFullYear()}
      </div>
    </div>
  );
}

export default RootLayout;